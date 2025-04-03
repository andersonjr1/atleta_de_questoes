export function renderLeaderboard() {
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

    const mockData = [
        { position: 1, name: 'Ana Silva', score: 9850 },
        { position: 2, name: 'Beto Freitas', score: 9600 },
        { position: 3, name: 'Carlos Costa', score: 9350 },
        { position: 4, name: 'Daniela Tristão', score: 8700 },
        { position: 5, name: 'Emerson Caldeira', score: 7200 },
        { position: 6, name: 'Fernanda Morais', score: 6900 },
        { position: 7, name: 'Geraldo Borges', score: 6550 },
        { position: 8, name: 'Hector Valdez', score: 6300 },
        { position: 9, name: 'Igor Galveas', score: 6000 },
        { position: 10, name: 'Jorge Henrique', score: 4500 },
        { position: 15, name: 'Usuário Logado', score: 3000, isCurrentUser: true }
    ];
    
    mockData.forEach((user, index) => {
        const row = document.createElement("tr");

        if (user.isCurrentUser) {
            row.className = "current-user";
        } else {
            row.className = index % 2 === 0? "row-1" : "row-2";
        }

        [user.position, user.name, user.score].forEach(text => {
            const td = document.createElement("td");
            td.textContent = text;
            row.appendChild(td);
        });

        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableDiv.appendChild(table);
    leaderboardContainer.appendChild(tableDiv);

    return leaderboardContainer;
}

export default renderLeaderboard;