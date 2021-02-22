export const SET_AUTHED_USER = 'SET_AUTHED_USER';


export function setAuthedUser(userid) {
    return {
        type: SET_AUTHED_USER,
        userid
    }
}