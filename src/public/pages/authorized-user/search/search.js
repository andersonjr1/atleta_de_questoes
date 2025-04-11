import Header from "/components/headerWithMenu.js";
import { renderFooter as Footer } from "/components/footer.js";

function SearchPage() {

  let currentPage = 1;
  let maxPage = 0;
  const limit = 9;

  //Open question modal
  async function showQuestionModal(questionId) {
    document.body.style.overflow = "hidden";

    //Create modal overlay
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
    modalContent.style.maxHeight = "80vh";
    modalContent.style.overflow = "hidden";
    modalContent.style.display = "flex";
    modalContent.style.flexDirection = "column";

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
    modalBody.style.overflowY = "auto";
    modalBody.style.flexGrow = "1";
    modalBody.style.maxHeight = "calc(80vh - 150px)";

    modalHeader.appendChild(modalTitle);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    function closeModal() {
      document.body.style.overflow = "auto";
      document.body.removeChild(modal);
    }

    closeBtn.addEventListener("click", closeModal);

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    //Fetch question data from API
    try {
      const response = await fetch(`/api/questions/${questionId}`);

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const questionData = data;

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

      const metaContainer = document.createElement("div");
      metaContainer.style.display = "block";
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

      if (questionData.support_urls) {
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
    container.classList.add("container")

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

    element.appendChild(paginationButton())

    element.appendChild(Footer());

    const initialData = await fetchQuestions({
      page: currentPage,
      limit: limit,
    });

    getMaxPages()
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
        const filteredData = await fetchQuestions({
          searchParams: searchPath,
          page: currentPage,
          limit: limit,
        });
        
        currentPage = 1;
        getMaxPages(searchPath)
        updatePagination()
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

    return validParams ? `?${validParams}` : "";
  }

  async function fetchQuestions({ searchParams = "", page = null, limit = null, random = false } = {}) {
    try {
      const query = new URLSearchParams(
        typeof searchParams === "string"
          ? searchParams
          : new URLSearchParams(searchParams)
      );
  
      if (page !== null && limit !== null) {
        const startIndex = (page - 1) * limit;
        query.set("page", page);
        query.set("limit", limit + 1);
        query.set("startIndex", startIndex);
      }
  
      if (random) {
        query.set("random", "true");
      }
  
      const url = `/api/questions${query.toString() ? `?${query.toString()}` : ""}`;
  
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
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

  function paginationButton() {
    const container = document.createElement("div");
    container.className = "pagination";
  
    const prevBtn = document.createElement("button");
    prevBtn.className = "pagination-button";
    prevBtn.id = "prevBtn";
    prevBtn.textContent = "Anterior";
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener("click", () => onChangePage(currentPage - 1));
  
    const pageInfo = document.createElement("span");
    pageInfo.className = "pagination-page";
    pageInfo.textContent = `Página ${currentPage}`;
  
    const nextBtn = document.createElement("button");
    nextBtn.className = "pagination-button";
    nextBtn.id = "nextBtn";
    nextBtn.textContent = "Próxima";
    nextBtn.disabled = currentPage >= maxPage;
    nextBtn.addEventListener("click", () => onChangePage(currentPage + 1));
  
    container.appendChild(prevBtn);
    container.appendChild(pageInfo);
    container.appendChild(nextBtn);
  
    return container;
  }
  
  function updatePagination(){

    const containerPagination = document.querySelector(".pagination")

    containerPagination.innerHTML = "";

    const pagination = paginationButton();

    const onlyInnerElements = Array.from(pagination.children); 

    onlyInnerElements.forEach(el => {
      containerPagination.appendChild(el);
    });

    }

  async function onChangePage(newPage) {
    currentPage = newPage;
    
    let container = document.querySelector(".container")

    const searchPath = buildSearchPath(container);
    const filteredData = await fetchQuestions({
        searchParams: searchPath,
        page: currentPage,
        limit: limit,
      });

    updateResults(container, filteredData);    
    updatePagination()
  }

  async function getMaxPages(filter) {

    let data

    if(!filter){
      data = await fetchQuestions()
    }else{
      data = await fetchQuestions({searchParams: filter})
    }    

    const total = data.results ? data.results.length : data.length;
    maxPage = Math.ceil(total / (limit + 1));
    console.log(maxPage);
    
    updatePagination()

  }

  renderSearchPage();

  return element;
}

export default SearchPage;
