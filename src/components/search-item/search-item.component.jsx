import React from "react";
import "./search-item.styles.scss";
import {categoryByIdSelector} from "../../redux/categories-and-games/categories-and-games-selector";
import {store} from "../../redux/store";
import {withRouter} from "react-router-dom";
import {navigateToCategory, navigateToGame} from "../../util/navigationUtils";
import {calculateLikesRate} from "../../util/utils";

function SearchItem({history, gameData, index}) {
    const goToGame = () => {
        navigateToGame(history, gameData);
    };
    const goToCategory = () => {
        navigateToCategory(history, {id: gameData.categoryCode});
    };
    const categoryData = gameData && categoryByIdSelector(gameData.categoryCode)(store.getState());
    const likesRate = calculateLikesRate(gameData);
    return (
        <div className={`search-item-component ${index === 0 ? "no-border" : ""}`}>
            <div className="details">
                <img src={gameData.imageUrl} alt="the game" onClick={goToGame} />
                <div className="content">
                    <div className="title" onClick={goToGame}>
                        {gameData.displayName}
                    </div>
                    <div className="description">
                        {gameData.description}
                    </div>
                    <div className="category-title">
                        Category:
                    </div>
                    <div className="category" onClick={goToCategory}>
                        {categoryData.displayName}
                    </div>
                </div>
            </div>
            <div className="count">{gameData.usageCount}</div>
            <div className="count">{gameData.creationDate}</div>
            <div className="likes">{likesRate}%</div>
        </div>
    )
}

export default withRouter(SearchItem);
