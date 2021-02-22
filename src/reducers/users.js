import { RECEIVE_USERS, EDIT_ANSWERS_USER } from '../actions/users';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case EDIT_ANSWERS_USER:
            const { authedUser, answers } = action.payload;
            const user = {...state[authedUser]};
            user.answers = answers;
            console.log(
                {
                    ...state,
                    [authedUser]: user
                }
            )
            return {
                ...state,
                [authedUser]: user
            }
        default:
            return state;

    }
}