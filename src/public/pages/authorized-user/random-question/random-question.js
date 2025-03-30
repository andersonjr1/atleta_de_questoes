import Header from "/components/headerWithMenu.js";
import Message from "/components/message.js";
import RandomQuestion from "/components/questionRandom.js";
import RandomQuestionResponse from "/components/questionRandomResult.js";

const element = document.createElement("div");

element.appendChild(Header());

const container = document.createElement("div");

container.innerHTML = `
<h1>Questão aleatoria</h1>
<div id="filters">
    <label class="label">Vestibular
        <select id="vestibular" class="filter">
            <option>Todos</option>
        </select>
    </label>
    <label class="label">Ano
        <select id="year" class="filter">
            <option>Todos</option>
        </select>
    </label>
    <label class="label">Disciplina
        <select id="discipline" class="filter">
            <option>Todos</option>
        </select>
    </label>
    <label class="label">Nível
        <select id="level" class="filter">
            <option>Todos</option>
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
  question_files: [
    "http://localhost:3500/images/e0412a77-9619-452b-b62e-ba775414bd2c.png",
  ],
};

const questionResult = {
  id: "teste",
  question_index: 24,
  year: 2009,
  discipline: "ciencias-humanas",
  vestibular: "ENEM",
  level: 3,
  context:
    "Umidade relativa do ar é o termo usado para descrever a quantidade de vapor de água contido na atmosfera. Ela é definida pela razão entre o conteúdo real de umidade de uma parcela de ar e a quantidade de umidade que a mesma parcela de ar pode armazenar na mesma temperatura e pressão quando está saturada de vapor, isto é, com 100% de umidade relativa. O gráfico representa a relação entre a umidade relativa do ar e sua temperatura ao longo de um período de 24 horas em um determinado local.",
  alternative_introduction:
    "Considerando-se as informações do texto e do gráfico, conclui-se que",
  alternatives: [
    {
      letter: "A",
      text: "A insolação é um fator que provoca variação da umidade relativa do ar.",
      file: null,
      selected: true,
      is_correct: true,
    },
    {
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

generate.addEventListener("click", () => {
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
    const responseInformation = {
      id_question: question.id,
      id_alternative: selectedValue,
    };
    questionContainer.append(RandomQuestionResponse(questionResult));
  });
  questionContainer.appendChild(buttonRespond);
});

container.appendChild(questionContainer);

export default element;
