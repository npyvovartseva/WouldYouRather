export function formatDate(timestamp) {
    const d = new Date(timestamp)
    const time = d.toLocaleTimeString('en-US')
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function getBaseURL() {
    return process.env.PUBLIC_URL;
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

export function formatUserStats(user, authedUser) {
    const { id, name, avatarURL, answers, questions } = user;
    const answersCount = Object.keys(answers).length;
    const questionCount = questions.length;

    return {
        id,
        name,
        avatar: avatarURL,
        answers: answersCount,
        questions: questionCount,
        total: questionCount + answersCount,
        isAuthedUser: id === authedUser
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

export function getAnsweredQuestions(questions, users, authedUser) {
    let answered = Object.keys(users).length > 0 && authedUser !== null ? Object.keys(users[authedUser].answers) : [];
    return answered.reduce((obj, key) => ({ ...obj, [key]: questions[key] }), {});
}

export function getUnansweredQuestions(questions, users, authedUser) {
    let answered = Object.keys(users).length > 0 && authedUser !== null ? Object.keys(users[authedUser].answers) : [];
    let unanswered = Object.keys(questions).length > 0 ? Object.keys(questions).filter(item => !answered.includes(item)) : [];
    return unanswered.reduce((obj, key) => ({ ...obj, [key]: questions[key] }), {});
}