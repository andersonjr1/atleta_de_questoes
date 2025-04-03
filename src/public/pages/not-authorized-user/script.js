import { checkAuth } from "../auth.js";
import elementLogin from "./login/login.js";
import elementRegister from "./register/register.js";
import HomePage from "./home/home.js";
import welcomePage from "../authorized-user/welcome/welcome.js";
import profilePage from "../authorized-user/user-profile/user.js";

const app = document.getElementById("app");

const stylePaths = {
  home: '/pages/not-authorized-user/home/home.css',
  auth: '/pages/not-authorized-user/not-auth.css',
  welcome: '/pages/authorized-user/welcome/welcome.css',
  profile: '/pages/authorized-user/user-profile/user.css'
};

// CORREÇÃO: Defina os componentes como funções
const routes = {
  "/": {
    component: () => HomePage(),  // Agora é uma função
    style: stylePaths.home,
    public: true
  },
  "/login": {
    component: () => elementLogin,  // Agora é uma função
    style: stylePaths.auth,
    public: true
  },
  "/registro": {
    component: () => elementRegister,  // Agora é uma função
    style: stylePaths.auth,
    public: true
  },
  "/welcome": {
    component: () => welcomePage(),  // Agora é uma função
    style: stylePaths.welcome,
    requiresAuth: true
  },
  "/profile": {
    component: () => profilePage(),  // Agora é uma função
    style: stylePaths.profile,
    requiresAuth: true
  },
  "/questions": {
      component: () => questionsPage(),
      requiresAuth: true
  },
  "/search": {
      component: () => searchPage(),
      requiresAuth: true
  },
};

function loadPageStyles(href) {
  const existing = document.querySelector('link[data-spa-css]');
  if (existing) existing.remove();
  
  if (href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.setAttribute('data-spa-css', 'true');
    document.head.appendChild(link);
  }
}

export async function navegateTo(url) {
  const route = routes[url] || routes['/'];
  
  // Verificação de autenticação
  const isAuthenticated = await checkAuth();
  
  // Redireciona usuários autenticados que tentam acessar páginas só para convidados
  if (route.public && isAuthenticated) {
    history.pushState({}, "", "/welcome");
    await renderPage("/welcome");
    return;
  }
  
  // Redireciona usuários não autenticados que tentam acessar páginas protegidas
  if (route.requiresAuth && !isAuthenticated) {
    history.pushState({}, "", `/login?redirect=${encodeURIComponent(url)}`);
    await renderPage("/login");
    return;
  }

  // Se todas as verificações passarem, renderiza a página
  history.pushState({}, "", url);
  await renderPage(url);
}

async function renderPage(url) {
  const route = routes[url] || routes['/'];
  
  await loadPageStyles(route.style);
  
  app.innerHTML = '';
  const component = await route.component(); // Note o await aqui
  
  if (component instanceof Node) {
    app.appendChild(component);
  } else {
    console.error("Componente inválido para a rota:", url);
    await navegateTo('/');
  }
  
  document.body.className = `route-${url.replace(/\//g, '')}`;
}

// Event listeners
window.addEventListener('popstate', async () => {
  await renderPage(window.location.pathname);
});

document.addEventListener('click', async (e) => {
  if (e.target.tagName === 'A' && e.target.href.startsWith(window.location.origin)) {
    e.preventDefault();
    await navegateTo(new URL(e.target.href).pathname);
  }
});

// Inicialização corrigida
(async () => {
  const path = window.location.pathname;
  
  try {
    await navegateTo(path);
  } catch (error) {
    console.error("Erro na inicialização:", error);
    await renderPage('/'); // Fallback para página inicial
  }
})();

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