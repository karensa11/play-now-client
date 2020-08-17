import React, {useEffect} from "react";
import "./category-overview.styles.scss";
import {gamesByCategorySelector, categoryByIdSelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ItemsTable from "../../common/items-table/items-table.component";
import GameItem from "../../game-item/game-item.component";
import {setTitle} from "../../../util/utils";
import DropDown from "../../common/drop-down/drop-down.component";

const sortOptions = [
    {code: "latest", displayName: "Latest"},
    {code: "popularity", displayName: "Popularity"}
];
function CategoryOverview({games, categoryData, history}) {
    useEffect(() => {
        setTitle(`${categoryData.displayName} Games`);
    });
    const goToHomePage = () => {
        history.push("/");
    };
    return (
        <div className="category-overview-component">
            <div className="header">
                <div className="left">
                    <div className="title">
                        {categoryData.displayName} Games
                    </div>
                    <div className="navigation">
                        <div className="games" onClick={goToHomePage}>Games</div>
                        <div className="arrow"> &raquo; </div>
                        <div className="category-name">{categoryData.displayName}</div>
                    </div>
                </div>
                {games.length > 0 &&
                    <div className="right">
                        <DropDown title="Sort By" values={sortOptions} selectedValue={sortOptions[0].code} />
                    </div>
                }
            </div>
            <div className="description">
                {categoryData.description}
            </div>
            {games.length > 0 ?
                <ItemsTable
                    items={games}
                    bulkSize={20}
                    itemRenderer={(game) => (
                        <GameItem game={game}/>
                    )}
                />
                :
                <div className="no-items">No games found</div>
            }
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    games: gamesByCategorySelector(ownProps.match.params.id)(state),
    categoryData: categoryByIdSelector(ownProps.match.params.id)(state),
});

export default withRouter(connect(mapStateToProps)(CategoryOverview));
