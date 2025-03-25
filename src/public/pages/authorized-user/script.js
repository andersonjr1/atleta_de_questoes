import elementWelcome from "./welcome/welcome.js";
import elementExam from "./exam/exam.js";

const app = document.getElementById("app");
const link = document.createElement("link");
document.head.appendChild(link);
const pathname = window.location.pathname;

if (pathname == "/inicio" || pathname == "/inicio/") {
  app.appendChild(elementWelcome);
  link.rel = "stylesheet";
  link.href = "/pages/authorized-user/welcome/welcome.css";
} else if (pathname == "/simulado" || pathname == "/simulado/") {
  link.href = "/pages/authorized-user/exam/exam.css";
  link.rel = "stylesheet";
  app.appendChild(elementExam);
}
