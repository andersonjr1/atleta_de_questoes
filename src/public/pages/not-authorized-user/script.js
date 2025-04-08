import { checkAuth } from "../auth.js";
import LoginPage from "./login/login.js";
import RegisterPage from "./register/register.js";
import HomePage from "./home/home.js";
import welcomePage from "../authorized-user/welcome/welcome.js";
import ProfilePage from "../authorized-user/user-profile/user.js";
import RandomQuestionPage from "../authorized-user/random-question/random-question.js";
import LeaderboardPage from "../authorized-user/leaderboard-page/leaderboard-page.js";
import ExamPage from "../authorized-user/exam/exam.js";
import SearchPage from "../authorized-user/search/search.js";
import HistoryPage from "../authorized-user/exam-history/exam-history.js";
import PerformancePage from "../authorized-user/performance/performance.js";

const app = document.getElementById("app");

const stylePaths = {
  home: "/pages/not-authorized-user/home/home.css",
  auth: "/pages/not-authorized-user/not-auth.css",
  ranking: "/pages/authorized-user/leaderboard-page/leaderboard-page.css",
  randomQuestion: "/pages/authorized-user/random-question/random-question.css",
  welcome: "/pages/authorized-user/welcome/welcome.css",
  search: "/pages/authorized-user/search/search.css",
  profile: "/pages/authorized-user/user-profile/user.css",
  exam: "/pages/authorized-user/exam/exam.css",
  performance: "/pages/authorized-user/performance/performance.css",
};

const routes = {
  "/": {
    component: () => HomePage(),
    style: stylePaths.home,
    public: true,
  },
  "/login": {
    component: () => LoginPage(),
    style: stylePaths.auth,
    public: true,
  },
  "/registro": {
    component: () => RegisterPage(),
    style: stylePaths.auth,
    public: true,
  },
  "/welcome": {
    component: () => welcomePage(),
    style: stylePaths.welcome,
    requiresAuth: true,
  },
  "/profile": {
    component: () => ProfilePage(),
    style: stylePaths.profile,
    requiresAuth: true,
  },
  "/leaderboard": {
    component: () => LeaderboardPage(),
    style: stylePaths.ranking,
    requiresAuth: true,
  },
  "/exam-history": {
    component: () => HistoryPage(),
    style: stylePaths.exam,
    requiresAuth: true,
  },
  "/random-question": {
    component: () => RandomQuestionPage(),
    style: stylePaths.randomQuestion,
    requiresAuth: true,
  },
  "/search": {
    component: () => SearchPage(),
    style: stylePaths.search,
    requiresAuth: true,
  },
  "/exam": {
    component: () => ExamPage(),
    style: stylePaths.exam,
    requiresAuth: true,
  },
  "/performance": {
    component: () => PerformancePage(),
    style: stylePaths.performance,
    requiresAuth: true
  }
};

function loadPageStyles(href) {
  const existing = document.querySelector("link[data-spa-css]");
  if (existing) existing.remove();

  if (href) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.setAttribute("data-spa-css", "true");
    document.head.appendChild(link);
  }
}

export async function navegateTo(url) {
  const route = routes[url] || routes["/"];

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

  // Renderiza a página após passar das verificações
  history.pushState({}, "", url);
  await renderPage(url);
}

let currentPage = null;

async function renderPage(url) {
  // Evita renderização duplicada para a mesma URL "Estava dando esse problema também na página de perfil"
  if (currentPage === url) return;
  currentPage = url;

  const route = routes[url] || routes["/"];
  loadPageStyles(route.style);

  const app = document.getElementById("app");
  if (!app) return;

  try {
    app.innerHTML = "";

    const component = await route.component();

    if (component instanceof Node) {
      app.appendChild(component);
    } else {
      console.error("Componente inválido para a rota:", url);
      throw new Error("Componente inválido");
    }

    document.body.className = `route-${url.replace(/\//g, "")}`;
  } catch (error) {
    console.error("Erro ao renderizar página:", error);
    currentPage = null;
    await navegateTo("/error");
  }
}

window.addEventListener("popstate", async () => {
  await renderPage(window.location.pathname);
});

document.addEventListener("click", async (e) => {
  if (
    e.target.tagName === "A" &&
    e.target.href.startsWith(window.location.origin)
  ) {
    e.preventDefault();
    await navegateTo(new URL(e.target.href).pathname);
  }
});

(async () => {
  const path = window.location.pathname;

  try {
    await navegateTo(path);
  } catch (error) {
    console.error("Erro na inicialização:", error);
    await renderPage("/");
  }
})();
