const createHistory = require("history").createBrowserHistory;

export function navigateToAndRefresh(history, url) {
    history.push(url);
    const historyBack = createHistory();
    historyBack.go(0);
}
export function navigateToHomePage(history) {
    history.push("/");
}
export function navigateToCategory(history, categoryData) {
    history.push(`/category/${categoryData.id}`);
}
export function navigateToGame(history, gameData) {
    history.push(`/game/${gameData.id}`);
}
export function navigateToSearchWithString(history, searchString) {
    history.push(`/search?searchText=${searchString}`);
}
export function navigateToAccount(history) {
    history.push("/account");
}
export function navigateToRegister(history) {
    history.push("/account/register");
}
export function navigateToAllCategories(history) {
    history.push("/category/all");
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