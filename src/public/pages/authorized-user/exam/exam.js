const element = document.createElement("div");

element.style.height = "100vh";
element.style.display = "flex";
element.style.flexDirection = "column";
element.style.alignItems = "center";

function renderInitialPage() {
  element.innerHTML = `
    <div id="containerInitial">
        <main>
            <h1>SIMULADO ENEM</h1>
            <p>Um mini simulado do ENEM com 15 questões e duração aproximada de 35 minutos. O nível de dificuldade é X</p>
            <button id="startButton" class="button">INICIAR</button>
        </main>
        <img src="../../images/site/Simulado.png" id="examImage" alt="Estudante Ilustração">
    </div>
    `;

  const startButton = element.querySelector("#startButton");

  startButton.addEventListener("click", renderQuestionsPage);
}

function renderQuestionsPage() {
  const questions = [
    {
      question_index: 24,
      year: 2009,
      discipline: "ciencias-humanas",
      context:
        "Umidade relativa do ar é o termo usado para descrever a quantidade de vapor de água contido na atmosfera. Ela é definida pela razão entre o conteúdo real de umidade de uma parcela de ar e a quantidade de umidade que a mesma parcela de ar pode armazenar na mesma temperatura e pressão quando está saturada de vapor, isto é, com 100% de umidade relativa. O gráfico representa a relação entre a umidade relativa do ar e sua temperatura ao longo de um período de 24 horas em um determinado local.)",
      alternative_introduction:
        "Considerando-se as informações do texto e do gráfico, conclui-se que",
      alternatives: [
        {
          letter: "A",
          text: "A insolação é um fator que provoca variação da umidade relativa do ar.",
          file: null,
          selected: false,
        },
        {
          letter: "B",
          text: "O ar vai adquirindo maior quantidade de vapor de água à medida que se aquece.",
          file: null,
          selected: false,
        },
        {
          letter: "C",
          text: "A presença de umidade relativa do ar é diretamente proporcional à temperatura do ar.",
          file: null,
          selected: false,
        },
        {
          letter: "D",
          text: "A umidade relativa do ar indica, em termos absolutos, a quantidade de vapor de água existente na atmosfera.",
          file: null,
          selected: false,
        },
        {
          letter: "E",
          text: "A variação da umidade do ar se verifica no verão, e não no inverno, quando as temperaturas permanecem baixas.",
          file: null,
          selected: false,
        },
      ],
      question_files: [
        "http://localhost:3500/images/e0412a77-9619-452b-b62e-ba775414bd2c.png",
      ],
    },
    {
      question_index: 36,
      year: 2009,
      discipline: "ciencias-natureza",
      context:
        "O uso de protetores solares em situações de grande exposição aos raios solares como, por exemplo, nas praias, é de grande importância para a saúde. As moléculas ativas de um protetor apresentam, usualmente, anéis aromáticos conjugados com grupos carbonila, pois esses sistemas são capazes de absorver a radiação ultravioleta mais nociva aos seres humanos. A conjugação é definida como a ocorrência de alternância entre ligações simples e duplas em uma molécula. Outra propriedade das moléculas em questão é apresentar, em uma de suas extremidades, uma parte apolar responsável por reduzir a solubilidade do composto em água, o que impede sua rápida remoção quando do contato com a água.",
      alternative_introduction:
        "De acordo com as considerações do texto, qual das moléculas apresentadas a seguir é a mais adequada para funcionar como molécula ativa de protetores solares?",
      alternatives: [
        {
          letter: "A",
          text: null,
          file: "http://localhost:3500/images/84d8e1ad-77ee-401b-aa7a-e9e86e592db8.png",
          selected: false,
        },
        {
          letter: "B",
          text: null,
          file: "http://localhost:3500/images/b9216797-a906-4a16-9a53-4e596e058dc4.png",
          selected: false,
        },
        {
          letter: "C",
          text: null,
          file: "http://localhost:3500/images/c0fcc9f3-6669-45df-9a57-4b1edebbdb26.png",
          selected: false,
        },
        {
          letter: "D",
          text: null,
          file: "http://localhost:3500/images/5703fd8b-f3c7-4847-be3c-9de8e23c2952.png",
          selected: false,
        },
        {
          letter: "E",
          text: null,
          file: "http://localhost:3500/images/d2719ed6-d529-48c9-8e1f-6d7d5ddb4b22.png",
          selected: false,
        },
      ],
      question_files: [],
    },
  ];

  element.innerHTML = `
      <div id="containerExam">
        <div id="containerQuestions"></div>
        <button id="sendButton" class="button">RESPONDER</button>
      </div>
    `;

  const containerQuestions = element.querySelector("#containerQuestions");

  questions.forEach((question, index) => {
    containerQuestions.appendChild(createQuestionElement(question, index));
  });

  const sendButton = element.querySelector("#sendButton");

  sendButton.addEventListener("click", () => {
    const allAnsered = questions.every((question) => {
      return question.alternatives.some((alternative) => alternative.selected);
    });

    if (!allAnsered) {
      const modalContainer = createConfirmationModal(
        "Mandar respostas incompletas?",
        () => {
          console.log("Enviado");
        }
      );
      element.appendChild(modalContainer);
      return;
    }
    console.log("Enviado");
    renderResultPage();
  });
}

