import React from "react";
import "./search-item.styles.scss";
import {categoryByIdSelector} from "../../../redux/categories-and-games/categories-and-games-selector";
import {store} from "../../../redux/store";
import {withRouter} from "react-router-dom";
import {goToCategory, goToGame} from "../../../util/navigationUtils";

function SearchItem({history, gameData}) {
    const navigateToGame = () => {
        goToGame(history, gameData);
    };
    const navigateToCategory = () => {
        goToCategory(history, {id: gameData.categoryCode});
    };
    const categoryData = gameData && categoryByIdSelector(gameData.categoryCode)(store.getState());
    return (
        <div className="search-item-component">
            <div className="details">
                <img src={gameData.imageUrl} alt="game image" onClick={navigateToGame} />
                <div className="content">
                    <div className="title" onClick={navigateToGame}>
                        {gameData.displayName}
                    </div>
                    <div className="description">
                        {gameData.description}
                    </div>
                    <div className="category-title">
                        Category:
                    </div>
                    <div className="category" onClick={navigateToCategory}>
                        {categoryData.displayName}
                    </div>
                </div>
            </div>
            <div className="count">{gameData.usageCount}</div>
            <div className="count">{gameData.creationDate}</div>
            <div className="likes">&nbsp;</div>
        </div>
    )
}

export default withRouter(SearchItem);
