import Header from "/components/headerWithMenu.js";
import Message from "/components/message.js";
import RandomQuestion from "/components/questionRandom.js";
import RandomQuestionResponse from "/components/questionRandomResult.js";
const originalUrl = "http://localhost:4000/api/questions/search?";

function RandomQuestionPage() {
  const element = document.createElement("div");

  element.appendChild(Header());

  const container = document.createElement("div");

  container.innerHTML = `
  <h1>Questão aleatoria</h1>
  <div id="filters">
      <label class="label">Ano
          <select id="year" class="filter">
              <option value="">Todos</option>
              <option value="2009">2009</option>
              <option value="2010">2010</option>
              <option value="2011">2011</option>
              <option value="2012">2012</option>
              <option value="2013">2013</option>
              <option value="2014">2014</option>
              <option value="2015">2015</option>
              <option value="2016">2016</option>
              <option value="2017">2017</option>
              <option value="2018">2018</option>
              <option value="2019">2019</option>
              <option value="2020">2020</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
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

  container.style.padding = "0.5rem 2rem";

  const question = {
    id: "teste",
    question_index: 24,
    year: 2009,
    discipline: "ciencias-humanas",
    vestibular: "ENEM",
    level: 3,
    context:
      "Umidade relativa do ar é o termo usado para descrever a quantidade de vapor de água contido na atmosfera. Ela é definida pela razão entre o conteúdo real de umidade de uma parcela de ar e a quantidade de umidade que a mesma parcela de ar pode armazenar na mesma temperatura e pressão quando está saturada de vapor, isto é, com 100% de umidade relativa. O gráfico representa a relação entre a umidade relativa do ar e sua temperatura ao longo de um período de 24 horas em um determinado local.)",
    alternative_introduction:
      "Considerando-se as informações do texto e do gráfico, conclui-se que",
    alternatives: [
      {
        id: "aaaaaaa",
        letter: "A",
        text: "A insolação é um fator que provoca variação da umidade relativa do ar.",
        file: null,
        selected: false,
      },
      {
        id: "bbbbbbbb",
        letter: "B",
        text: "O ar vai adquirindo maior quantidade de vapor de água à medida que se aquece.",
        file: null,
        selected: false,
      },
      {
        id: "ccccc",
        letter: "C",
        text: "A presença de umidade relativa do ar é diretamente proporcional à temperatura do ar.",
        file: null,
        selected: false,
      },
      {
        id: "ddddd",
        letter: "D",
        text: "A umidade relativa do ar indica, em termos absolutos, a quantidade de vapor de água existente na atmosfera.",
        file: null,
        selected: false,
      },
      {
        id: "eeeee",
        letter: "E",
        text: "A variação da umidade do ar se verifica no verão, e não no inverno, quando as temperaturas permanecem baixas.",
        file: null,
        selected: false,
      },
    ],
    support_files: [
      "http://localhost:3500/images/e0412a77-9619-452b-b62e-ba775414bd2c.png",
    ],
  };

  const questionResult = {
    id: "teste",
    question_index: 24,
    year: 2009,
    discipline: "ciencias-humanas",
    vestibular: "ENEM",
    answer_id: "idA",
    level: 3,
    context:
      "Umidade relativa do ar é o termo usado para descrever a quantidade de vapor de água contido na atmosfera. Ela é definida pela razão entre o conteúdo real de umidade de uma parcela de ar e a quantidade de umidade que a mesma parcela de ar pode armazenar na mesma temperatura e pressão quando está saturada de vapor, isto é, com 100% de umidade relativa. O gráfico representa a relação entre a umidade relativa do ar e sua temperatura ao longo de um período de 24 horas em um determinado local.",
    alternative_introduction:
      "Considerando-se as informações do texto e do gráfico, conclui-se que",
    alternatives: [
      {
        id: "idA",
        letter: "A",
        text: "A insolação é um fator que provoca variação da umidade relativa do ar.",
        file: null,
        selected: true,
        is_correct: true,
      },
      {
        id: "idB",
        letter: "B",
        text: "O ar vai adquirindo maior quantidade de vapor de água à medida que se aquece.",
        file: null,
        selected: false,
        is_correct: false,
      },
      {
        letter: "C",
        text: "A presença de umidade relativa do ar é diretamente proporcional à temperatura do ar.",
        file: null,
        selected: false,
        is_correct: false,
      },
      {
        letter: "D",
        text: "A umidade relativa do ar indica, em termos absolutos, a quantidade de vapor de água existente na atmosfera.",
        file: null,
        selected: false,
        is_correct: false,
      },
      {
        letter: "E",
        text: "A variação da umidade do ar se verifica no verão, e não no inverno, quando as temperaturas permanecem baixas.",
        file: null,
        selected: false,
        is_correct: false,
      },
    ],
    question_files: [
      "http://localhost:3500/images/e0412a77-9619-452b-b62e-ba775414bd2c.png",
    ],
    explanation:
      "A alternativa A está correta porque o gráfico mostra que a umidade relativa do ar diminui durante o dia (com o aumento da temperatura/insolação) e aumenta à noite (com o resfriamento), evidenciando a relação inversa entre temperatura e umidade relativa.",
    support_urls: [
      "https://brasilescola.uol.com.br/geografia/umidade-ar.htm",
      "https://mundoeducacao.uol.com.br/geografia/umidade-atmosferica.htm",
    ],
  };

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
    url += year ? "&year=" + year : "";
    const response = await fetch(url);
    const data = await response.json();
    const question = data[0];

    questionContainer.innerHTML = "";
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