function renderResultPage() {
  const questions = [
    {
      question_index: 24,
      year: 2009,
      discipline: "ciencias-humanas",
      context:
        "Umidade relativa do ar é o termo usado para descrever a quantidade de vapor de água contido na atmosfera. Ela é definida pela razão entre o conteúdo real de umidade de uma parcela de ar e a quantidade de umidade que a mesma parcela de ar pode armazenar na mesma temperatura e pressão quando está saturada de vapor, isto é, com 100% de umidade relativa. O gráfico representa a relação entre a umidade relativa do ar e sua temperatura ao longo de um período de 24 horas em um determinado local.",
      alternative_introduction:
        "Considerando-se as informações do texto e do gráfico, conclui-se que",
      alternatives: [
        {
          letter: "A",
          text: "A insolação é um fator que provoca variação da umidade relativa do ar.",
          file: null,
          selected: true,
          is_correct: true,
        },
        {
          letter: "B",
          text: "O ar vai adquirindo maior quantidade de vapor de água à medida que se aquece.",
          file: null,
          selected: false,
          is_correct: false,
        },
        {
          letter: "C",
          text: "A presença de umidade relativa do ar é diretamente proporcional à temperatura do ar.",
          file: null,
          selected: false,
          is_correct: false,
        },
        {
          letter: "D",
          text: "A umidade relativa do ar indica, em termos absolutos, a quantidade de vapor de água existente na atmosfera.",
          file: null,
          selected: false,
          is_correct: false,
        },
        {
          letter: "E",
          text: "A variação da umidade do ar se verifica no verão, e não no inverno, quando as temperaturas permanecem baixas.",
          file: null,
          selected: false,
          is_correct: false,
        },
      ],
      question_files: [
        "http://localhost:3500/images/e0412a77-9619-452b-b62e-ba775414bd2c.png",
      ],
      explanation:
        "A alternativa A está correta porque o gráfico mostra que a umidade relativa do ar diminui durante o dia (com o aumento da temperatura/insolação) e aumenta à noite (com o resfriamento), evidenciando a relação inversa entre temperatura e umidade relativa.",
      support_urls: [
        "https://brasilescola.uol.com.br/geografia/umidade-ar.htm",
        "https://mundoeducacao.uol.com.br/geografia/umidade-atmosferica.htm",
      ],
    },
    {
      question_index: 36,
      year: 2009,
      discipline: "ciencias-natureza",
      context:
        "O uso de protetores solares em situações de grande exposição aos raios solares como, por exemplo, nas praias, é de grande importância para a saúde. As moléculas ativas de um protetor apresentam, usualmente, anéis aromáticos conjugados com grupos carbonila, pois esses sistemas são capazes de absorver a radiação ultravioleta mais nociva aos seres humanos. A conjugação é definida como a ocorrência de alternância entre ligações simples e duplas em uma molécula. Outra propriedade das moléculas em questão é apresentar, em uma de suas extremidades, uma parte apolar responsável por reduzir a solubilidade do composto em água, o que impede sua rápida remoção quando do contato com a água.",
      alternative_introduction:
        "De acordo com as considerações do texto, qual das moléculas apresentadas a seguir é a mais adequada para funcionar como molécula ativa de protetores solares?",
      alternatives: [
        {
          letter: "A",
          text: null,
          file: "http://localhost:3500/images/84d8e1ad-77ee-401b-aa7a-e9e86e592db8.png",
          selected: false,
          is_correct: false,
        },
        {
          letter: "B",
          text: null,
          file: "http://localhost:3500/images/b9216797-a906-4a16-9a53-4e596e058dc4.png",
          selected: true,
          is_correct: false,
        },
        {
          letter: "C",
          text: null,
          file: "http://localhost:3500/images/c0fcc9f3-6669-45df-9a57-4b1edebbdb26.png",
          selected: false,
          is_correct: false,
        },
        {
          letter: "D",
          text: null,
          file: "http://localhost:3500/images/5703fd8b-f3c7-4847-be3c-9de8e23c2952.png",
          selected: false,
          is_correct: false,
        },
        {
          letter: "E",
          text: null,
          file: "http://localhost:3500/images/d2719ed6-d529-48c9-8e1f-6d7d5ddb4b22.png",
          selected: false,
          is_correct: true,
        },
      ],
      question_files: [],
      explanation:
        "A alternativa E está correta porque a molécula deve ter: (1) anéis aromáticos conjugados com carbonila (para absorver UV) e (2) uma extremidade apolar (para resistir à água). A estrutura E (não visualizada) atende a esses critérios, conforme descrito no texto.",
      support_urls: ["https://www.youtube.com/watch?v=Xav6P3gSYdo"],
    },
  ];

  element.innerHTML = `
        <div id="containerResults">
        </div>
        `;

  const containerResults = element.querySelector("#containerResults");

  questions.forEach((question, index) => {
    containerResults.appendChild(createQuestionElementResult(question, index));
  });
}

