import React from "react";
import "./navigation.styles.scss";
import {withRouter} from "react-router-dom";
import {navigateToCategory, navigateToHomePage} from "../../util/navigationUtils";

function Navigation({history, categoryData, gameData}) {
    const goToHomePage = () => {
        navigateToHomePage(history);
    };
    const goToCategory = () => {
        navigateToCategory(history, categoryData);
    };
    return (
        <div className="navigation-component">
            <div className="navigation-component_navigate" onClick={goToHomePage}>Games</div>
            <div className="navigation-component_section">
                <div className="navigation-component_arrow"> &raquo; </div>
                <div className={gameData ? "navigation-component_navigate" : "navigation-component_non-navigation"}
                     onClick={goToCategory}>
                    {categoryData.displayName}
                </div>
            </div>
            {gameData &&
                <div className="navigation-component_section">
                    <div className="navigation-component_arrow"> &raquo; </div>
                    <div className="navigation-component_non-navigation">{gameData.displayName}</div>
                </div>
            }
        </div>
    )
}

export default withRouter(Navigation);
