export function renderHeader() {
    const header = document.createElement("header");
    header.className = "header";

    const nav = document.createElement("nav");
    nav.className = "nav-links";

    const links = [
        { href: "questions", text: "Questões" },
        { href: "search", text: "Buscar" },
        { href: "random-question", text: "Questão Aleatória" },
        { href: "leaderboard", text: "Ranking" },
        { href: "performance", text: "Desempenho" },
        { href: "profile", text: "Perfil" },
        { href: "question-answers-history", text: "Histórico" }
    ];

    links.forEach(link => {
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.text;
        nav.appendChild(a);
    });

    const logoutLink = document.createElement("a");
    logoutLink.href = "#";
    logoutLink.className = "logout-link";

    const logoutImg = document.createElement("img");
    logoutImg.src = "/src/public/images/site/logout.png";
    logoutImg.alt = "Logout";
    logoutImg.className = "logout-icon";

    logoutLink.appendChild(logoutImg);

    header.appendChild(nav);
    header.appendChild(logoutLink);

    return header;
}