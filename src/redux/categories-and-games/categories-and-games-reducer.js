import categories from "../../data/categories";
import games from "../../data/games";

const INITIAL_STATE = {
    categories: categories,
    games: games
};

const reducer = (state = INITIAL_STATE, action) => {
    return state;
};

export default reducer;
