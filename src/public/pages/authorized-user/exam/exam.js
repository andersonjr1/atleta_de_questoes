import Header from "/components/headerWithMenu.js";
import HeaderWithoutMenu from "/components/headerWithoutMenu.js";
import QuestionElement from "/components/questionExam.js";
import QuestionElementResult from "/components/questionExamResult.js";
import ConfirmationModal from "/components/confirmationModal.js";
import Timer from "/components/timer.js";
function ExamPage() {
  const element = document.createElement("div");

  element.style.height = "100vh";
  element.style.display = "flex";
  element.style.flexDirection = "column";
  element.style.alignItems = "center";
  const nowDate = new Date();

  const simulado = {
    id: "null",
    startTime: new Date(nowDate),
    endTime: new Date(nowDate.setMinutes(nowDate.getMinutes() + 35)),
  };

  function renderInitialPage() {
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

    startButton.addEventListener("click", renderQuestionsPage);
  }

  function renderQuestionsPage() {
    const questions = [
      {
        id: "question_id",
        question_index: 24,
        year: 2009,
        discipline: "ciencias-humanas",
        context:
          "Umidade relativa do ar é o termo usado para descrever a quantidade de vapor de água contido na atmosfera. Ela é definida pela razão entre o conteúdo real de umidade de uma parcela de ar e a quantidade de umidade que a mesma parcela de ar pode armazenar na mesma temperatura e pressão quando está saturada de vapor, isto é, com 100% de umidade relativa. O gráfico representa a relação entre a umidade relativa do ar e sua temperatura ao longo de um período de 24 horas em um determinado local.)",
        alternative_introduction:
          "Considerando-se as informações do texto e do gráfico, conclui-se que",
        alternatives: [
          {
            id: "a_id",
            letter: "A",
            text: "A insolação é um fator que provoca variação da umidade relativa do ar.",
            file: null,
            selected: false,
          },
          {
            id: "b_id",
            letter: "B",
            text: "O ar vai adquirindo maior quantidade de vapor de água à medida que se aquece.",
            file: null,
            selected: false,
          },
          {
            id: "c_id",
            letter: "C",
            text: "A presença de umidade relativa do ar é diretamente proporcional à temperatura do ar.",
            file: null,
            selected: false,
          },
          {
            id: "d_id",
            letter: "D",
            text: "A umidade relativa do ar indica, em termos absolutos, a quantidade de vapor de água existente na atmosfera.",
            file: null,
            selected: false,
          },
          {
            id: "e_id",
            letter: "E",
            text: "A variação da umidade do ar se verifica no verão, e não no inverno, quando as temperaturas permanecem baixas.",
            file: null,
            selected: false,
          },
        ],
        question_files: [
          "http://localhost:3500/images/e0412a77-9619-452b-b62e-ba775414bd2c.png",
        ],
      },
      {
        question_index: 36,
        year: 2009,
        discipline: "ciencias-natureza",
        context:
          "O uso de protetores solares em situações de grande exposição aos raios solares como, por exemplo, nas praias, é de grande importância para a saúde. As moléculas ativas de um protetor apresentam, usualmente, anéis aromáticos conjugados com grupos carbonila, pois esses sistemas são capazes de absorver a radiação ultravioleta mais nociva aos seres humanos. A conjugação é definida como a ocorrência de alternância entre ligações simples e duplas em uma molécula. Outra propriedade das moléculas em questão é apresentar, em uma de suas extremidades, uma parte apolar responsável por reduzir a solubilidade do composto em água, o que impede sua rápida remoção quando do contato com a água.",
        alternative_introduction:
          "De acordo com as considerações do texto, qual das moléculas apresentadas a seguir é a mais adequada para funcionar como molécula ativa de protetores solares?",
        alternatives: [
          {
            letter: "A",
            text: null,
            file: "http://localhost:3500/images/84d8e1ad-77ee-401b-aa7a-e9e86e592db8.png",
            selected: false,
          },
          {
            letter: "B",
            text: null,
            file: "http://localhost:3500/images/b9216797-a906-4a16-9a53-4e596e058dc4.png",
            selected: false,
          },
          {
            letter: "C",
            text: null,
            file: "http://localhost:3500/images/c0fcc9f3-6669-45df-9a57-4b1edebbdb26.png",
            selected: false,
          },
          {
            letter: "D",
            text: null,
            file: "http://localhost:3500/images/5703fd8b-f3c7-4847-be3c-9de8e23c2952.png",
            selected: false,
          },
          {
            letter: "E",
            text: null,
            file: "http://localhost:3500/images/d2719ed6-d529-48c9-8e1f-6d7d5ddb4b22.png",
            selected: false,
          },
        ],
        question_files: [],
      },
    ];

    element.innerHTML = ``;

    element.appendChild(HeaderWithoutMenu());

    const containerExam = document.createElement("div");
    containerExam.id = "containerExam";
    element.appendChild(containerExam);

    const timer = Timer(
      Date.now(),
      simulado.endTime.getTime(),
      renderResultPage
    );
    containerExam.appendChild(timer);

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
        QuestionElement(question, index, (alternativeId, questionId) => {
          console.log(alternativeId, questionId);
        })
      );
    });

    sendButton.addEventListener("click", () => {
      const allAnsered = questions.every((question) => {
        return question.alternatives.some(
          (alternative) => alternative.selected
        );
      });

      if (!allAnsered) {
        const modalContainer = ConfirmationModal(
          "Mandar respostas incompletas?",
          () => {
            renderResultPage();
          }
        );
        element.appendChild(modalContainer);
        return;
      }
      renderResultPage();
    });
  }

  function renderResultPage() {
    const questions = [
      {
        question_index: 24,
        year: 2009,
        discipline: "ciencias-humanas",
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
      },
      {
        question_index: 36,
        year: 2009,
        discipline: "ciencias-natureza",
        context:
          "O uso de protetores solares em situações de grande exposição aos raios solares como, por exemplo, nas praias, é de grande importância para a saúde. As moléculas ativas de um protetor apresentam, usualmente, anéis aromáticos conjugados com grupos carbonila, pois esses sistemas são capazes de absorver a radiação ultravioleta mais nociva aos seres humanos. A conjugação é definida como a ocorrência de alternância entre ligações simples e duplas em uma molécula. Outra propriedade das moléculas em questão é apresentar, em uma de suas extremidades, uma parte apolar responsável por reduzir a solubilidade do composto em água, o que impede sua rápida remoção quando do contato com a água.",
        alternative_introduction:
          "De acordo com as considerações do texto, qual das moléculas apresentadas a seguir é a mais adequada para funcionar como molécula ativa de protetores solares?",
        alternatives: [
          {
            letter: "A",
            text: null,
            file: "http://localhost:3500/images/84d8e1ad-77ee-401b-aa7a-e9e86e592db8.png",
            selected: false,
            is_correct: false,
          },
          {
            letter: "B",
            text: null,
            file: "http://localhost:3500/images/b9216797-a906-4a16-9a53-4e596e058dc4.png",
            selected: true,
            is_correct: false,
          },
          {
            letter: "C",
            text: null,
            file: "http://localhost:3500/images/c0fcc9f3-6669-45df-9a57-4b1edebbdb26.png",
            selected: false,
            is_correct: false,
          },
          {
            letter: "D",
            text: null,
            file: "http://localhost:3500/images/5703fd8b-f3c7-4847-be3c-9de8e23c2952.png",
            selected: false,
            is_correct: false,
          },
          {
            letter: "E",
            text: null,
            file: "http://localhost:3500/images/d2719ed6-d529-48c9-8e1f-6d7d5ddb4b22.png",
            selected: false,
            is_correct: true,
          },
        ],
        question_files: [],
        explanation:
          "A alternativa E está correta porque a molécula deve ter: (1) anéis aromáticos conjugados com carbonila (para absorver UV) e (2) uma extremidade apolar (para resistir à água). A estrutura E (não visualizada) atende a esses critérios, conforme descrito no texto.",
        support_urls: ["https://www.youtube.com/watch?v=Xav6P3gSYdo"],
      },
    ];
    element.innerHTML = "";
    element.appendChild(Header());

    const containerResults = document.createElement("div");
    containerResults.id = "containerResults";
    element.appendChild(containerResults);

    questions.forEach((question, index) => {
      containerResults.appendChild(QuestionElementResult(question, index));
    });
  }

  renderInitialPage();
  return element;
}

export default ExamPage;
