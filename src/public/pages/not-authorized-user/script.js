import elementLogin from "./login/login.js";
import elementRegister from "./register/register.js";

const app = document.getElementById("app");
const link = document.createElement("link");
document.head.appendChild(link);
const pathname = window.location.pathname;

switch (pathname) {
  case "/login":
    app.appendChild(elementLogin);
    link.rel = "stylesheet";
    link.href = "pages/not-authorized-user/login/login.css";
    break;
  case "/registro":
    app.appendChild(elementRegister);
    link.rel = "stylesheet";
    link.href = "pages/not-authorized-user/register/register.css";
    break;
}
