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
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        if (!response.ok) {
            throw new Error('Falha ao carregar o ranking');
        }

        const data = await response.json();

        const allUsers = [
            { ...data.user, isCurrentUser: true },
            ...data.otherUsers.map(user => ({ ...user, isCurrentUser: false }))
        ]
        .sort((a, b) => b.points - a.points)
        .map((user, index) => ({ ...user, position: index + 1 }));

        leaderboardContainer.removeChild(loading);

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
    
    } catch(error) {
        leaderboardContainer.removeChild(loading);
        const errorMessage = document.createElement("p");
        errorMessage.className = "error-message";
        errorMessage.textContent = error.message;
        leaderboardContainer.appendChild(errorMessage);
    }

    return leaderboardContainer;
}

export default renderLeaderboard;