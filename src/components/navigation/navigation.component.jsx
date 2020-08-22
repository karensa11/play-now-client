import React from "react";
import "./navigation.styles.scss";
import {withRouter} from "react-router-dom";
import {goToCategory, goToHomePage} from "../../util/navigationUtils";

function Navigation({history, categoryData, gameData}) {
    const navigateToHomePage = () => {
        goToHomePage(history);
    };
    const navigateToCategory = () => {
        goToCategory(history, categoryData);
    };
    return (
        <div className="navigation-component">
            <div className="navigation-component_navigate" onClick={navigateToHomePage}>Games</div>
            <div className="navigation-component_section">
                <div className="navigation-component_arrow"> &raquo; </div>
                <div className={gameData ? "navigation-component_navigate" : "navigation-component_non-navigation"}
                     onClick={navigateToCategory}>
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
