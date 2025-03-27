import elementLogin from "./login/login.js";
import elementRegister from "./register/register.js";
import elementHome from "./home/home.js";

const app = document.getElementById("app");
const link = document.createElement("link");
link.rel = "stylesheet";
document.head.appendChild(link);
const pathname = window.location.pathname;

if (pathname == "/login" || pathname == "/login/") {
  link.href = "/pages/not-authorized-user/login/login.css";
  app.appendChild(elementLogin);
} else if (pathname == "/registro" || pathname == "/registro/") {
  link.href = "/pages/not-authorized-user/register/register.css";
  app.appendChild(elementRegister);
} else if (pathname == "/" || pathname == "") {
  link.href = "/pages/not-authorized-user/home/home.css";
  app.appendChild(elementHome);
}
