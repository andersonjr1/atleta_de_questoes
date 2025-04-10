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

  //Add filter controls for year, discipline and difficulty level
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
  //Handle "Generate" button click to fetch a random question
  const generate = container.querySelector("#generate");

  generate.addEventListener("click", async () => {
    //Get filter values from the dropdowns
    const year = container.querySelector("#year").value;
    const discipline = container.querySelector("#discipline").value;
    const level = container.querySelector("#level").value;
    
    //Build the request URL with filters
    let url = originalUrl;
    url += "random=true&";
    url += "amount=1";
    url += discipline ? "&disciplinas=" + discipline : "";
    url += level ? "&level=" + level : "";
    url += year ? "&ano=" + year : "";

    //Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();
    questionContainer.innerHTML = "";

    //If no wurdtions match the filters, show a "not found" message
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

    //Get the question and render it
    const question = data.results[0];
    questionContainer.id = "questionContainer";
    questionContainer.append(RandomQuestion(question));

    const buttonRespond = document.createElement("button");
    buttonRespond.innerText = "RESPONDER";
    buttonRespond.classList.add("button");
    buttonRespond.id = "buttonRespond";

    buttonRespond.addEventListener("click", () => {
      const selectedRadio = document.querySelector('input[type="radio"]:checked');
      if (!selectedRadio) {
        element.appendChild(Message(false, "Selecione uma alternativa"));
        return;
      }

      const selectedValue = selectedRadio.value;
      const correctAlternative = question.alternatives.find(a => a.is_correct);
      const userWasCorrect = selectedValue === correctAlternative?.id;

      question.answer_id = selectedValue;
      
      questionContainer.innerHTML = "";
      questionContainer.append(RandomQuestionResponse(question, userWasCorrect));
    });

    questionContainer.appendChild(buttonRespond);
  });

  container.appendChild(questionContainer);
  return element;
}

export default RandomQuestionPage;