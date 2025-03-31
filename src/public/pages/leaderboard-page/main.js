import { renderHeader } from "./views/header.js";
import { renderLeaderboard } from "./views/leaderboard.js";
import { renderFooter } from "./views/footer.js";

function initApp() {
    const app = document.getElementById("app");

    app.appendChild(renderHeader());
    app.appendChild(renderLeaderboard());
    app.appendChild(renderFooter());
}

document.addEventListener("DOMContentLoaded", initApp);