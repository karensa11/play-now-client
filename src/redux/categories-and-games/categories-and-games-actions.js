import types from "./categories-and-games-types";

export const setGames = (games) => ({
    type: types.SET_GAMES,
    payload: games
});
