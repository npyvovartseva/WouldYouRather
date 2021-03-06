import { SET_AUTHED_USER } from '../actions/authedUser';
import { DELETE_AUTHED_USER } from '../actions/authedUser';

export default function authedUser(state = null, action) {
    switch (action.type) {
        case SET_AUTHED_USER:
            return action.userid
        case DELETE_AUTHED_USER:
            return null
        default: 
            return state

    }
}