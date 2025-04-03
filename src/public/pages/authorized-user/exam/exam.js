import Header from "/components/headerWithMenu.js";
import { renderFooter } from "/components/footer.js";
import HeaderWithoutMenu from "/components/headerWithoutMenu.js";
import QuestionElement from "/components/questionExam.js";
import QuestionElementResult from "/components/questionExamResult.js";
import ConfirmationModal from "/components/confirmationModal.js";
import Timer from "/components/timer.js";
const url = `http://localhost:4000`;

function ExamPage() {
  const element = document.createElement("div");
  const header = Header();
  const headerWithoutMenu = HeaderWithoutMenu();

  element.appendChild(header);

  element.style.height = "100vh";
  element.style.display = "flex";
  element.style.flexDirection = "column";
  element.style.alignItems = "center";

  function InitialPageStartNewExam() {
    const container = document.createElement("div");
    container.id = "containerInitial";
    container.innerHTML = `
            <main>
                <h1>SIMULADO ENEM</h1>
                <p>Um mini simulado do ENEM com 12 questões e duração aproximada de 30 minutos. O nível de dificuldade é <span id="examLevel">2</span></p>
                <button id="startButton" class="button">INICIAR</button>
            </main>
        `;

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

    container.style.padding = "0px 20px";

    const startButton = container.querySelector("#startButton");

    startButton.addEventListener("click", () => {
      fetch(`${url}/api/exam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          renderQuestionsPage(data);
        });
    });

    async function fetchUserLevel() {
      const response = await fetch(`${url}/api/points`);
      const data = await response.json();
      const level = container.querySelector("#examLevel");
      level.textContent = data.level;
    }

    fetchUserLevel();
    return container;
  }

  function InitialPageContinueExam(exam) {
    const container = document.createElement("div");
    container.id = "containerInitial";
    container.innerHTML = `
        <main>
            <h1>SIMULADO ENEM</h1>
            <p>Você já está com um simulado aberto.</p>
            <button id="startButton" class="button">CONTINUAR</button>
        </main>
    `;

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

    const startButton = container.querySelector("#startButton");

    startButton.addEventListener("click", () => {
      renderQuestionsPage(exam);
    });

    return container;
  }

  function renderQuestionsPage(simulado) {
    const questions = simulado.questions;

    element.innerHTML = ``;

    element.appendChild(headerWithoutMenu);

    const containerExam = document.createElement("div");
    containerExam.id = "containerExam";
    element.appendChild(containerExam);

    const { timerContainer, intervalId } = Timer(
      Date.now(),
      new Date(simulado.limit_time).getTime(),
      sendAndRenderPage
    );

    containerExam.appendChild(timerContainer);

    const containerQuestions = document.createElement("div");
    containerQuestions.id = "containerQuestions";
    containerExam.appendChild(containerQuestions);

    const sendButton = document.createElement("button");
    sendButton.id = "sendButton";
    sendButton.innerHTML = "RESPONDER";
    sendButton.classList.add("button");
    containerExam.appendChild(sendButton);

    questions.forEach((question, index) => {
      containerQuestions.appendChild(
        QuestionElement(
          question,
          index,
          async (alternativeId, questionId, examId = simulado.id) => {
            const response = await fetch(
              `${url}/api/exam/${examId}/question/${questionId}`,
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

    sendButton.addEventListener("click", () => {
      fetch(`${url}/api/exam/${simulado.id}`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let allAnsered = true;
          data.questions.forEach((question) => {
            if (!question.answer_id) {
              allAnsered = false;
            }
          });
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

    function sendAndRenderPage() {
      fetch(`${url}/api/exam/${simulado.id}`, {
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

    const footer = renderFooter();
    footer.style.width = "100vw";
    element.appendChild(footer);
  }

  function renderResultPage(simulado) {
    let questions;
    questions = simulado.questions;
    element.innerHTML = "";
    const header = Header();
    header.style.width = "100vw";
    element.appendChild(header);

    const containerResults = document.createElement("div");
    containerResults.id = "containerResults";
    element.appendChild(containerResults);

    questions.forEach((question, index) => {
      containerResults.appendChild(QuestionElementResult(question, index));
    });

    const footer = renderFooter();
    footer.style.width = "100vw";
    element.appendChild(footer);
  }

  async function fetchExamsHistory() {
    const response = await fetch(`${url}/api/exam`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    let notDoneExam;
    data.forEach((exam) => {
      if (!exam.done) {
        notDoneExam = exam;
      }
    });

    if (!notDoneExam) {
      element.appendChild(InitialPageStartNewExam());
    } else {
      element.appendChild(InitialPageContinueExam(notDoneExam));
    }
    const footer = renderFooter();
    footer.style.width = "100vw";
    element.appendChild(footer);
  }

  fetchExamsHistory();

  return element;
}

export default ExamPage;
