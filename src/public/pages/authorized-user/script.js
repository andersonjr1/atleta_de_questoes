import elementWelcome from "./welcome/welcome.js";
import elementUser from "./user-profile/user.js";

const app = document.getElementById("app");
const link = document.createElement("link");
document.head.appendChild(link);
//const pathname = window.location.pathname;

const routes = {
  "/inicio" : {
    component: elementWelcome,
    style: "/pages/authorized-user/welcome/welcome.css"
  },
  "/user" : {
    component: elementUser,
    style: "/pages/authorized-user/user-profile/user.css"
  }
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

// if (pathname == "/inicio" || pathname == "/inicio/") {
//   app.appendChild(elementWelcome);
//   link.rel = "stylesheet";
//   link.href = "/pages/authorized-user/welcome/welcome.css";
// }
