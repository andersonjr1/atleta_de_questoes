import elementWelcome from "./welcome/welcome.js";

const app = document.getElementById("app");
const link = document.createElement("link");
document.head.appendChild(link);
const pathname = window.location.pathname;

switch (pathname) {
  case "/inicio":
    app.appendChild(elementWelcome);
    link.rel = "stylesheet";
    link.href = "pages/authorized-user/welcome/welcome.css";
    break;
}
