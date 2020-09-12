import types from "./categories-and-games-types";

export const setGames = (games) => ({
    type: types.SET_GAMES,
    payload: games
});

export const setReviews = (reviews) => ({
    type: types.SET_REVIEWS,
    payload: reviews
});
