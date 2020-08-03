import {createSelector} from "reselect";

const userSelector = state => state.userNs;

export const currentUserSelector = createSelector(
    [userSelector],
    user => user.currentUser
);
