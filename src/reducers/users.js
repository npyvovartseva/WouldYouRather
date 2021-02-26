import { RECEIVE_USERS, EDIT_ANSWERS_USER, EDIT_QUESTIONS_USER } from '../actions/users';

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case EDIT_ANSWERS_USER:
            const { authedUser, answers } = action.payload;
            // let user = { ...state[authedUser] };
            // user.answers = answers;
            return {
                ...state,
                [authedUser]: { ...state[authedUser], answers: answers }
            }
        case EDIT_QUESTIONS_USER:
            const { questions } = action.payload;
            // let user = { ...state[action.payload.authedUser] };
            // user.questions = questions;
            return {
                ...state,
                [action.payload.authedUser]: {
                    ...state[action.payload.authedUser],
                    questions: [...questions]
                }
            }
        default:
            return state;

    }
}