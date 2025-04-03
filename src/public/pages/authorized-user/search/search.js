import Header from "/components/headerWithMenu.js";
import { renderFooter as Footer } from "/components/footer.js";

function SearchPage() {
  async function showQuestionModal(questionId) {
    const modal = document.createElement("div");
    modal.id = "questionModal";
    modal.style.display = "block";
    modal.style.position = "fixed";
    modal.style.zIndex = "1000";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.overflow = "auto";
    modal.style.backgroundColor = "rgba(0,0,0,0.5)";

    const modalContent = document.createElement("div");
    modalContent.style.backgroundColor = "#ffffff";
    modalContent.style.margin = "5% auto";
    modalContent.style.padding = "25px";
    modalContent.style.border = "none";
    modalContent.style.width = "90%";
    modalContent.style.maxWidth = "800px";
    modalContent.style.borderRadius = "10px";
    modalContent.style.boxShadow = "0 5px 15px rgba(0,0,0,0.2)";

    const closeBtn = document.createElement("span");
    closeBtn.innerHTML = "&times;";
    closeBtn.style.color = "#aaa";
    closeBtn.style.float = "right";
    closeBtn.style.fontSize = "28px";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.cursor = "pointer";
    closeBtn.style.transition = "color 0.3s";

    closeBtn.onmouseover = () => (closeBtn.style.color = "#333");
    closeBtn.onmouseout = () => (closeBtn.style.color = "#aaa");

    const modalHeader = document.createElement("div");
    modalHeader.style.padding = "10px 0";
    modalHeader.style.borderBottom = "1px solid #eee";
    modalHeader.style.marginBottom = "20px";
    modalHeader.style.display = "flex";
    modalHeader.style.justifyContent = "space-between";
    modalHeader.style.alignItems = "center";

    const modalTitle = document.createElement("h2");
    modalTitle.textContent = "Questão";
    modalTitle.style.fontSize = "24px";
    modalTitle.style.margin = "0";
    modalTitle.style.color = "#2c3e50";

    const modalBody = document.createElement("div");
    modalBody.style.padding = "10px 0";
    modalBody.style.minHeight = "200px";

    modalHeader.appendChild(modalTitle);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    function closeModal() {
      document.body.removeChild(modal);
    }

    closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    try {
      const response = await fetch(
        `http://localhost:4000/api/questions/search?id=${questionId}`
      );

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const questionData = data[0];

      console.log(questionData);

      modalTitle.textContent = `Questão ${questionData.vestibular || ""} ${
        questionData.year || ""
      }`;

      const questionContent = document.createElement("div");
      questionContent.style.fontFamily = "Arial, sans-serif";
      questionContent.style.lineHeight = "1.6";

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

      if (questionData.support_file) {
        questionData.support_file.forEach((fileUrl) => {
          const img = document.createElement("img");
          img.src = fileUrl;
          img.alt = "Question Image";
          img.style.maxWidth = "100%";
          img.style.height = "auto";
          questionContent.appendChild(img);
        });
      }

      if (questionData.alternative_introduction) {
        const questionText = document.createElement("div");
        questionText.style.marginBottom = "25px";
        questionText.style.fontWeight = "500";
        questionText.style.marginBottom = "20px";
        questionText.style.padding = "15px";
        questionText.style.backgroundColor = "#f8f9fa";
        questionText.style.borderRadius = "8px";
        questionText.style.borderLeft = "4px solid #3498db";
        questionText.innerHTML = `<p style="margin: 0; font-style: italic;">${questionData.alternative_introduction}</p>`;
        questionContent.appendChild(questionText);
      }

      if (questionData.alternatives && questionData.alternatives.length > 0) {
        const alternativesTitle = document.createElement("h3");
        alternativesTitle.textContent = "Alternativas";
        alternativesTitle.style.marginBottom = "15px";
        alternativesTitle.style.color = "#2c3e50";
        alternativesTitle.style.fontSize = "20px";
        questionContent.appendChild(alternativesTitle);

        const alternativesList = document.createElement("div");
        alternativesList.style.marginBottom = "25px";

        let selectedAlternative = null;

        questionData.alternatives.forEach((alternative) => {
          const altDiv = document.createElement("div");
          altDiv.style.padding = "12px 15px";
          altDiv.style.marginBottom = "8px";
          altDiv.style.borderRadius = "6px";
          altDiv.style.backgroundColor = "#f5f5f5";
          altDiv.style.borderLeft = "4px solid #e0e0e0";
          altDiv.style.transition = "all 0.3s";
          altDiv.style.cursor = "pointer";

          altDiv.innerHTML = `
                      <div style="display: flex; align-items: center;">
                          <span style="font-weight: bold; margin-right: 10px; color: #333">
                              ${alternative.letter}.
                          </span>
                          <span style="flex: 1;">${alternative.alternative_text}</span>
                      </div>
                  `;

          altDiv.addEventListener("click", () => {
            if (selectedAlternative !== null) return;

            selectedAlternative = alternative;

            const allAlternatives = alternativesList.querySelectorAll("div");
            allAlternatives.forEach((alt) => {
              alt.style.cursor = "default";
              alt.style.pointerEvents = "none";
            });

            if (alternative.is_correct) {
              altDiv.style.backgroundColor = "#e8f5e9";
              altDiv.style.borderLeft = "4px solid #4caf50";
              altDiv.querySelector("span").style.color = "#4caf50";

              const checkMark = document.createElement("span");
              checkMark.textContent = " ✓";
              checkMark.style.color = "#4caf50";
              checkMark.style.marginLeft = "10px";
              altDiv.querySelector("div").appendChild(checkMark);
            } else {
              altDiv.style.backgroundColor = "#ffebee";
              altDiv.style.borderLeft = "4px solid #f44336";
              altDiv.querySelector("span").style.color = "#f44336";

              const xMark = document.createElement("span");
              xMark.textContent = " ✗";
              xMark.style.color = "#f44336";
              xMark.style.marginLeft = "10px";
              altDiv.querySelector("div").appendChild(xMark);

              const correctAlternative = questionData.alternatives.find(
                (a) => a.is_correct
              );
              if (correctAlternative) {
                const correctIndex =
                  questionData.alternatives.indexOf(correctAlternative);
                const correctDiv = alternativesList.children[correctIndex];

                correctDiv.style.backgroundColor = "#e8f5e9";
                correctDiv.style.borderLeft = "4px solid #4caf50";
                correctDiv.querySelector("span").style.color = "#4caf50";

                const checkMark = document.createElement("span");
                checkMark.textContent = " ✓";
                checkMark.style.color = "#4caf50";
                checkMark.style.marginLeft = "10px";
                correctDiv.querySelector("div").appendChild(checkMark);
              }
            }

            metaContainer.style.display = "grid";
          });

          altDiv.addEventListener("mouseenter", () => {
            if (selectedAlternative === null) {
              altDiv.style.backgroundColor = "#e3f2fd";
              altDiv.style.borderLeft = "4px solid #2196f3";
            }
          });

          altDiv.addEventListener("mouseleave", () => {
            if (selectedAlternative === null) {
              altDiv.style.backgroundColor = "#f5f5f5";
              altDiv.style.borderLeft = "4px solid #e0e0e0";
            }
          });

          alternativesList.appendChild(altDiv);
        });

        questionContent.appendChild(alternativesList);
      }

      const metaContainer = document.createElement("div");
      metaContainer.style.display = "none";
      metaContainer.style.gridTemplateColumns = "1fr";
      metaContainer.style.gap = "20px";
      metaContainer.style.marginBottom = "20px";

      const metadataDiv = document.createElement("div");
      metadataDiv.style.backgroundColor = "#f0f7ff";
      metadataDiv.style.padding = "15px";
      metadataDiv.style.borderRadius = "8px";

      metadataDiv.innerHTML = `
              <h3 style="margin-top: 0; margin-bottom: 15px; color: #2c3e50;">Informações</h3>
              <div style="display: grid; grid-template-columns: max-content 1fr; gap: 10px 20px;">
                  ${
                    questionData.discipline
                      ? `<span style="font-weight: bold;">Disciplina:</span><span>${questionData.discipline
                          .split("-")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}</span>`
                      : ""
                  }
                  ${
                    questionData.sub_discipline
                      ? `<span style="font-weight: bold;">Subárea:</span><span>${questionData.sub_discipline}</span>`
                      : ""
                  }
                  ${
                    questionData.year
                      ? `<span style="font-weight: bold;">Ano:</span><span>${questionData.year}</span>`
                      : ""
                  }
                  ${
                    questionData.level
                      ? `<span style="font-weight: bold;">Nível:</span><span>${"⭐".repeat(
                          questionData.level
                        )}</span>`
                      : ""
                  }
                  ${
                    questionData.vestibular
                      ? `<span style="font-weight: bold;">Origem:</span><span>${questionData.vestibular}</span>`
                      : ""
                  }
              </div>
          `;

      metaContainer.appendChild(metadataDiv);

      if (questionData.explanation) {
        const explanationDiv = document.createElement("div");
        explanationDiv.style.backgroundColor = "#fff8e1";
        explanationDiv.style.padding = "15px";
        explanationDiv.style.borderRadius = "8px";
        explanationDiv.style.borderLeft = "4px solid #ffc107";

        explanationDiv.innerHTML = `
                  <h3 style="margin-top: 0; margin-bottom: 10px; color: #2c3e50;">Explicação</h3>
                  <p style="margin: 0;">${questionData.explanation}</p>
              `;

        metaContainer.appendChild(explanationDiv);
      }

      if (questionData.support_urls) {
        console.log(questionData.support_urls);
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
        metaContainer.appendChild(linksDiv);
      }

      questionContent.appendChild(metaContainer);
      modalBody.appendChild(questionContent);
    } catch (error) {
      console.error("Erro ao carregar questão:", error);

      modalTitle.textContent = "Erro ao carregar questão";
      modalBody.innerHTML = `
              <div style="color: #721c24; background-color: #f8d7da; border: 1px solid #f5c6cb; padding: 20px; border-radius: 8px;">
                  <h3 style="margin-top: 0;">Ocorreu um erro</h3>
                  <p>Não foi possível carregar os detalhes da questão.</p>
                  <p><strong>Detalhes:</strong> ${error.message}</p>
                  <button onclick="window.location.reload()" 
                      style="margin-top: 15px; padding: 8px 16px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">
                      Tentar novamente
                  </button>
              </div>
          `;
    }

    return closeModal;
  }

  const element = document.createElement("div");

  element.style.height = "100vh";
  element.style.display = "flex";
  element.style.flexDirection = "column";

  async function renderSearchPage() {
    element.appendChild(Header());

    const container = document.createElement("div");

    container.innerHTML = `
          <h1 class="title">Buscar questões</h1>
          <div class="search-container">
              <input type="text" id="text-search" placeholder="Buscar por texto">
              <!-- Os selects serão inseridos aqui dinamicamente -->
          </div>
          <button class="search-button">Buscar</button>
          <div class="results"></div>
      `;

    container.style.flexGrow = 2;
    container.style.padding = "20px 20px";

    element.appendChild(container);

    element.appendChild(Footer());

    const initialData = await getQuestionsData();
    updateResults(container, initialData);

    const uniqueYears = [...new Set(initialData.map((q) => q.year))].sort(
      (a, b) => b - a
    );
    const uniqueDisciplines = [
      ...new Set(initialData.map((q) => q.discipline)),
    ];
    const uniqueSubDisciplines = [
      ...new Set(initialData.map((q) => q.sub_discipline)),
    ];
    const possibleLevels = [1, 2, 3];

    const searchContainer = container.querySelector(".search-container");

    const selectsHTML = `
          <select id="year-filter">
              <option value="" selected>Todos os anos</option>
              ${uniqueYears
                .map((year) => `<option value="${year}">${year}</option>`)
                .join("")}
          </select>
          
          <select id="discipline-filter">
              <option value="" selected>Todas as áreas</option>
              ${uniqueDisciplines
                .map(
                  (discipline) =>
                    `<option value="${discipline}">${discipline
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}</option>`
                )
                .join("")}
          </select>
          
          <select id="level-filter">
              <option value="" selected>Todos os níveis</option>
              ${possibleLevels
                .map(
                  (level) =>
                    `<option value="${level}">${"⭐".repeat(level)}</option>`
                )
                .join("")}
          </select>
      `;

    searchContainer.innerHTML += selectsHTML;

    container
      .querySelector(".search-button")
      .addEventListener("click", async () => {
        const searchPath = buildSearchPath(container);
        console.log(searchPath);
        const filteredData = await searchQuestions(searchPath);

        updateResults(container, filteredData);
      });
  }

  function buildSearchPath(container) {
    const params = {
      texto: container.querySelector("#text-search").value,
      ano: container.querySelector("#year-filter").value,
      disciplinas: container.querySelector("#discipline-filter").value,
      level: container.querySelector("#level-filter").value,
    };

    const validParams = Object.entries(params)
      .filter(([_, value]) => value !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");

    return validParams ? `/search?${validParams}` : "";
  }

  async function searchQuestions(searchPath) {
    try {
      const response = await fetch(
        `http://localhost:4000/api/questions${searchPath}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      return data.results || data || [];
    } catch (error) {
      console.error("Falha ao buscar questões:", error);
      return [];
    }
  }

  function updateResults(container, questions) {
    const resultArea = document.querySelector(".results");

    resultArea.innerHTML = "";

    if (!questions || questions.length === 0) {
      resultArea.innerHTML = `
              <div class="no-results-container">
                  <div class="no-results-icon">🔍</div>
                  <h3 class="no-results-title">Ops... nada por aqui!</h3>
                  <div class="no-results-message">
                      <p>Não encontramos nenhuma pergunta com esses critérios.</p>
                      <p>Que tal tentar:</p>
                      <ul class="suggestions-list">
                          <li>📝 Usar termos de busca diferentes</li>
                          <li>🌈 Remover alguns filtros</li>
                          <li>🔮 Verificar se há erros de digitação</li>
                      </ul>
                  </div>
              </div>
          `;
      return;
    }

    questions.forEach((question) => {
      resultArea.appendChild(addQuestionToContainer(question));
    });

    container.querySelectorAll(".question-item").forEach((item) => {
      item.addEventListener("click", function () {
        showQuestionModal(this.dataset.id);
      });
    });
  }

  function addQuestionToContainer(questionData) {
    const questionElement = document.createElement("div");
    questionElement.className = "question-item";
    questionElement.dataset.id = questionData.id;

    questionElement.innerHTML = `
          <div class="question-title">${questionData.context}</div>
          <div class="tags">
              <span class="tag tag-ano">${questionData.year}</span>
              <span class="tag tag-area">${questionData.discipline
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}</span>
              <span class="tag star-emoji">${"⭐".repeat(
                questionData.level
              )}</span>
          </div>
      `;

    if (!questionData.context) {
      questionElement.querySelector(".question-title").innerText =
        "Não contem enunciado";
    }

    if (!questionData.context) {
      questionElement.querySelector(".question-title").innerText =
        "Não contem enunciado";
    }

    return questionElement;
  }

  async function getQuestionsData() {
    try {
      const response = await fetch("http://localhost:4000/api/questions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Erro na requisição: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      return data.results || [];
    } catch (error) {
      console.error("Falha ao obter questões:", error);
      return [];
    }
  }

  renderSearchPage();

  return element;
}

export default SearchPage;
