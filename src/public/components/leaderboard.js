export async function renderLeaderboard() {
    const leaderboardContainer = document.createElement("main");
    leaderboardContainer.className = "leaderboard-container";

    const title = document.createElement("h1");
    title.className = "leaderboard-title";
    title.textContent = "Ranking de Usuários";
    leaderboardContainer.appendChild(title);

    const loading = document.createElement("p");
    loading.textContent = "Carregando ranking...";
    leaderboardContainer.appendChild(loading);

    try {
        const response = await fetch('/api/leaderboard', {
            credentials: 'include'
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        leaderboardContainer.removeChild(loading);

        if (!data.user || !data.otherUsers) {
            throw new Error("Dados do ranking inválidos");
        }

        const allUsers = [
            { ...data.user, isCurrentUser: true },
            ...data.otherUsers.map(user => ({ ...user, isCurrentUser: false }))
        ]
        .sort((a, b) => b.points - a.points)
        .map((user, index) => ({ ...user, position: index + 1 }));

        if (allUsers.length === 0) {
            const noData = document.createElement("p");
            noData.textContent = "Nenhum dado de ranking disponível."
            leaderboardContainer.appendChild(noData);
        } else {
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

            table.appendChild(thead);
            thead.appendChild(headerRow);

            const tbody = document.createElement("tbody");

            allUsers.forEach((user, index) => {
                const row = document.createElement("tr");

                if (user.isCurrentUser) {
                    row.className = "current-user";
                } else {
                    row.className = index % 2 === 0 ? "row-1" : "row-2";
                }

                [user.position, user.name, user.points].forEach(text => {
                    const td = document.createElement("td");
                    td.textContent = text;
                    row.appendChild(td);
                });

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            tableDiv.appendChild(table);
            leaderboardContainer.appendChild(tableDiv);
        }

    } catch(error) {
        leaderboardContainer.removeChild(loading);

        const errorMessage = document.createElement("p");
        errorMessage.className = "error-message";
        errorMessage.textContent = `Erro: ${error.message}`;
        leaderboardContainer.appendChild(errorMessage);
    }
    
    return leaderboardContainer;
}

export default renderLeaderboard;