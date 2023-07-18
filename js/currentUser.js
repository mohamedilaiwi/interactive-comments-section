let currentUser = {};


export function changeCurrentUser(user) {
    currentUser = user;
}

export function getCurrrentUser() {
    return currentUser;
}