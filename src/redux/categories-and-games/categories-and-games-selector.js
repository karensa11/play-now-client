import {createSelector} from "reselect";
import memoize from "lodash.memoize";
import categories from "../../data/categories";
import criteria from "../../util/data/games-sort-criteria";

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

export const gamesByCategoryAndSortCriteriaSelector = memoize( (categoryCode, gamesSortCode) => createSelector(
    [allGamesSelector],
    allGames => allGames.filter(game => game.categoryCode === categoryCode)
        .sort(criteria.filter(item => item.code === gamesSortCode)[0].sortFunc)
));

export const gamesBySearchTextSelector = memoize(searchText => createSelector(
    [allGamesSelector],
    allGames => allGames.filter(
        item => item.displayName.toUpperCase().includes(searchText.toUpperCase()) ||
            item.description.toUpperCase().includes(searchText.toUpperCase()))
));

export const categoriesNumByDozeSelector = createSelector(
    [allCategoriesSelector],
    allCategories => Math.floor(categories.length / 10) * 10
);

export const categoryByIdSelector = memoize(categoryId => createSelector(
    [allCategoriesSelector],
    allCategories => allCategories.filter(category => category.id === categoryId)[0]
));

export const gameByIdSelector = memoize(gameId => createSelector(
    [allGamesSelector],
    allGames => allGames.filter(game => game.id === gameId)[0]
));
