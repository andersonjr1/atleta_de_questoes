import elementLogin from "./login/login.js";
import elementRegister from "./register/register.js";
import HomePage from "./home/home.js";

const app = document.getElementById("app");

const stylePaths = {
  home: '/pages/not-authorized-user/home/home.css',
  auth: '/pages/not-authorized-user/not-auth.css'
};

const routes = {
  "/": {
    component: HomePage(),
    style: stylePaths.home
  },
  "/login": {
    component: elementLogin,
    style: stylePaths.auth
  },
  "/registro": {
    component: elementRegister,
    style: stylePaths.auth
  }
};

function loadPageStyles(href) {
  const existing = document.querySelector('link[data-spa-css]');
  if (existing) existing.remove();
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.setAttribute('data-spa-css', 'true');
  document.head.appendChild(link);
}

export function navegateTo(url) {
  history.pushState({}, "", url);
  renderPage(url);
}

function renderPage(url) {
  const route = routes[url] || routes['/'];
  
  // Carrega CSS
  loadPageStyles(route.style);
  
  // Renderiza conteúdo
  app.innerHTML = '';
  app.appendChild(route.component);
  
  // Atualiza classe do body
  document.body.className = route.className;
}

window.addEventListener('popstate', () => renderRoute(window.location.pathname));
document.addEventListener('click', (e) => {
  if (e.target.tagName === 'A' && e.target.href.startsWith(window.location.origin)) {
    e.preventDefault();
    navegateTo(new URL(e.target.href).pathname);
  }
});

// Inicialização
renderPage(window.location.pathname);


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