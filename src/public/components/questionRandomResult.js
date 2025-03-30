function RandomQuestionResponse(questionData) {
  let alternativeId = null;
  const questionContainer = document.createElement("div");
  const questionInformation = document.createElement("div");
  const questionContent = document.createElement("div");
  questionContent.classList.add("question-container");
  questionInformation.classList.add("question-information");
  questionContainer.classList.add("question-container");

  questionInformation.innerHTML = `
  <div>
    <span>${questionData.vestibular}</span>
    <span>${questionData.year}</span>
    <span> - </span>
    <span>${questionData.discipline}</span>
  </div>
  <div>Nível de dificuldade: ${questionData.level}</div>
  `;

  questionInformation.style.fontSize = "1.3rem";
  questionInformation.style.padding = "0.3rem";
  questionInformation.style.display = "flex";
  questionInformation.style.flexDirection = "column";
  questionInformation.style.gap = "10px";
  questionInformation.style.justifyContent = "space-between";

  questionContainer.appendChild(questionInformation);

  questionContainer.style.width = "100%";
  let rightAnswer = false;
  questionData.alternatives.forEach((alternative) => {
    if (alternative.is_correct && alternative.selected) {
      rightAnswer = true;
    }
  });

  questionContent.style.display = "block";
  questionContent.style.padding = "0.6rem";
  questionContent.style.borderTop = "none";

  // Question Context
  const contextDiv = document.createElement("div");
  contextDiv.classList.add("question-context");
  if (questionData.context) {
    const contextParagraph = document.createElement("p");
    contextParagraph.textContent = questionData.context;
    contextDiv.appendChild(contextParagraph);
  }

  // Question Images
  if (questionData.question_files && questionData.question_files.length > 0) {
    questionData.question_files.forEach((fileUrl) => {
      const img = document.createElement("img");
      img.src = fileUrl;
      img.alt = "Question Image";
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      contextDiv.appendChild(img);
    });
  }
  questionContent.appendChild(contextDiv);

  // Alternative Introduction
  if (questionData.alternative_introduction) {
    const introParagraph = document.createElement("p");
    introParagraph.textContent = questionData.alternative_introduction;
    questionContent.appendChild(introParagraph);
  }

  // Alternatives
  const alternativesList = document.createElement("ul");
  alternativesList.classList.add("alternatives-list");
  alternativesList.style.listStyleType = "none";
  alternativesList.style.padding = "0";
  alternativesList.style.display = "flex";
  alternativesList.style.flexDirection = "column";
  alternativesList.style.gap = "10px";

  questionData.alternatives.forEach((alternative, index, alternatives) => {
    const listItem = document.createElement("li");
    listItem.classList.add("alternative-item");
    listItem.style.padding = "0.6rem";

    const label = document.createElement("label");
    label.classList.add("alternative-label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${questionData.question_index}`;
    radio.value = alternative.letter;
    radio.id = `question-${questionData.question_index}-${alternative.letter}`;
    radio.checked = alternative.selected;
    radio.disabled = true;

    if (alternative.is_correct) {
      listItem.style.backgroundColor = "#BDEFBC";
    }

    if (alternative.selected && !alternative.is_correct) {
      listItem.style.backgroundColor = "#F6C8C8";
      questionInformation.style.backgroundColor = "#F6C8C8";
    }

    label.appendChild(radio);
    const letterSpan = document.createElement("span");
    letterSpan.textContent = `${alternative.letter}: `;
    label.appendChild(letterSpan);

    if (alternative.text) {
      const textSpan = document.createElement("span");
      textSpan.textContent = alternative.text;
      label.appendChild(textSpan);
    }

    if (alternative.file) {
      const img = document.createElement("img");
      img.src = alternative.file;
      img.alt = `Alternative ${alternative.letter} Image`;
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      label.appendChild(img);
    }

    listItem.appendChild(label);
    alternativesList.appendChild(listItem);
  });

  questionContent.appendChild(alternativesList);
  questionContainer.appendChild(questionContent);

  if (questionData.explanation) {
    const titleParagraph = document.createElement("h3");
    titleParagraph.textContent = "Explicação da Resposta:";
    const explanationParagraph = document.createElement("p");
    explanationParagraph.textContent = questionData.explanation;
    questionContent.appendChild(titleParagraph);
    questionContent.appendChild(explanationParagraph);
  }

  if (questionData.support_urls.length > 0) {
    const titleParagraph = document.createElement("h3");
    titleParagraph.textContent = "Links de suporte:";
    const list = document.createElement("ul");
    list.style.listStyleType = "none";
    list.style.display = "flex";
    list.style.flexDirection = "column";
    list.style.padding = "0px";
    list.style.gap = "10px";
    questionData.support_urls.forEach((url) => {
      const listItem = document.createElement("li");
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.textContent = url;
      listItem.appendChild(link);
      list.appendChild(listItem);
    });
    questionContent.appendChild(titleParagraph);
    questionContent.appendChild(list);
  }

  return questionContainer;
}

export default RandomQuestionResponse;
