import { renderHeader } from "./views/header.js";
import { renderLeaderboard } from "./views/leaderboard.js";
import { renderFooter } from "./views/footer.js";
import messageCreate from "../../components/message.js";
import { getLoggedUserId } from "../../utils/authUtils.js";

async function fetchLeaderboard() {
    try {
        const response = await fetch('/api/answers/leaderboard');

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Falha ao buscar ranking:", error);
        document.body.appendChild(
            messageCreate(false, "Falha ao corregar o ranking")
        );
        return[];
    }
}

async function initApp() {
    const app = document.getElementById("app");

    app.appendChild(renderHeader());
   
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading-state";
    loadingDiv.innerHTML = `
        <div class="spinner"><div>
        <p>Carregando ranking...<p>
    `;
    app.appendChild(loadingDiv);

    try {
        const leaderboardData = await fetchLeaderboard();

        app.remove(loadingDiv);
        app.appendChild(renderLeaderboard(leaderboardData));
    } catch (error) {
        app.removeChild(loadingDiv);
        app.appendChild(renderLeaderboard());
    } 

    app.appendChild(renderFooter());
}

document.addEventListener("DOMContentLoaded", initApp);