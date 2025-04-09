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
            <button id="scoreExplanationBtn">Explicação da Pontuação</button>
            <main>
                <h1>SIMULADO ENEM</h1>
                <p>Um mini simulado do ENEM com 12 questões e duração aproximada de 30 minutos. O nível de dificuldade é <span id="examLevel">2</span></p>
                <button id="startButton" class="button">INICIAR</button>
            </main>
        `;

        function createScoreExplanationModal() {
          const modalOverlay = document.createElement("div");
          modalOverlay.className = "modal-overlay";
          
          modalOverlay.innerHTML = `
              <div class="modal-content">
                  <button class="modal-close">&times;</button>
                  <div class="modal-title">📝 Como funciona a pontuação?</div>
                  <div class="modal-text">Sua pontuação na plataforma está diretamente ligada ao seu desempenho nos simulados. Aqui está tudo o que você precisa saber:</div>
                  
                  <div class="modal-item">
                      <span class="modal-icon">🎯</span>
                      <div>
                          <strong>Nível das Questões</strong><br>
                          Você receberá questões do mesmo nível em que se encontra.<br><br>
                          Se estiver no Nível 1, fará questões de dificuldade 1.<br>
                          Se estiver no Nível 2, fará questões de dificuldade 2, e assim por diante.
                      </div>
                  </div>
                  
                  <div class="modal-item">
                      <span class="modal-icon">🧮</span>
                      <div>
                          <strong>Como os pontos são calculados?</strong><br>
                          Cada questão vale 10 pontos multiplicados pelo seu nível atual.<br><br>
                          Exemplo: se você está no Nível 2, cada acerto vale 20 pontos.<br><br>
                          ✅ Se acertar a questão, ganha a pontuação correspondente.<br>
                          ❌ Se errar, perde a pontuação correspondente.
                      </div>
                  </div>
                  
                  <div class="modal-item">
                      <span class="modal-icon">📈</span>
                      <div>
                          <strong>Níveis e Faixas de Pontuação</strong><br>
                          Nível 1 → de 0 a 119 pontos<br>
                          Nível 2 → de 120 a 359 pontos<br>
                          Nível 3 → a partir de 360 pontos<br><br>
                          Sua evolução depende de suas escolhas e acertos. Capriche nos simulados e suba de nível! 🚀
                      </div>
                  </div>
              </div>
          `;
          
          //Close modal clicking on x
          const closeButton = modalOverlay.querySelector(".modal-close");
          closeButton.addEventListener("click", () => {
              document.body.removeChild(modalOverlay);
          });
          
          //Close modal clicking outside box
          modalOverlay.addEventListener("click", (e) => {
              if (e.target === modalOverlay) {
                  document.body.removeChild(modalOverlay);
              }
          });
          
          return modalOverlay;
      }
      
      const explanationBtn = container.querySelector("#scoreExplanationBtn");
      explanationBtn.addEventListener("click", () => {
          const modal = createScoreExplanationModal();
          document.body.appendChild(modal);
      });

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
        <button id="scoreExplanationBtn">Explicação da Pontuação</button>
        <main>
            <h1>SIMULADO ENEM</h1>
            <p>Você já está com um simulado aberto.</p>
            <button id="startButton" class="button">CONTINUAR</button>
        </main>
    `;

    const explanationBtn = container.querySelector("#scoreExplanationBtn");
    explanationBtn.addEventListener("click", () => {
        const modal = createScoreExplanationModal();
        document.body.appendChild(modal);
    });

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
