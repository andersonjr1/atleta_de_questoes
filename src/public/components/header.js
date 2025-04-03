import { navegateTo } from "../pages/not-authorized-user/script.js";

export function renderHeader() {
  const header = document.createElement("header");
  header.className = "header";

  const nav = document.createElement("nav");
  nav.className = "nav-links";

  const links = [
    // { href: "/questions", text: "Questões" },
    { href: "/search", text: "Buscar" },
    { href: "/random-question", text: "Questão Aleatória" },
    { href: "/exam", text: "Simulado" },
    { href: "/exam-history", text: "Histórico" },
    { href: "/leaderboard", text: "Ranking" },
    // { href: "/performance", text: "Desempenho" },
    { href: "/profile", text: "Perfil" },
  ];

  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.text;
    a.addEventListener("click", async (e) => {
      e.preventDefault();
      await navegateTo(link.href);
    });
    nav.appendChild(a);
  });

  const logoutLink = document.createElement("a");
  logoutLink.href = "#";
  logoutLink.className = "logout-link";
  logoutLink.addEventListener("click", async (e) => {
    e.preventDefault();
    await handleLogout();
  });

  const logoutImg = document.createElement("img");
  logoutImg.src = "/atleta_de_questoes/src/public/images/site/logout.png";
  logoutImg.alt = "Logout";
  logoutImg.className = "logout-icon";

  logoutLink.appendChild(logoutImg);

  header.appendChild(nav);
  header.appendChild(logoutLink);

  return header;
}

async function handleLogout() {
  try {
    await fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("authData");
    navegateTo("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
}
