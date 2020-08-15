import {createSelector} from "reselect";
import memoize from "lodash.memoize";
import categories from "../../data/categories";

const categoriesAndGamesSelector = (state) => state.categoriesAndGamesNs;

export const allCategoriesSelector = createSelector(
    [categoriesAndGamesSelector],
    categoriesAndGames => categoriesAndGames.categories
);

export const allGamesSelector = createSelector(
    [categoriesAndGamesSelector],
    categoriesAndGames => categoriesAndGames.games
);

export const gamesByCategorySelector = memoize( categoryCode => createSelector(
    [allGamesSelector],
    allGames => allGames.filter(game => game.categoryCode === categoryCode)
));

export const categoriesNumByDozeSelector = createSelector(
    [allCategoriesSelector],
    allCategories => Math.floor(categories.length / 10) * 10
);
