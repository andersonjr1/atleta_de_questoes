import { getLoggedUserId } from "../../../utils/authUtils.js";

export function renderLeaderboard(data = []) {
    const leaderboardContainer = document.createElement("main");
    leaderboardContainer.className = "leaderboard-container";

    const title = document.createElement("h1");
    title.className = "leaderboard-title";
    title.textContent = "Ranking de Usuários";
    leaderboardContainer.appendChild(title);

    const tableDiv = document.createElement("div");
    tableDiv.className = "leaderboard-table";

    const table = document.createElement("table");

    const thead = document.createElement("thead");
    const headerRow = document.createElement("tr");

    ["Posição", "Usuário", "Pontuação"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    const currentUserId = getLoggedUserId();

    data.forEach((user, index) => {
        const row = document.createElement("tr");

        if(user.id === currentUserId) {
            row.className = "current-user";
        } else {
            row.className = index % 2 === 0? "row-1" : "row-2";
        }

        [user.rank, user.name, user.score].forEach(text => {
            const td = document.createElement("td");
            td.textContent = text;
            row.appendChild(td);
        })

        tbody.appendChild(row);
    });

    if (data.length === 0) {
        const row = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 3;
        td.textContent = "Nenhum dado disponível";
        td.className = "empty-message";
        row.appendChild(td);
        tbody.appendChild(row);
    }
    
    table.appendChild(tbody);
    tableDiv.appendChild(table);
    leaderboardContainer.appendChild(tableDiv);

    return leaderboardContainer;
}