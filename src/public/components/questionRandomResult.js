function RandomQuestionResponse(questionData, userWasCorrect) {
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

  questionContainer.style.width = "100%";

  questionContent.style.marginTop = "1rem";
  questionContent.style.padding = "0.5rem";
  questionContent.style.backgroundColor = "#f9f9f9";
  questionContent.style.display = "flex";
  questionContent.style.flexDirection = "column";
  questionContent.style.gap = "10px";

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
  alternativesList.style.marginTop = "1rem";
  alternativesList.style.display = "flex";
  alternativesList.style.flexDirection = "column";
  alternativesList.style.gap = "10px";
  alternativesList.style.padding = "0";

  questionData.alternatives.sort((a, b) => a.letter.localeCompare(b.letter));

  questionData.alternatives.forEach((alternative, index, alternatives) => {
    const listItem = document.createElement("li");
    listItem.classList.add("alternative-item");
    listItem.style.background = "#f1f1f1";
    listItem.style.padding = "0.8rem";
    listItem.style.borderRadius = "5px";
    listItem.style.display = "flex";
    listItem.style.gap = "10px";

    const label = document.createElement("label");
    label.classList.add("alternative-label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${questionData.question_index}`;
    radio.value = alternative.letter;
    radio.id = `question-${questionData.question_index}-${alternative.letter}`;
    radio.checked = alternative.id == questionData.answer_id;
    radio.disabled = true;

    // LÓGICA MODIFICADA AQUI
    if (alternative.id == questionData.answer_id) {
      // Alternativa selecionada pelo usuário
      if (alternative.is_correct) {
        // Usuário acertou
        listItem.style.backgroundColor = "#BDEFBC";
        questionContent.style.borderLeft = "4px solid rgb(0, 136, 41)";
        
        const checkMark = document.createElement("span");
        checkMark.textContent = " ✓";
        checkMark.style.color = "#4CAF50";
        checkMark.style.marginLeft = "10px";
        label.appendChild(checkMark);
      } else {
        // Usuário errou
        listItem.style.backgroundColor = "#F6C8C8";
        questionContent.style.borderLeft = "4px solid #ff0000";
        
        const xMark = document.createElement("span");
        xMark.textContent = " ✗";
        xMark.style.color = "#f44336";
        xMark.style.marginLeft = "10px";
        label.appendChild(xMark);
      }
    } else if (alternative.is_correct && userWasCorrect) {
      // Mostra resposta correta apenas se o usuário acertou
      listItem.style.backgroundColor = "#BDEFBC";
      
      const checkMark = document.createElement("span");
      checkMark.textContent = " ✓";
      checkMark.style.color = "#4CAF50";
      checkMark.style.marginLeft = "10px";
      label.appendChild(checkMark);
    }

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
  });

  questionContent.appendChild(alternativesList);
  questionContainer.appendChild(questionContent);

  if (questionData.support_urls !== null) {
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
