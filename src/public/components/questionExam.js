function QuestionElement(questionData, index, callback) {
  const questionContainer = document.createElement("div");
  const questionInformation = document.createElement("div");
  const questionContent = document.createElement("div");
  questionContent.classList.add("question-container");
  questionInformation.classList.add("question-information");
  questionContainer.classList.add("question-container");
  questionInformation.innerHTML = `
  <span>Questão ${index + 1}</span>
  <span> - </span>
  <span>Disciplina: ${questionData.discipline
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")}</span>
  <span class="spanStatus">-</span>
  `;
  questionContainer.id = questionData.id;
  questionInformation.style.position = "relative";
  questionInformation.style.cursor = "pointer";
  questionInformation.style.fontSize = "1.4rem";
  questionInformation.style.padding = "0.6rem";
  questionInformation.style.border = "1px solid black";

  const spanStatus = questionInformation.querySelector(".spanStatus");

  spanStatus.style.position = "absolute";
  spanStatus.style.right = "10px";

  questionContainer.appendChild(questionInformation);

  questionContainer.style.width = "100%";
  questionInformation.style.backgroundColor = "#BBBDEB";

  questionInformation.addEventListener("click", () => {
    if (questionContent.style.display === "none") {
      questionContent.style.display = "block";
      spanStatus.textContent = "-";
    } else {
      questionContent.style.display = "none";
      spanStatus.textContent = "+";
    }
  });

  questionContent.style.display = "block";
  questionContent.style.padding = "0.6rem";
  questionContent.style.borderTop = "none";
  questionContent.style.borderBottom = "1px solid black";
  questionContent.style.borderLeft = "1px solid black";
  questionContent.style.borderRight = "1px solid black";

  // Question Context
  const contextDiv = document.createElement("div");
  contextDiv.classList.add("question-context");
  if (questionData.context) {
    const contextParagraph = document.createElement("p");
    contextParagraph.textContent = questionData.context;
    contextDiv.appendChild(contextParagraph);
  }

  // Question Images
  if (questionData.support_file.length > 0) {
    questionData.support_file.forEach((fileUrl) => {
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
    const label = document.createElement("label");
    label.classList.add("alternative-label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.style.cursor = "pointer";
    radio.name = `question-${questionData.question_index}`;
    radio.value = alternative.id;
    radio.id = `question-${questionData.question_index}-${alternative.letter}`;
    if (questionData.answer_id == alternative.id) {
      radio.checked = true;
    }
    label.appendChild(radio);

    label.style.cursor = "pointer";
    radio.addEventListener("change", () => {
      callback(alternative.id, questionData.id);
    });

    const letterSpan = document.createElement("span");
    letterSpan.textContent = `${alternative.letter}: `;
    label.appendChild(letterSpan);

    if (alternative.alternative_text) {
      const textSpan = document.createElement("span");
      textSpan.textContent = alternative.alternative_text;
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

  return questionContainer;
}

export default QuestionElement;
