export const RECEIVE_USERS = 'RECEIVE_USERS';
export const EDIT_ANSWERS_USER = 'EDIT_ANSWERS_USER';
export const EDIT_QUESTIONS_USER = 'EDIT_QUESTIONS_USER';

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

export function handelAnswerUser(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser, users } = getState();
        const user = users[authedUser];
        user.answers = Object.assign(user.answers, { [qid]: answer });
        return dispatch({
            type: EDIT_ANSWERS_USER,
            payload: { authedUser, answers: user.answers }
        });
    }
}
export function handelQuestionUser(qid) {
    return (dispatch, getState) => {
        const { authedUser, users } = getState();
        const user = users[authedUser];
        return dispatch({
            type: EDIT_QUESTIONS_USER,
            payload: { authedUser, questions: [...user.questions, qid] }
        });
    }
}