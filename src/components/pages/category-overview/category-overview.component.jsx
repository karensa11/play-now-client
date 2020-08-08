import React from "react";
import "./category-overview.styles.scss";
import {gamesByCategorySelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {connect} from "react-redux";
import ItemsTable from "../../common/items-table/items-table.component";
import GameItem from "../../game-item/game-item.component";

function CategoryOverview({games}) {
    return (
        <div className="category-overview-page">
            <ItemsTable
                items={games}
                bulkSize={20}
                itemRenderer={(game) => (
                    <GameItem game={game} />
                )}
                />
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    games: gamesByCategorySelector(ownProps.match.params.id)(state)
});

export default connect(mapStateToProps)(CategoryOverview);
