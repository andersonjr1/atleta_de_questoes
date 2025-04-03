import { navegateTo } from "../pages/not-authorized-user/script.js";

function Header() {
  const element = document.createElement("div");

  element.style.width = "100vw";
  element.style.display = "flex";
  element.style.alignItems = "center";
  element.style.height = "50px";
  element.style.backgroundColor = "#0B2072";
  element.style.color = "white";
  element.style.position = "relative";
  element.style.padding = "5px";
  element.style.paddingLeft = "20px";
  element.style.boxSizing = "border-box";

  const links = [
    // { href: "/questions", text: "Questões" },
    // { href: "/performance", text: "Desempenho" },
    { href: "/search", text: "Buscar" },
    { href: "/random-question", text: "Questão Aleatória" },
    { href: "/exam", text: "Simulado" },
    { href: "/exam-history", text: "Histórico" },
    { href: "/leaderboard", text: "Ranking" },
    { href: "/profile", text: "Perfil" },
  ];

  const title = document.createElement("div");

  title.innerHTML = `
  <svg width="32" height="43" viewBox="0 0 32 43" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M29.988 17.0656C29.9544 17.0656 29.9208 17.0824 29.8704 17.0824C29.8536 17.0824 29.8368 17.0656 29.82 17.0656L24.697 17.8383L21.7911 11.4219C21.4048 10.6324 20.9177 9.99415 20.3298 9.49024C20.0778 9.23829 19.7923 9.01993 19.4732 8.85196C19.154 8.66719 18.8013 8.54961 18.4485 8.48243C17.5079 8.26407 16.6513 8.39844 15.8618 8.85196L9.44542 11.8586C9.0087 12.1441 8.60557 12.2449 8.48799 12.3289C7.83292 12.7824 7.71534 13.0344 7.64815 13.1688L4.42315 19.3668C4.38955 19.4172 4.37276 19.4844 4.35597 19.5516C4.23839 19.7867 4.1712 20.0555 4.1712 20.3242C4.1712 20.6098 4.25518 20.8953 4.37276 21.1305C4.54073 21.5336 4.80948 21.7856 5.17901 21.9031C5.39737 22.0039 5.64932 22.0711 5.91807 22.0711C6.60675 22.0711 7.21144 21.668 7.49698 21.0801C7.51378 21.0465 7.54737 21.0129 7.56417 20.9793C9.57979 17.2 10.5876 15.302 10.5876 15.2684L14.0142 14.4621L9.89894 31.7797L2.038 31.7293C2.0212 31.7293 2.00439 31.7293 2.00439 31.7461C1.9876 31.7461 1.97081 31.7461 1.95402 31.7461C0.91261 31.7461 0.0727539 32.5859 0.0727539 33.6273C0.0727539 34.5848 0.795028 35.3742 1.71886 35.475V35.4918H3.91924C5.61573 35.5758 10.638 35.7941 12.1665 35.6262C12.2169 35.6262 12.2673 35.643 12.3177 35.643C13.1743 35.643 13.8798 35.0383 14.031 34.232L15.2067 30.7719C15.9962 28.5043 16.5337 26.3039 16.5337 26.3039C18.5829 28.4539 20.1114 29.8648 21.5224 31.343L23.9243 39.2375L24.4282 41.1356H24.445C24.7138 41.9586 25.4864 42.5801 26.3935 42.5801C27.5357 42.5801 28.4595 41.6562 28.4595 40.5141C28.4595 40.3461 28.4427 40.1949 28.3923 40.0438L28.2411 39.4559C28.2411 39.4391 28.2411 39.4391 28.2411 39.4223L27.8044 37.7762L27.3677 36.1469L25.604 29.5793C25.3521 28.9746 25.1505 28.3699 24.6298 27.7988C24.6298 27.7988 19.7083 22.3399 19.5739 22.2559L20.6993 16.9648L22.2614 20.2738C22.2782 20.3074 22.295 20.3242 22.3286 20.3578C22.4294 20.509 22.5302 20.6434 22.6142 20.7441C22.9165 21.0465 23.3196 21.2313 23.7732 21.2313C23.7899 21.2313 23.8067 21.2313 23.8067 21.2313C23.9411 21.2313 24.0755 21.2145 24.2099 21.1809L29.9544 20.5594C29.9712 20.5594 29.988 20.5594 30.0048 20.5594C30.156 20.5594 30.2903 20.5426 30.4247 20.509L30.5087 20.4922C30.5255 20.4922 30.5423 20.4754 30.5591 20.4586C31.231 20.2235 31.7349 19.5852 31.7349 18.8293C31.7013 17.8383 30.9286 17.0656 29.988 17.0656Z" fill="white"/>
  <path d="M19.1372 7.37383C20.1114 7.37383 20.9344 7.03789 21.6231 6.34922C22.3118 5.66054 22.6477 4.8543 22.6477 3.93047C22.6477 2.95625 22.3118 2.1332 21.6231 1.44453C20.9344 0.755855 20.1114 0.419922 19.1372 0.419922C18.1965 0.419922 17.3903 0.755855 16.7016 1.44453C16.0129 2.1332 15.677 2.95625 15.677 3.93047C15.677 4.8711 16.0129 5.67734 16.7016 6.34922C17.4071 7.03789 18.2133 7.37383 19.1372 7.37383Z" fill="white"/>
  </svg>
  <span>Questões</span>
`;

  title.style.display = "flex";
  title.style.alignItems = "center";
  title.style.justifyContent = "center";
  title.style.gap = "10px";
  title.style.fontSize = "1.5rem";
  element.appendChild(title);

  const nav = document.createElement("nav");
  nav.style.display = "flex";
  nav.style.alignItems = "center";
  nav.style.justifyContent = "space-around";
  nav.style.flexGrow = "2";
  nav.style.margin = "45px";
  element.appendChild(nav);

  const search = document.createElement("a");
  search.textContent = "Buscar";
  search.style.color = "white";
  search.style.textDecoration = "none";
  search.href = "/search";

  nav.appendChild(search);

  const random = document.createElement("a");
  random.textContent = "Questão aleatoria";
  random.style.color = "white";
  random.style.textDecoration = "none";
  random.href = "/random-question";

  nav.appendChild(random);

  const exam = document.createElement("a");
  exam.textContent = "Simulado";
  exam.style.color = "white";
  exam.style.textDecoration = "none";
  exam.href = "/exam";

  nav.appendChild(exam);

  const examHistory = document.createElement("a");
  examHistory.textContent = "Historico";
  examHistory.style.color = "white";
  examHistory.style.textDecoration = "none";
  examHistory.href = "/exam-history";

  nav.appendChild(examHistory);

  const ranking = document.createElement("a");
  ranking.textContent = "Ranking";
  ranking.style.color = "white";
  ranking.style.textDecoration = "none";
  ranking.href = "/leaderboard";

  nav.appendChild(ranking);

  const perfil = document.createElement("a");
  perfil.textContent = "Perfil";
  perfil.style.color = "white";
  perfil.style.textDecoration = "none";
  perfil.href = "/profile";

  nav.appendChild(perfil);

  const exit = document.createElement("button");
  exit.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="30px" fill="#fff"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>
`;
  exit.style.position = "absolute";
  exit.style.cursor = "pointer";
  exit.style.background = "none";
  exit.style.display = "flex";
  exit.style.alignItems = "center";
  exit.style.justifyContent = "center";
  exit.style.border = "none";
  exit.style.right = "10px";
  element.appendChild(exit);

  exit.addEventListener("click", async () => {
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
  });

  return element;
}

export default Header;
