import {createSelector} from "reselect";
import memoize from "memoize-one";

const userSelector = state => state.userNs;

export const currentUserSelector = createSelector(
    [userSelector],
    user => user.currentUser
);

export const allUsersSelector = createSelector(
    [userSelector],
    user => user.allUsers
);

export const userByUsernameSelector = memoize(username => createSelector(
    [allUsersSelector],
    allUsers => allUsers.filter(user => user.username === username)
));
