function QuestionElementResultHistory(questionData, index) {
  const questionContainer = document.createElement("div");
  const questionInformation = document.createElement("div");
  const questionContent = document.createElement("div");
  questionContent.classList.add("question-container");
  questionInformation.classList.add("question-information");
  questionContainer.classList.add("question-container");
  questionInformation.innerHTML = `
    <span>Disciplina: ${questionData.discipline
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}</span>
    <span>-</span>
    <span>Ano: ${questionData.year}</span>
    <span class="spanStatus">+</span>
    `;
  questionInformation.style.cursor = "pointer";
  questionInformation.style.position = "relative";
  questionInformation.style.fontSize = "1.4rem";
  questionInformation.style.padding = "0.6rem";
  questionInformation.style.border = "1px solid black";

  const spanStatus = questionInformation.querySelector(".spanStatus");

  spanStatus.style.position = "absolute";
  spanStatus.style.right = "10px";

  questionContainer.appendChild(questionInformation);

  questionContainer.style.width = "100%";
  let rightAnswer = false;

  questionData.alternatives.sort((a, b) => a.letter.localeCompare(b.letter));
  questionData.alternatives.forEach((alternative) => {
    if (alternative.is_correct && alternative.selected) {
      rightAnswer = true;
    }
  });

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

  questionContent.style.display = "none";
  questionContent.style.padding = "0.6rem";
  questionContent.style.borderTop = "none";
  questionContent.style.borderBottom = "1px solid black";
  questionContent.style.borderLeft = "1px solid black";
  questionContent.style.borderRight = "1px solid black";

  // Question Context
  const contextDiv = document.createElement("div");
  contextDiv.classList.add("question-context");
  if (questionData.context) {
    const contextDiv = document.createElement("div");
    contextDiv.style.marginBottom = "20px";
    contextDiv.style.padding = "15px";
    contextDiv.style.backgroundColor = "#f8f9fa";
    contextDiv.style.borderRadius = "8px";
    contextDiv.style.borderLeft = "4px solid #3498db";
    contextDiv.innerHTML = `<p style="margin: 0; font-style: italic;">${questionData.context}</p>`;
    questionContent.appendChild(contextDiv);
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
    const questionText = document.createElement("div");
    questionText.style.marginBottom = "25px";
    questionText.style.marginBottom = "20px";
    questionText.style.padding = "15px";
    questionText.style.backgroundColor = "#f8f9fa";
    questionText.style.borderRadius = "8px";
    questionText.style.borderLeft = "4px solid #3498db";
    questionText.innerHTML = `<p style="margin: 0; font-style: italic;">${questionData.alternative_introduction}</p>`;
    questionContent.appendChild(questionText);
  }

  // Alternatives
  const alternativesList = document.createElement("div");
  alternativesList.style.marginBottom = "25px";

  questionData.alternatives.forEach((alternative, index, alternatives) => {
    const altDiv = document.createElement("div");
    altDiv.dataset.select =
      questionData.answer_id == alternative.id ? true : false;
    altDiv.style.padding = "12px 15px";
    altDiv.style.marginBottom = "8px";
    altDiv.style.borderRadius = "6px";
    altDiv.style.backgroundColor = "#f5f5f5";
    altDiv.style.borderLeft = "4px solid #e0e0e0";
    altDiv.style.transition = "all 0.3s";
    altDiv.style.display = "flex";
    altDiv.style.alignItems = "center";
    const alternativeLetter = document.createElement("span");
    alternativeLetter.style.fontWeight = "bold";
    alternativeLetter.style.marginRight = "10px";
    alternativeLetter.style.color = "#333";
    alternativeLetter.textContent = alternative.letter;
    altDiv.appendChild(alternativeLetter);

    if (alternative.alternative_text) {
      const alternativeText = document.createElement("span");
      alternativeText.style.color = "#666";
      alternativeText.style.flex = "1";
      alternativeText.textContent = alternative.alternative_text;
      altDiv.appendChild(alternativeText);
    }

    if (alternative.file) {
      const img = document.createElement("img");
      img.src = alternative.file;
      img.alt = `Alternative ${alternative.letter} Image`;
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      altDiv.appendChild(img);
    }

    if (alternative.is_correct) {
      altDiv.style.borderLeft = "4px solid rgb(42, 175, 40)";
    }

    if (altDiv.dataset.select === "true" && !alternative.is_correct) {
      altDiv.style.borderLeft = "4px solid rgb(187, 65, 65)";
    }

    if (altDiv.dataset.select === "true" && alternative.is_correct) {
      questionInformation.style.backgroundColor = "#BDEFBC";
    }

    if (altDiv.dataset.select === "false" && alternative.is_correct) {
      questionInformation.style.backgroundColor = "#F6C8C8";
    }

    alternativesList.appendChild(altDiv);
  });

  questionContent.appendChild(alternativesList);
  questionContainer.appendChild(questionContent);

  if (questionData.support_urls.length > 0) {
    const linksDiv = document.createElement("div");
    linksDiv.style.backgroundColor = "#fff8e1";
    linksDiv.style.padding = "15px";
    linksDiv.style.borderRadius = "8px";
    linksDiv.style.borderLeft = "4px solid #ffc107";

    linksDiv.innerHTML = `
                    <h3 style="margin-top: 0; margin-bottom: 10px; color: #2c3e50;">Links de suporte</h3>
                `;

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

    linksDiv.appendChild(list);
    questionContent.appendChild(linksDiv);
  }

  return questionContainer;
}

export default QuestionElementResultHistory;
