import types from "./user-types";

const INITIAL_STATE = {
    currentUser: null,
    allUsers: []
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case types.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            };
        case types.CREATING_USER:
            return {
                ...state,
                isCreatingUser: action.payload
            };
        case types.SET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            };
        default:
            return state;
    }
};

export default reducer;
