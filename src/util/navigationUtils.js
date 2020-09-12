const createHistory = require("history").createBrowserHistory;

export function navigateToAndRefresh(history, url) {
    history.push(url);
    const historyBack = createHistory();
    historyBack.go(0);
}

export function goToHomePage(history) {
    history.push("/");
}

export function goToCategory(history, categoryData) {
    history.push(`/category/${categoryData.id}`);
}

export function goToGame(history, gameData) {
    navigateToAndRefresh(history, `/game/${gameData.id}`);
}

export function searchWithString(history, searchString) {
    history.push(`/search?searchText=${searchString}`);
}

export function extractQueryParam(location, param) {
    let result = "";
    if(location.search && location.search.length) {
        const queryParamsStr = location.search.substr(1, location.search.length);
        const queryParams = queryParamsStr.split("&");
        queryParams.forEach(queryParam => {
            if(queryParam.includes("=")){
                const queryParamSplit = queryParam.split("=");
                if(queryParamSplit[1].length > 0 && queryParamSplit[0] === param) {
                    result = queryParamSplit[1];
                }
            }
        });
    }
    return result;
}

export function gameLink(gameData) {
    return `/game/${gameData.id}/reload`;
}

export function userLink(userData) {
    return `/user/${userData.username}`;
}