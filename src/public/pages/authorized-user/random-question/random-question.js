import Header from "/components/headerWithMenu.js";
import { renderFooter as Footer } from "/components/footer.js";
import Message from "/components/message.js";
import RandomQuestion from "/components/questionRandom.js";
import RandomQuestionResponse from "/components/questionRandomResult.js";
const originalUrl = "/api/questions?";

function RandomQuestionPage() {
  const element = document.createElement("div");
  element.style.height = "100vh";
  element.style.display = "flex";
  element.style.flexDirection = "column";

  const header = Header();

  element.appendChild(header);

  const container = document.createElement("div");

  container.style.flexGrow = 2;

  container.innerHTML = `
  <h1>Questão aleatoria</h1>
  <div id="filters">
      <label class="label">Ano
          <select id="year" class="filter">
              <option value="">Todos</option>
              <option value="2009">2009</option>
          </select>
      </label>
      <label class="label">Disciplina
          <select id="discipline" class="filter">
              <option value="">Todos</option>
              <option value="matematica">Matemática</option>
              <option value="linguagens">Linguagens</option>
              <option value="ciencias-humanas">Ciências Humanas</option>
              <option value="ciencias-natureza">Ciências da Natureza</option>
          </select>
      </label>
      <label class="label">Nível
          <select id="level" class="filter">
              <option value="">Todos</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
          </select>
      </label>
      <button id="generate" class="button">GERAR</button>
  </div>
  `;

  element.appendChild(container);

  element.appendChild(Footer());

  container.style.padding = "0.5rem 2rem";

  const questionContainer = document.createElement("div");
  const generate = container.querySelector("#generate");

  generate.addEventListener("click", async () => {
    const year = container.querySelector("#year").value;
    const discipline = container.querySelector("#discipline").value;
    const level = container.querySelector("#level").value;
    let url = originalUrl;
    url += "random=true&";
    url += "amount=1";
    url += discipline ? "&disciplinas=" + discipline : "";
    url += level ? "&level=" + level : "";
    url += year ? "&ano=" + year : "";
    const response = await fetch(url);
    const data = await response.json();
    questionContainer.innerHTML = "";
    if (data.length === 0) {
      questionContainer.innerHTML = `
      <div class="no-results-container">
                <div class="no-results-icon">🔍</div>
                <h3 class="no-results-title">Ops... nada por aqui!</h3>
                <div class="no-results-message">
                    <p>Não encontramos nenhuma pergunta com esses critérios.</p>
                </div>
            </div>
      `;
      return;
    }

    const question = data.results[0];
    questionContainer.id = "questionContainer";
    questionContainer.append(RandomQuestion(question));
    const buttonRespond = document.createElement("button");
    buttonRespond.innerText = "RESPONDER";
    buttonRespond.classList.add("button");
    buttonRespond.id = "buttonRespond";
    buttonRespond.addEventListener("click", () => {
      const radioButtons = document.querySelectorAll('input[type="radio"]');
      let oneChecked = false;
      let selectedValue = null;
      radioButtons.forEach((radio) => {
        if (radio.checked) {
          selectedValue = radio.value;
          oneChecked = true;
        }
      });
      if (!oneChecked) {
        element.appendChild(Message(false, "Selecione uma alternativa"));
        return;
      }
      questionContainer.innerHTML = "";
      question.answer_id = selectedValue;
      questionContainer.append(RandomQuestionResponse(question));
    });
    questionContainer.appendChild(buttonRespond);
  });

  container.appendChild(questionContainer);

  return element;
}

export default RandomQuestionPage;
