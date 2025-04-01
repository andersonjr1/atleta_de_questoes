import elementLogin from "./login/login.js";
import elementRegister from "./register/register.js";

const app = document.getElementById("app");

const loadGlobalStyles = () => {
  const cssPath = '/pages/not-authorized-user/not-auth.css';
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = cssPath;
  
  document.head.appendChild(link);
};

const routes = {
  "/login": {
    component: elementLogin
  },
  "/registro": {
    component: elementRegister
  }
};

export function navegateTo(url) {
  history.pushState({}, "", url);
  renderPage();
}

function renderPage() {
  const pathname = window.location.pathname;
  const route = routes[pathname];

  if (route) {
    app.innerHTML = "";

    app.appendChild(route.component);

    document.body.className = pathname.replace('/', '') + '-page';
  } else {
    app.innerHTML = "404 - Page not found";
  }
}

loadGlobalStyles();
window.onpopstate = renderPage;
window.addEventListener('load', renderPage);


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