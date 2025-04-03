import elementWelcome from "./welcome/welcome.js";
import element_Question_add from './questions_add/questions_add.js';
import ExamPage from "./exam/exam.js";
import RandomQuestionPage from "./random-question/random-question.js";
import elementsearch from "./search/search.js";
import leaderboardPage from "./leaderboard-page/leaderboard-page.js"

const app = document.getElementById("app");
const link = document.createElement("link");
link.rel = "stylesheet";
document.head.appendChild(link);

const pathname = window.location.pathname;

if (pathname === "/inicio" || pathname === "/inicio/") {
  link.href = "/pages/authorized-user/welcome/welcome.css";
  app.appendChild(elementWelcome);
} 
else if (pathname === "/simulado" || pathname === "/simulado/") {
  link.href = "/pages/authorized-user/exam/exam.css";
  app.appendChild(ExamPage());
} 
else if (pathname === "/aleatoria" || pathname === "/aleatoria/") {
  link.href = "/pages/authorized-user/random-question/random-question.css";
  app.appendChild(RandomQuestionPage());
} 
else if (pathname === "/buscar" || pathname === "/buscar/") {
  link.href = "/pages/authorized-user/search/search.css";
  app.appendChild(elementsearch);
} 
else if (pathname === "/tool-add" || pathname === "/tool-add/") {
  link.href = "/pages/authorized-user/questions_add/questions_add.css";
  app.appendChild(element_Question_add);
}
else if (pathname === "/ranking" || pathname === "/ranking/") {
  link.href = "/pages/authorized-user/leaderboard-page/leaderboard-page.css";
  app.appendChild(leaderboardPage());
}