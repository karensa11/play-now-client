import React from "react";
import "./category-overview.styles.scss";
import {gamesByCategorySelector, categoryByIdSelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import ItemsTable from "../../common/items-table/items-table.component";
import GameItem from "../../game-item/game-item.component";

function CategoryOverview({games, categoryData, history}) {
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
