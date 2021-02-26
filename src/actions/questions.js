import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { handelAnswerUser, handelQuestionUser } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}


function addQuesttion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}
function answerQuesttion(id, answer, authedUser) {
    return {
        type: ANSWER_QUESTION,
        question: { id, answer, authedUser }
    }
}

export function handleAddQuestion(text1, text2) {
    return (dispatch, getState) => {

        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestion({ optionOneText: text1, optionTwoText: text2, author: authedUser })
            .then((question) => {
                dispatch(addQuesttion(question));
                dispatch(handelQuestionUser(question.id));
                dispatch(hideLoading());
            })
    }
}
export function handleAnswerQuestion(id, answer) {
    return (dispatch, getState) => {

        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestionAnswer({ qid: id, answer, authedUser })
            .then(() => {
                dispatch(answerQuesttion(id, answer, authedUser));
                dispatch(handelAnswerUser(id, answer));
                dispatch(hideLoading());
            })
    }
}