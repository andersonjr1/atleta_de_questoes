import elementWelcome from "./welcome/welcome.js";
import elementExam from "./exam/exam.js";

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
  app.appendChild(elementExam);
}
