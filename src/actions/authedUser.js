export const SET_AUTHED_USER = 'SET_AUTHED_USER';
export const DELETE_AUTHED_USER = 'DELETE_AUTHED_USER';


export function setAuthedUser(userid) {
    return {
        type: SET_AUTHED_USER,
        userid
    }
}

export function deleteAuthedUser() {
    return {
        type: DELETE_AUTHED_USER
    }
}