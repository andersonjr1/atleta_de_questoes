import Header from "/components/headerWithMenu.js";
import { renderFooter } from "/components/footer.js";
import HeaderWithoutMenu from "/components/headerWithoutMenu.js";
import QuestionElement from "/components/questionExam.js";
import QuestionElementResult from "/components/questionExamResult.js";
import ConfirmationModal from "/components/confirmationModal.js";
import Timer from "/components/timer.js";

// Creates and returns a modal explaining the scoring system
function createScoreExplanationModal() {
  const modalOverlay = document.createElement("div");
  modalOverlay.className = "modal-overlay";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  const closeButton = document.createElement("button");
  closeButton.className = "modal-close";
  closeButton.innerHTML = "&times;";

  const modalTitle = document.createElement("h2");
  modalTitle.className = "modal-title";
  modalTitle.textContent = "📊 Como funciona a pontuação?";

  const introDiv = document.createElement("div");
  introDiv.className = "modal-intro";
  introDiv.innerHTML = `
          <p>Sua pontuação na plataforma está diretamente ligada ao seu desempenho nos simulados. 
          Quanto melhor seu desempenho, mais pontos você ganha e maior seu nível!</p>
      `;

  //Define the explanation itens (icon, title, content)
  const explanationItems = [
    {
      icon: "🎯",
      title: "Nível das Questões",
      content: `
                  Você receberá questões do mesmo nível em que se encontra.<br><br>
                  <strong>Nível 1:</strong> questões de dificuldade 1<br>
                  <strong>Nível 2:</strong> questões de dificuldade 2<br>
                  <strong>Nível 3:</strong> questões de dificuldade 3
              `,
    },
    {
      icon: "🧮",
      title: "Cálculo de Pontos",
      content: `
                  Cada questão vale <strong>10 pontos × seu nível atual</strong>.<br><br>
                  <strong>Exemplo Nível 2:</strong> cada acerto vale 20 pontos<br><br>
                  ✅ <strong>Acerto:</strong> + (10 × nível) pontos<br>
                  ❌ <strong>Erro:</strong> - (10 × nível) pontos
              `,
    },
    {
      icon: "📈",
      title: "Faixas de Pontuação",
      content: `
                  <div style="display: flex; flex-direction: column; gap: 8px;">
                      <div><strong>Nível 1:</strong> 0 a 119 pontos</div>
                      <div><strong>Nível 2:</strong> 120 a 359 pontos</div>
                      <div><strong>Nível 3:</strong> 360+ pontos</div>
                  </div>
                  <br>
                  <strong>Dica:</strong> Fazer simulados completos e revisar erros acelera sua progressão!
              `,
    },
  ];

  //Append basic modal elements
  modalContent.appendChild(closeButton);
  modalContent.appendChild(modalTitle);
  modalContent.appendChild(introDiv);

  //Create and append each explanation item
  explanationItems.forEach((item) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "modal-item";

    const iconSpan = document.createElement("span");
    iconSpan.className = "modal-icon";
    iconSpan.textContent = item.icon;

    const contentDiv = document.createElement("div");
    contentDiv.className = "modal-item-content";

    const titleDiv = document.createElement("div");
    titleDiv.className = "modal-item-title";
    titleDiv.textContent = item.title;

    const textDiv = document.createElement("div");
    textDiv.className = "modal-text";
    textDiv.innerHTML = item.content;

    contentDiv.appendChild(titleDiv);
    contentDiv.appendChild(textDiv);

    itemDiv.appendChild(iconSpan);
    itemDiv.appendChild(contentDiv);

    modalContent.appendChild(itemDiv);
  });

  //Create and append modal footer
  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer";
  modalFooter.textContent = "Bons estudos e continue evoluindo! 🚀";
  modalContent.appendChild(modalFooter);

  modalOverlay.appendChild(modalContent);

  //Event listeners for closing the modal
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modalOverlay);
    document.body.style.overflow = "auto";
  });

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      document.body.removeChild(modalOverlay);
      document.body.style.overflow = "auto";
    }
  });

  //Prevent scrolling when modal is open
  document.body.style.overflow = "hidden";

  return modalOverlay;
}

