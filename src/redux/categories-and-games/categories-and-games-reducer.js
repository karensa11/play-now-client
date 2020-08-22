import categories from "../../data/categories";
import types from "./categories-and-games-types";

const INITIAL_STATE = {
    categories: categories,
    games: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_GAMES:
            return {
                ...state,
                games: action.payload
            };
        default: return state;
    }
};

export default reducer;
