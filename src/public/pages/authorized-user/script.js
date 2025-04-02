import elementWelcome from "./welcome/welcome.js";
import element_Question_add from './questions_add/questions_add.js'
import ExamPage from "./exam/exam.js";
import RandomQuestionPage from "./random-question/random-question.js";

const app = document.getElementById("app");
const link = document.createElement("link");
document.head.appendChild(link);
const pathname = window.location.pathname;
link.rel = "stylesheet";

if (pathname == "/inicio" || pathname == "/inicio/") {
  link.href = "/pages/authorized-user/welcome/welcome.css";
  app.appendChild(elementWelcome);
} else if (pathname == "/simulado" || pathname == "/simulado/") {
  link.href = "/pages/authorized-user/exam/exam.css";
  app.appendChild(ExamPage());
} else if (pathname == "/aleatoria" || pathname == "/aleatoria/") {
  link.href = "/pages/authorized-user/random-question/random-question.css";
  app.appendChild(RandomQuestionPage());
}

if (pathname == "/tool-add" || pathname == "/tool-add/") {
  app.appendChild(element_Question_add);
  link.rel = "stylesheet";
  link.href = "/pages/authorized-user/questions_add/questions_add.css";
}