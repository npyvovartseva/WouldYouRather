import { RECEIVE_QUESTIONS, ADD_QUESTION, ANSWER_QUESTION } from '../actions/questions';

export default function questions(state = {}, action) {
    switch (action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION:
            const { question } = action;
            return {
                ...state,
                [action.question.id]: question
            }
        case ANSWER_QUESTION:
            const { id, answer, authedUser } = action.question;
            let questionAnswered = {
                ...state[id],
                optionOne: answer === 'optionOne'
                    ? {
                        ...state[id][answer],
                        votes: [...state[id][answer].votes, authedUser]
                    }
                    : state[id].optionOne,
                optionTwo: answer === 'optionTwo'
                    ? {
                        ...state[id][answer],
                        votes: [...state[id][answer].votes, authedUser]
                    }
                    : state[id].optionTwo,


            };
            return {
                ...state,
                [id]: questionAnswered
            }
        default:
            return state;

    }
}