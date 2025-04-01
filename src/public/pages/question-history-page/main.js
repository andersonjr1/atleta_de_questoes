import { renderHeader } from "./views/header.js";
import { renderFooter } from "./views/footer.js";
import { renderHistoryPage } from "./views/historyPage.js";

function initApp() {
    const app = document.getElementById("app");

    app.appendChild(renderHeader());
    app.appendChild(renderHistoryPage());
    app.appendChild(renderFooter());
}

document.addEventListener("DOMContentLoaded", initApp);