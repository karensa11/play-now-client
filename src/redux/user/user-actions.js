import types from "./user-types";

export const setCurrentUser = (user) => ({
    type: types.SET_CURRENT_USER,
    payload: user
});

export const removeCurrentUser = () => ({
    type: types.SET_CURRENT_USER,
    payload: null
});

export const setUsers = (allUsers) => ({
    type: types.SET_ALL_USERS,
    payload: allUsers
});
