import Header from "/components/headerWithMenu.js";
import { renderFooter } from "/components/footer.js";
import QuestionElementResultHistory from "/components/questionExamResultHistory.js";

function HistoryPage() {
  const element = document.createElement("div");

  element.style.height = "100vh";
  element.style.display = "flex";
  element.style.flexDirection = "column";
  element.style.alignItems = "center";

  function HistoryContainer(exams) {
    const container = document.createElement("div");
    container.id = "containerHistory";
    container.innerHTML = ``;

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

    const textElement = document.createElement("span");

    Object.assign(textElement.style, {
      fontSize: "2rem",
      padding: "1.5rem 2.5rem",
      color: "#1a1a1a",
      backgroundColor: "#f9f9f9",
      borderRadius: "12px",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
      border: "1px solid #e0e0e0",
      textAlign: "center",
      maxWidth: "90%",
      width: "fit-content",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    });

    textElement.addEventListener("mouseenter", () => {
      textElement.style.transform = "scale(1.02)";
      textElement.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
    });

    textElement.addEventListener("mouseleave", () => {
      textElement.style.transform = "scale(1)";
      textElement.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.1)";
    });

    if (exams.length === 0) {
      textElement.innerText = "Você não possui nenhum simulado!";
      containerHistory.appendChild(textElement);
      return;
    }

    //Iterate over exams and render them if completed
    exams.forEach((exam) => {
      if (!exam.done) {
        textElement.innerText = "Você está com um simulado aberto no momento!";
        containerHistory.appendChild(textElement);
        return;
      }
      const examDiv = examElement(exam);
      containerHistory.appendChild(examDiv);
    });

    return container;
  }

  function examElement(exam) {
    const examElement = document.createElement("div");
    const examInformations = document.createElement("div");
    const examImportantInformation = document.createElement("div");
    const examExtraInformation = document.createElement("div");
    const examResults = document.createElement("div");

    examElement.style.width = "100%";
    examElement.style.border = "1px solid #ddd";
    examElement.style.borderRadius = "8px";
    examElement.style.padding = "10px";
    examElement.style.margin = "10px 0";
    examElement.style.backgroundColor = "#ffff";
    examElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";

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
    examExtraInformation.style.marginTop = "10px";
    examExtraInformation.style.flexWrap = "wrap";

    const dateLimit = new Date(exam.limit_time);
    const dateDone = new Date(exam.done_time_at);
    const date = dateDone > dateLimit ? dateLimit : dateDone;

    //Count correct answers
    let totalQuestions = exam.questions.length;
    let correct = 0;

    exam.questions.forEach((question) => {
      question.alternatives.forEach((alternative) => {
        if (alternative.is_correct && alternative.id === question.answer_id) {
          correct += 1;
        }
      });
    });

    //Set date and total score
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

    examResults.style.display = "none";
    examResults.style.padding = "10px";
    examResults.style.marginTop = "10px";
    examResults.style.borderTop = "1px solid #ddd";
    examResults.style.backgroundColor = "#ffffff";
    examResults.style.borderRadius = "5px";

    //Count per-discipline results
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

    //Render per discipline results
    Object.keys(disciplines).forEach((discipline) => {
      const disciplineElement = document.createElement("div");
      disciplineElement.style.display = "flex";
      disciplineElement.style.flexDirection = "column";
      disciplineElement.style.gap = "10px";
      disciplineElement.style.alignItems = "center";
      disciplineElement.style.padding = "10px";
      disciplineElement.style.backgroundColor = "#f4f4f4";
      disciplineElement.style.borderRadius = "7px";
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

  async function fetchExams() {
    try {
      const response = await fetch(`/api/exam`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      //Sort exams by limit time (newest first)
      data.sort(function (a, b) {
        return new Date(b.limit_time) - new Date(a.limit_time);
      });
      const historyContainer = HistoryContainer(data);
      historyContainer.style.flexGrow = 2;
      element.appendChild(historyContainer);
      const footer = renderFooter();
      footer.style.width = "100vw";
      element.appendChild(footer);
    } catch (error) {
      console.log(error);
    }
  }

  element.appendChild(Header());

  fetchExams();

  return element;
}

export default HistoryPage;
