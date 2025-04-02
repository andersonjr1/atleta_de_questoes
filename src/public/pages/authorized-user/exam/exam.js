import Header from "/components/headerWithMenu.js";
import HeaderWithoutMenu from "/components/headerWithoutMenu.js";
import QuestionElement from "/components/questionExam.js";
import QuestionElementResult from "/components/questionExamResult.js";
import QuestionElementResultHistory from "/components/questionExamResultHistory.js";
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

  function renderInitialPageNewExam(simulados) {
    const container = document.createElement("div");
    container.id = "containerInitial";
    container.innerHTML = `
        <main>
            <h1>SIMULADO ENEM</h1>
            <p>Um mini simulado do ENEM com 15 questões e duração aproximada de 35 minutos. O nível de dificuldade é X</p>
            <button id="startButton" class="button">INICIAR</button>
            <span id="history">Ver historico de simulados</span>
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
    const history = container.querySelector("#history");
    history.addEventListener("click", () => {
      renderHistoryPage(simulados);
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

  function renderHistoryPage(simulados) {
    element.innerHTML = "";
    element.appendChild(Header());

    const containerHistory = document.createElement("div");
    containerHistory.id = "containerHistory";
    element.appendChild(containerHistory);

    containerHistory.style.width = "95%";
    containerHistory.style.maxWidth = "1200px";
    containerHistory.style.display = "flex";
    containerHistory.style.flexDirection = "column";
    containerHistory.style.gap = "10px";
    containerHistory.style.alignItems = "center";
    containerHistory.style.marginTop = "10px";

    simulados.forEach((simulado) => {
      console.log(simulado);
      if (!simulado.done) {
        return;
      }
      containerHistory.appendChild(examElement(simulado));
    });
  }

  function examElement(exam) {
    const examElement = document.createElement("div");
    const examInformations = document.createElement("div");
    const examImportantInformation = document.createElement("div");
    const examExtraInformation = document.createElement("div");
    const examResults = document.createElement("div");

    // Styling exam container
    examElement.style.width = "100%";
    examElement.style.border = "1px solid #ddd";
    examElement.style.borderRadius = "8px";
    examElement.style.padding = "10px";
    examElement.style.margin = "10px 0";
    examElement.style.backgroundColor = "#ffff";
    examElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

    // Styling exam information section
    examImportantInformation.style.textAlign = "center";
    examImportantInformation.style.cursor = "pointer";
    examImportantInformation.style.padding = "10px";
    examImportantInformation.style.backgroundColor = "#0B2072";
    examImportantInformation.style.color = "white";
    examImportantInformation.style.borderRadius = "5px";
    examImportantInformation.style.fontWeight = "bold";
    examImportantInformation.style.display = "flex";
    examImportantInformation.style.justifyContent = "space-around";

    examExtraInformation.style.display = "flex";
    examExtraInformation.style.justifyContent = "space-around";
    examExtraInformation.style.gap = "10px";
    examExtraInformation.style.flexWrap = "wrap";

    const dateLimit = new Date(exam.limit_time);
    const dateDone = new Date(exam.done_time_at);
    const date = dateDone > dateLimit ? dateLimit : dateDone;

    let totalQuestions = exam.questions.length;
    let correct = 0;

    exam.questions.forEach((question) => {
      question.alternatives.forEach((alternative) => {
        if (alternative.is_correct && alternative.id === question.answer_id) {
          correct += 1;
        }
      });
    });

    examImportantInformation.innerHTML = `
      <span>Feito Em: ${String(date.getDate()).padStart(2, "0")}/${String(
      date.getMonth() + 1
    ).padStart(2, "0")}/${date.getFullYear()} - ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}</span>
      <span>Acertos totais: ${correct}/${totalQuestions}</span>
    `;

    examInformations.appendChild(examImportantInformation);
    examInformations.appendChild(examExtraInformation);
    examElement.appendChild(examInformations);
    examElement.appendChild(examResults);

    // Styling results container
    examResults.style.display = "none";
    examResults.style.padding = "10px";
    examResults.style.marginTop = "10px";
    examResults.style.borderTop = "1px solid #ddd";
    examResults.style.backgroundColor = "#ffffff";
    examResults.style.borderRadius = "5px";

    let disciplines = {};

    exam.questions.forEach((question) => {
      if (disciplines[question.discipline]) {
        disciplines[question.discipline].total += 1;
        question.alternatives.forEach((alternative) => {
          if (alternative.is_correct && alternative.id === question.answer_id) {
            disciplines[question.discipline].correct += 1;
          }
        });
      } else {
        disciplines[question.discipline] = {
          total: 1,
          correct: 0,
        };
        question.alternatives.forEach((alternative) => {
          if (alternative.is_correct && alternative.id === question.answer_id) {
            disciplines[question.discipline].correct += 1;
          }
        });
      }
    });

    Object.keys(disciplines).forEach((discipline) => {
      const disciplineElement = document.createElement("div");
      disciplineElement.style.display = "flex";
      disciplineElement.style.flexDirection = "column";
      disciplineElement.style.gap = "10px";
      disciplineElement.style.alignItems = "center";
      disciplineElement.style.padding = "10px";
      disciplineElement.style.backgroundColor = "#f4f4f4";
      disciplineElement.style.borderRadius = "16px";
      disciplineElement.style.boxShadow = "2px 2px 10px rgba(0, 0, 0, 0.1)";
      disciplineElement.innerHTML = `<div>
        <span>${discipline
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}</span>
        <span>${disciplines[discipline].correct}/${
        disciplines[discipline].total
      }</span>
      </div>`;
      examExtraInformation.appendChild(disciplineElement);
    });
    examInformations.addEventListener("click", () => {
      if (examResults.style.display === "none") {
        examResults.style.display = "flex";
        examResults.style.flexDirection = "column";
        examResults.style.gap = "10px";
        examResults.innerHTML = "";
        exam.questions.forEach((question) => {
          examResults.appendChild(QuestionElementResultHistory(question));
        });
      } else {
        examResults.style.display = "none";
      }
    });
    return examElement;
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
        data.sort(function (a, b) {
          return new Date(b.limit_time) - new Date(a.limit_time);
        });
        renderInitialPageNewExam(data);
      } else {
        renderInitialPageContinue(simulado);
      }
    });
  return element;
}

export default ExamPage;
