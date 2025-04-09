export function renderHistoryPage() {
    const questions = [
        { text: "Lorem ipsum dolor sit amet consectetur...", exam: "Enem", date: "06/2025", correct: true },
        { text: "Lorem ipsum dolor sit amet consectetur...", exam: "UFES", date: "01/2024", correct: false },
        { text: "Lorem ipsum dolor sit amet consectetur...", exam: "UNB", date: "01/2021", correct: true },
        { text: "Lorem ipsum dolor sit amet consectetur...", exam: "FUVEST", date: "06/2022", correct: true },
        { text: "Lorem ipsum dolor sit amet consectetur...", exam: "Enem", date: "06/2024", correct: false },
        { text: "Lorem ipsum dolor sit amet consectetur...", exam: "Enem", date: "06/2020", correct: true },
        { text: "Lorem ipsum dolor sit amet consectetur...", exam: "UFV", date: "06/2020", correct: false },
        { text: "Lorem ipsum dolor sit amet consectetur...", exam: "Enem", date: "06/2013", correct: false },
        { text: "Lorem ipsum dolor sit amet consectetur...", exam: "Enem", date: "06/2025", correct: true },
        { text: "Lorem ipsum dolor sit amet consectetur...", exam: "Enem", date: "06/2025", correct: true }
    ];

    const main = document.createElement("main");
    main.className = "history-container";

    const title = document.createElement("h1");
    title.className = "history-title";
    title.textContent = "Histórico de Questões";
    main.appendChild(title);

    const questionsList = document.createElement("div");
    questionsList.className = "questions-list";

    questions.forEach(question => {
        const card = document.createElement("div");
        card.className = `question-card ${question.correct ? 'correct' : 'incorrect'}`;

        const textDiv = document.createElement("div");
        textDiv.className = "question-text";
        textDiv.textContent = question.text;

        const infoDiv = document.createElement("div");
        infoDiv.className = "question-info";

        const examDiv = document.createElement("div");
        examDiv.className = "exam";
        examDiv.textContent = question.exam;

        const dateDiv = document.createElement("div");
        dateDiv.className = "date";
        dateDiv.textContent = question.date;

        infoDiv.appendChild(examDiv);
        infoDiv.appendChild(dateDiv);
        card.appendChild(textDiv);
        card.appendChild(infoDiv);
        questionsList.appendChild(card);
    });

    main.appendChild(questionsList);
    return main;
}