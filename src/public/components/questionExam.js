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

  if (questionData.support_file.length > 0) {
    questionData.support_file.forEach((fileUrl) => {
      const img = document.createElement("img");
      img.src = fileUrl;
      img.alt = "Question Image";
      img.style.maxWidth = "100%";
      img.style.height = "auto";
      img.style.marginBottom = "20px";
      questionContent.appendChild(img);
    });
  }

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

  questionContent.appendChild(contextDiv);

  // Alternatives
  const alternativesList = document.createElement("div");
  alternativesList.style.marginBottom = "25px";

  questionData.alternatives.sort((a, b) => a.letter.localeCompare(b.letter));

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
    altDiv.style.cursor = "pointer";
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

    if (altDiv.dataset.select === "true") {
      altDiv.style.borderLeft = "4px solid rgb(106, 148, 182)";
    }

    altDiv.addEventListener("mouseenter", () => {
      if (altDiv.dataset.select === "false") {
        altDiv.style.backgroundColor = "#e3f2fd";
        altDiv.style.borderLeft = "4px solid rgb(36, 60, 80)";
      }
    });

    altDiv.addEventListener("mouseleave", () => {
      if (altDiv.dataset.select === "false") {
        altDiv.style.backgroundColor = "#f5f5f5";
        altDiv.style.borderLeft = "4px solid #e0e0e0";
      }
    });

    altDiv.addEventListener("click", () => {
      callback(alternative.id, questionData.id);
      alternativesList.querySelectorAll("div").forEach((alt) => {
        alt.dataset.select = "false";
        alt.style.backgroundColor = "#f5f5f5";
        alt.style.borderLeft = "4px solid #e0e0e0";
      });
      altDiv.dataset.select = "true";
      altDiv.style.backgroundColor = "#e8f5e9";
      altDiv.style.borderLeft = "4px solid rgb(106, 148, 182)";
    });

    alternativesList.appendChild(altDiv);
  });

  questionContent.appendChild(alternativesList);
  questionContainer.appendChild(questionContent);

  return questionContainer;
}

export default QuestionElement;
