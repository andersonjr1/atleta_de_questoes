import { renderHeader } from "./views/header.js";
import { renderFooter } from "./views/footer.js";
import { renderHistoryPage } from "./views/historyPage.js";
import messageCreate from "../../components/message.js";

async function fetchUserAnswers() {
    try {
        const response = await fetch('/api/answers');
        if (!response.ok) {
            throw new Error('Erro ao carregar histórico');   
        }
        return await response.json();
    } catch(error) {
        document.body.appendChild(messageCreate(false, error.message));
        return [];
    }
}

async function initApp() {
    const app = document.getElementById("app");

    app.appendChild(renderHeader());

    const loading = document.createElement('div');
    loading.textContent = 'Carregando histórico...';
    app.appendChild(loading);

    try {
        const answers = await fetchUserAnswers();
        app.removeChild(loading);
        app.appendChild(renderHistoryPage(answers.results || answers));
    } catch(error) {
        app.removeChild(loading);
        document.body.appendChild(messageCreate(false, 'Erro ao carregar histórico'));
    }

    app.appendChild(renderFooter());
}

document.addEventListener("DOMContentLoaded", initApp);