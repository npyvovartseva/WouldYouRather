export function formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatQuestionShort(question, author) {
    const { id, optionOne, timestamp } = question;
    const { name, avatarURL } = author;

    return {
        name,
        id,
        timestamp,
        text: optionOne.text,
        avatar: avatarURL
    }
}

export function formatQuestion(question, author, authedUser) {
    const { id, optionOne, optionTwo, timestamp } = question;
    const { name, avatarURL } = author;
    const totalVotes = optionOne.votes.length + optionTwo.votes.length;

    return {
        name,
        id,
        timestamp,
        optionOne,
        optionTwo,
        avatar: avatarURL,
        totalVotes
    }
}

export function getAnsweredQuestions(questions, authedUser) {
    return Object.keys(questions).length > 0
        ? Object.fromEntries(Object.entries(questions)
        .filter(([id, question]) => question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)))
        : questions;
}

export function getUnansweredQuestions(questions, authedUser) {
    return Object.keys(questions).length > 0
        ? Object.fromEntries(Object.entries(questions)
        .filter(([id, question]) => !question.optionOne.votes.includes(authedUser) && !question.optionTwo.votes.includes(authedUser)))
        : questions;
}