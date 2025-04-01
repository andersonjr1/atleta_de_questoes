export function renderHistoryPage(questions = []) {
    const main = document.createElement("main");
    main.className = "history-container";

    const title = document.createElement("h1");
    title.className = "history-title";
    title.textContent = "Histórico de Questões";
    main.appendChild(title);

    const questionsList = document.createElement("div");
    questionsList.className = "questions-list";

    if (question.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "Nenhuma questão respondida ainda.";
        questionsList.appendChild(emptyMessage);
    } else {
        questions.forEach(question => {
            const card = document.createElement("div");
            card.className = `question-card ${question.correct ? 'correct' : 'incorrect'}`;

            const questionText = question.context
                ? question.context.slice(0, 50) + '...'
                : "Questão sem contexto";
    
            const textDiv = document.createElement("div");
            textDiv.className = "question-text";
            textDiv.textContent = questionText;
    
            const infoDiv = document.createElement("div");
            infoDiv.className = "question-info";
    
            const examDiv = document.createElement("div");
            examDiv.className = "exam";
            examDiv.textContent = question.vestibular;
    
            const dateDiv = document.createElement("div");
            dateDiv.className = "date";
            const answeredDate = new Date(question.answered_at);
            dateDiv.textContent = answeredDate.toLocaleDateString('pt-BR');

            const isCorrect = question.alternatives.some(alt =>
                alt.id === question.selected_alternative_id && alt.is_correct
            );
    
            infoDiv.appendChild(examDiv);
            infoDiv.appendChild(dateDiv);
            card.appendChild(textDiv);
            card.appendChild(infoDiv);

            card.classList.add(isCorrect ? 'correct' : 'incorrect');

            questionsList.appendChild(card);
        });
    }

    main.appendChild(questionsList);
    return main;
}