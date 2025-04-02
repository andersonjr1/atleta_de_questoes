import Header from "/components/headerWithMenu.js";
import HeaderWithoutMenu from "/components/headerWithoutMenu.js";
import QuestionElement from "/components/questionExam.js";
import QuestionElementResult from "/components/questionExamResult.js";
import ConfirmationModal from "/components/confirmationModal.js";
import Timer from "/components/timer.js";
const url = `http://localhost:4000`;

function ExamPage() {
  const element = document.createElement("div");

  element.style.height = "100vh";
  element.style.display = "flex";
  element.style.flexDirection = "column";
  element.style.alignItems = "center";
  const nowDate = new Date();

  function renderInitialPageNewExam() {
    const container = document.createElement("div");
    container.id = "containerInitial";
    container.innerHTML = `
        <main>
            <h1>SIMULADO ENEM</h1>
            <p>Um mini simulado do ENEM com 15 questões e duração aproximada de 35 minutos. O nível de dificuldade é X</p>
            <button id="startButton" class="button">INICIAR</button>
        </main>
        <img src="../../images/site/Simulado.png" id="examImage" alt="Estudante Ilustração">
    `;

    const startButton = container.querySelector("#startButton");
    element.appendChild(Header());
    element.appendChild(container);

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
  }

  function renderInitialPageContinue(simulado) {
    const container = document.createElement("div");
    container.id = "containerInitial";
    container.innerHTML = `
        <main>
            <h1>SIMULADO ENEM</h1>
            <p>Você já está com um simulado aberto.</p>
            <button id="startButton" class="button">CONTINUAR</button>
        </main>
        <img src="../../images/site/Simulado.png" id="examImage" alt="Estudante Ilustração">
    `;

    const startButton = container.querySelector("#startButton");
    element.appendChild(Header());
    element.appendChild(container);

    startButton.addEventListener("click", () => {
      renderQuestionsPage(simulado);
    });
  }

  function renderQuestionsPage(simulado) {
    const questions = simulado.questions;

    element.innerHTML = ``;

    element.appendChild(HeaderWithoutMenu());

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
    }
  }

  function renderResultPage(simulado) {
    let questions;
    questions = simulado.questions;
    element.innerHTML = "";
    element.appendChild(Header());

    const containerResults = document.createElement("div");
    containerResults.id = "containerResults";
    element.appendChild(containerResults);

    questions.forEach((question, index) => {
      containerResults.appendChild(QuestionElementResult(question, index));
    });
  }

  fetch(`${url}/api/exam`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      let simulado;
      data.forEach((exam) => {
        if (!exam.done) {
          simulado = exam;
        }
      });
      if (!simulado) {
        renderInitialPageNewExam();
      } else {
        renderInitialPageContinue(simulado);
      }
    });
  return element;
}

export default ExamPage;
