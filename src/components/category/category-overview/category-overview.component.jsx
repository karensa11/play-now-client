import React, {Component, useEffect} from "react";
import "./category-overview.styles.scss";
import {
    gamesByCategorySelector,
    categoryByIdSelector,
    gamesByCategoryAndSortCriteriaSelector
} from "../../../redux/categories-and-games/categories-and-games-selector";
import {connect} from "react-redux";
import ItemsTable from "../../common/items-table/items-table.component";
import GameItem from "../../game-item/game-item.component";
import {setTitle} from "../../../util/utils";
import DropDown from "../../common/drop-down/drop-down.component";
import Navigation from "../../navigation/navigation.component";
import {store} from "../../../redux/store";
import sortOptions from "../../../util/data/games-sort-criteria";

class CategoryOverview extends Component{
    constructor(props)
    {
        super(props);
        this.state = {
            sortOptionCode: sortOptions[0].code
        }
    }
    componentDidMount() {
        const {categoryData} = this.props;
        setTitle(`${categoryData.displayName} Games`);
    }
    setSortCriteria = (event) => {
        const {value} = event.target;
        this.setState({sortOptionCode: value});
    };
    render()
    {
        // TODO - check with Yuval for the sorting design //
        const {categoryData, match} = this.props;
        const {sortOptionCode} = this.state;
        const games = gamesByCategoryAndSortCriteriaSelector(match.params.id, sortOptionCode)(store.getState());

        return (
            <div className="category-overview-component">
                <div className="header">
                    <div className="left">
                        <div className="title">
                            {categoryData.displayName} Games
                        </div>
                        <div className="navigation">
                            <Navigation categoryData={categoryData}/>
                        </div>
                    </div>
                    {games.length > 0 &&
                        <div className="right">
                            <DropDown title="Sort By" values={sortOptions} selectedValue={sortOptionCode}
                                      onChangeValue={this.setSortCriteria}
                            />
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
                            <GameItem gameData={game} />
                        )}
                    />
                    :
                    <div className="no-items">No games found</div>
                }
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    games: gamesByCategorySelector(ownProps.match.params.id)(state),
    categoryData: categoryByIdSelector(ownProps.match.params.id)(state),
});

export default connect(mapStateToProps)(CategoryOverview);
