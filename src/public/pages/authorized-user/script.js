import elementWelcome from "./welcome/welcome.js";
import element_Question_add from './questions_add/questions_add.js'

const app = document.getElementById("app");
const link = document.createElement("link");
document.head.appendChild(link);
const pathname = window.location.pathname;

if (pathname == "/inicio" || pathname == "/inicio/") {
  app.appendChild(elementWelcome);
  link.rel = "stylesheet";
  link.href = "/pages/authorized-user/welcome/welcome.css";
}

if (pathname == "/admin" || pathname == "/admin/") {
  app.appendChild(element_Question_add);
  link.rel = "stylesheet";
  link.href = "/pages/authorized-user/questions_add/questions_add.css";
}