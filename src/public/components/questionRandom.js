function RandomQuestion(questionData) {
  let alternativeId = null;
  const questionContainer = document.createElement("div");
  const questionInformation = document.createElement("div");
  const questionContent = document.createElement("div");
  questionContent.classList.add("question-container");
  questionInformation.classList.add("question-information");
  questionContainer.classList.add("question-container");

  questionContainer.style.fontFamily = "Arial, sans-serif";
  questionContainer.style.backgroundColor = "#ffffff";
  questionContainer.style.border = "1px solid #ddd";
  questionContainer.style.borderRadius = "8px";
  questionContainer.style.padding = "1rem";
  questionContainer.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.1)";
  questionContainer.style.maxWidth = "800px";
  questionContainer.style.margin = "1rem auto";

  questionInformation.innerHTML = `
  <div>
    <span>${questionData.vestibular}</span>
    <span>${questionData.year}</span>
    <span> - </span>
    <span>${questionData.discipline
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}</span>
  </div>
  <div>Nível de dificuldade: ${questionData.level}</div>
  `;
  questionInformation.style.display = "flex";
  questionInformation.style.justifyContent = "space-between";
  questionInformation.style.flexDirection = "column";
  questionInformation.style.gap = "10px";
  questionInformation.style.fontSize = "1.1rem";
  questionInformation.style.paddingBottom = "0.5rem";
  questionInformation.style.borderBottom = "1px solid #ddd";
  questionInformation.style.color = "#555";

  questionContainer.appendChild(questionInformation);

  questionContent.style.marginTop = "1rem";
  questionContent.style.padding = "0.5rem";
  questionContent.style.backgroundColor = "#f9f9f9";
  questionContent.style.borderLeft = "4px solid #007bff";

  // Question Context
  const contextDiv = document.createElement("div");
  contextDiv.classList.add("question-context");
  if (questionData.context) {
    const contextParagraph = document.createElement("p");
    contextParagraph.textContent = questionData.context;
    contextDiv.appendChild(contextParagraph);
  }

  // Question Images
  if (questionData.support_file != null) {
    questionData.support_file.forEach((fileUrl) => {
      const img = document.createElement("img");
      img.src = fileUrl;
      img.alt = "Imagem da questão";
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
  alternativesList.style.marginTop = "1rem";
  alternativesList.style.display = "flex";
  alternativesList.style.flexDirection = "column";
  alternativesList.style.gap = "10px";
  alternativesList.style.padding = "0";

  questionData.alternatives.forEach((alternative, index, alternatives) => {
    const listItem = document.createElement("li");
    listItem.classList.add("alternative-item");

    const label = document.createElement("label");
    label.classList.add("alternative-label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${questionData.question_index}`;
    radio.value = alternative.id;

    label.appendChild(radio);

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

    listItem.style.background = "#f1f1f1";
    listItem.style.padding = "0.8rem";
    listItem.style.borderRadius = "5px";
    listItem.style.display = "flex";
    listItem.style.gap = "10px";
    listItem.style.transition = "background 0.3s";

    listItem.addEventListener("mouseover", () => {
      listItem.style.background = "#e0e0e0";
    });
    listItem.addEventListener("mouseout", () => {
      listItem.style.background = "#f1f1f1";
    });
  });

  questionContent.appendChild(alternativesList);
  questionContainer.appendChild(questionContent);

  return questionContainer;
}

export default RandomQuestion;
