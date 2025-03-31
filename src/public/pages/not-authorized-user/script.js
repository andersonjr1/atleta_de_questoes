import elementLogin from "./login/login.js";
import elementRegister from "./register/register.js";

const app = document.getElementById("app");
const link = document.createElement("link");
document.head.appendChild(link);

const routes = {
  "/login" : {
    component: elementLogin,
    style: "/pages/not-authorized-user/login/login.css"
  },
  "/registro" : {
    component: elementRegister,
    style: "/pages/not-authorized-user/register/register.css"
  }
}

export function navegateTo(url) {
  history.pushState({}, "", url);
  renderPage();
}

function renderPage() {
  const pathname = window.location.pathname;
  const route = routes[pathname];

  if (route) {
    // Limpa o conteúdo anterior
    app.innerHTML = "";

    // Adiciona o componente da nova página
    app.appendChild(route.component);

    // Troca o CSS se necessário
    if (link.href !== route.style) {
      link.rel = "stylesheet";
      link.href = route.style;
    }
  } else {
    app.innerHTML = "404 - Page not found";
  }
}

window.onpopstate = renderPage;

renderPage();

// const pathname = window.location.pathname;

// if (pathname == "/login" || pathname == "/login/") {
//   app.appendChild(elementLogin);
//   link.rel = "stylesheet";
//   link.href = "/pages/not-authorized-user/login/login.css";
// } else if (pathname == "/registro" || pathname == "/registro/") {
//   app.appendChild(elementRegister);
//   link.rel = "stylesheet";
//   link.href = "/pages/not-authorized-user/register/register.css";
// }