renderInitialPage();

function createQuestionElement(questionData, index) {
  const questionContainer = document.createElement("div");
  const questionInformation = document.createElement("div");
  const questionContent = document.createElement("div");
  questionContent.classList.add("question-container");
  questionInformation.classList.add("question-information");
  questionContainer.classList.add("question-container");
  console.log(index);
  questionInformation.innerHTML = `
  <span>Questão ${index + 1}</span>
  <span> - </span>
  <span>Disciplina: ${questionData.discipline}</span>
  <span class="spanStatus">+</span>
  `;

  questionInformation.style.position = "relative";
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

    const label = document.createElement("label");
    label.classList.add("alternative-label");

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = `question-${questionData.question_index}`;
    radio.value = alternative.letter;
    radio.id = `question-${questionData.question_index}-${alternative.letter}`;

    label.appendChild(radio);

    radio.addEventListener("change", () => {
      alternatives.forEach((alt) => {
        if (alt.letter === alternative.letter) {
          alt.selected = true;
        } else {
          alt.selected = false;
        }
      });
    });

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

  return questionContainer;
}

function createQuestionElementResult(questionData, index) {
  const questionContainer = document.createElement("div");
  const questionInformation = document.createElement("div");
  const questionContent = document.createElement("div");
  questionContent.classList.add("question-container");
  questionInformation.classList.add("question-information");
  questionContainer.classList.add("question-container");
  console.log(index);
  questionInformation.innerHTML = `
    <span>Questão ${index + 1}</span>
    <span> - </span>
    <span>Disciplina: ${questionData.discipline}</span>
    <span class="spanStatus">+</span>
    `;

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
    console.log(alternative.selected);
    radio.checked = alternative.selected;
    radio.disabled = true;

    if (alternative.is_correct) {
      listItem.style.backgroundColor = "#BDEFBC";
    }

    if (alternative.selected && !alternative.is_correct) {
      listItem.style.backgroundColor = "#F6C8C8";
      questionInformation.style.backgroundColor = "#F6C8C8";
    }

    if (alternative.selected && alternative.is_correct) {
      questionInformation.style.backgroundColor = "#BDEFBC";
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

function createConfirmationModal(text, callback) {
  const modalContainer = document.createElement("div");
  modalContainer.style.position = "fixed";
  modalContainer.style.top = "0";
  modalContainer.style.left = "0";
  modalContainer.style.width = "100%";
  modalContainer.style.height = "100%";
  modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modalContainer.style.display = "flex";
  modalContainer.style.justifyContent = "center";
  modalContainer.style.alignItems = "center";
  modalContainer.style.zIndex = "10";

  const modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "white";
  modalContent.style.padding = "20px";
  modalContent.style.borderRadius = "5px";
  modalContent.style.textAlign = "center";
  modalContent.style.maxWidth = "80%";
  modalContent.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";

  const textElement = document.createElement("p");
  textElement.textContent = text;
  textElement.style.marginBottom = "20px";

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.gap = "20px";

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancelar";
  cancelButton.style.backgroundColor = "#ccc";
  cancelButton.style.color = "black";
  cancelButton.style.border = "none";
  cancelButton.style.padding = "10px 20px";
  cancelButton.style.borderRadius = "5px";
  cancelButton.style.cursor = "pointer";

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirmar";
  confirmButton.style.backgroundColor = "#3D52A0";
  confirmButton.style.color = "white";
  confirmButton.style.border = "none";
  confirmButton.style.padding = "10px 20px";
  confirmButton.style.borderRadius = "5px";
  confirmButton.style.cursor = "pointer";

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(confirmButton);
  modalContent.appendChild(textElement);
  modalContent.appendChild(buttonContainer);
  modalContainer.appendChild(modalContent);

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      modalContainer.remove();
      document.removeEventListener("keydown", handleEscapeKey);
    }
  }

  document.addEventListener("keydown", handleEscapeKey);

  modalContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modalContainer.addEventListener("click", (event) => {
    modalContainer.remove();
    document.removeEventListener("keydown", handleEscapeKey);
  });

  cancelButton.addEventListener("click", () => {
    modalContainer.remove();
    document.removeEventListener("keydown", handleEscapeKey);
  });

  confirmButton.addEventListener("click", () => {
    callback();
    modalContainer.remove();
    document.removeEventListener("keydown", handleEscapeKey);
  });

  return modalContainer;
}

export default element;