//Main ExamPage component that handles the exam flow
function ExamPage() {
  //Create main container element
  const element = document.createElement("div");
  const header = Header();
  const headerWithoutMenu = HeaderWithoutMenu();

  element.appendChild(header);

  element.style.height = "100vh";
  element.style.display = "flex";
  element.style.flexDirection = "column";
  element.style.alignItems = "center";

  //Creates the initial page for starting a new exam
  function InitialPageStartNewExam(timeDifference) {
    const container = document.createElement("div");
    container.id = "containerInitial";
    container.innerHTML = `
            <button id="scoreExplanationBtn">Explicação da Pontuação</button>
            <main>
                <h1>SIMULADO ENEM</h1>
                <p>Um mini simulado do ENEM com 12 questões e duração aproximada de 30 minutos. O nível de dificuldade é <span id="examLevel">2</span></p>
                <button id="startButton" class="button">INICIAR</button>
            </main>
        `;

    //Click handler for score explanation button
    const explanationBtn = container.querySelector("#scoreExplanationBtn");
    explanationBtn.addEventListener("click", () => {
      const modal = createScoreExplanationModal();
      document.body.appendChild(modal);
    });

    //Responsive image handling
    let viewportWidth = window.innerWidth;
    const examImage = document.createElement("img");
    let addedImage = false;
    examImage.src = "../../images/site/Simulado.png";
    examImage.id = "examImage";
    examImage.alt = "Estudante Ilustração";

    if (viewportWidth > 1100) {
      addedImage = true;
      container.appendChild(examImage);
    }

    //Handle window resize for responsive imagem
    window.addEventListener("resize", () => {
      viewportWidth = window.innerWidth;
      if (viewportWidth > 1100 && !addedImage) {
        addedImage = true;
        container.appendChild(examImage);
      } else if (viewportWidth < 1100 && addedImage) {
        container.removeChild(examImage);
        addedImage = false;
      }
    });

    container.style.padding = "0px 20px";

    //Start exam button handler
    const startButton = container.querySelector("#startButton");

    startButton.addEventListener("click", () => {
      fetch(`/api/exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          renderQuestionsPage(data, timeDifference);
        });
    });

    //Fetches and displays the user's current level
    async function fetchUserLevel() {
      const response = await fetch(`/api/points`);
      const data = await response.json();
      const level = container.querySelector("#examLevel");
      level.textContent = data.level;
    }

    fetchUserLevel();
    return container;
  }

  //Creates the initial page when there is an ongoing exam
  function InitialPageContinueExam(exam, timeDifference) {
    const container = document.createElement("div");
    container.id = "containerInitial";
    container.innerHTML = `
        <button id="scoreExplanationBtn">Explicação da Pontuação</button>
        <main>
            <h1>SIMULADO ENEM</h1>
            <p>Você já está com um simulado aberto.</p>
            <button id="startButton" class="button">CONTINUAR</button>
        </main>
    `;

    //Score explanation button handler
    const explanationBtn = container.querySelector("#scoreExplanationBtn");
    explanationBtn.addEventListener("click", () => {
      const modal = createScoreExplanationModal();
      document.body.appendChild(modal);
    });

    //Responsive image handling
    let viewportWidth = window.innerWidth;
    const examImage = document.createElement("img");
    let addedImage = false;
    examImage.src = "../../images/site/Simulado.png";
    examImage.id = "examImage";
    examImage.alt = "Estudante Ilustração";

    if (viewportWidth > 1100) {
      addedImage = true;
      container.appendChild(examImage);
    }

    window.addEventListener("resize", () => {
      viewportWidth = window.innerWidth;
      if (viewportWidth > 1100 && !addedImage) {
        addedImage = true;
        container.appendChild(examImage);
      } else if (viewportWidth < 1100 && addedImage) {
        container.removeChild(examImage);
        addedImage = false;
      }
    });

    //Continue exam button handler
    const startButton = container.querySelector("#startButton");

    startButton.addEventListener("click", () => {
      renderQuestionsPage(exam, timeDifference);
    });

    return container;
  }

  //Renders the questions page for an ongoing exam
  function renderQuestionsPage(simulado, timeDifference) {
    const questions = simulado.questions;

    element.innerHTML = ``;

    element.appendChild(headerWithoutMenu);

    //Creates exam container
    const containerExam = document.createElement("div");
    containerExam.id = "containerExam";
    containerExam.style.flexGrow = 2;
    element.appendChild(containerExam);

    //Initialize and display timer
    const { timerContainer, intervalId } = Timer(
      new Date(simulado.limit_time).getTime(),
      sendAndRenderPage,
      timeDifference
    );

    containerExam.appendChild(timerContainer);

    //Create questions container
    const containerQuestions = document.createElement("div");
    containerQuestions.id = "containerQuestions";
    containerExam.appendChild(containerQuestions);

    //Create submit button
    const sendButton = document.createElement("button");
    sendButton.id = "sendButton";
    sendButton.innerHTML = "RESPONDER";
    sendButton.classList.add("button");
    containerExam.appendChild(sendButton);

    //Render each question
    questions.forEach((question, index) => {
      containerQuestions.appendChild(
        QuestionElement(
          question,
          index,
          async (alternativeId, questionId, examId = simulado.id) => {
            const response = await fetch(
              `/api/exam/${examId}/question/${questionId}`,
              {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  id_alternative: alternativeId,
                }),
              }
            );
            const data = await response.json();
          }
        )
      );
    });

    //Submit button handler
    sendButton.addEventListener("click", () => {
      fetch(`/api/exam/${simulado.id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          //Chek if all questions were answered
          let allAnsered = true;
          data.questions.forEach((question) => {
            if (!question.answer_id) {
              allAnsered = false;
            }
          });

          //Show confirmation modal if not all questions are anwered
          if (!allAnsered) {
            const modalContainer = ConfirmationModal(
              "Mandar respostas incompletas?",
              () => {
                sendAndRenderPage();
                clearInterval(intervalId);
              }
            );
            element.appendChild(modalContainer);
            return;
          }
          sendAndRenderPage();
          clearInterval(intervalId);
        });
    });

    //Submits the exam and renders the result page
    function sendAndRenderPage() {
      fetch(`/api/exam/${simulado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          renderResultPage(data);
        });
      window.scrollTo({ behavior: "smooth", top: 0 });
    }

    //Add footer
    const footer = renderFooter();
    footer.style.width = "100vw";
    element.appendChild(footer);
  }

  //Renders the results page after exam submission
  function renderResultPage(simulado) {
    let questions;
    questions = simulado.questions;
    element.innerHTML = "";
    const header = Header();
    header.style.width = "100vw";
    element.appendChild(header);

    const containerResults = document.createElement("div");
    containerResults.style.flexGrow = 2;
    containerResults.id = "containerResults";
    element.appendChild(containerResults);

    //Renders each questions with results
    questions.forEach((question, index) => {
      containerResults.appendChild(QuestionElementResult(question, index));
    });

    //Add footer
    const footer = renderFooter();
    footer.style.width = "100vw";
    element.appendChild(footer);
  }

  //Fetches exam history and determines which initial page to show
  async function fetchExamsHistory() {
    const response = await fetch(`/api/exam`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    let notDoneExam;

    //Check for ongoing exams
    data.forEach((exam) => {
      if (!exam.done) {
        notDoneExam = exam;
      }
    });

    const responseTime = await fetch(`/api/time`);
    const dataTime = await responseTime.json();
    const dateServer = new Date(dataTime.time);
    const dateClient = new Date();
    const timeDifference = dateClient.getTime() - dateServer.getTime();
    if (!notDoneExam) {
      element.appendChild(InitialPageStartNewExam(timeDifference));
    } else {
      element.appendChild(InitialPageContinueExam(notDoneExam, timeDifference));
    }

    //Add footer
    const footer = renderFooter();
    footer.style.width = "100vw";
    element.appendChild(footer);
  }

  fetchExamsHistory();

  return element;
}

export default ExamPage;
