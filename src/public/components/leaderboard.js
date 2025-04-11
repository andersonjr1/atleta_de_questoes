export function renderLeaderboard() {
  const leaderboardContainer = document.createElement("main");
  leaderboardContainer.className = "leaderboard-container";

  const title = document.createElement("h1");
  title.className = "leaderboard-title";
  title.textContent = "Ranking de Usuários";
  leaderboardContainer.appendChild(title);

  const loading = document.createElement("p");
  loading.textContent = "Carregando ranking...";
  leaderboardContainer.appendChild(loading);

  async function fetchLeaderboard() {
    try {
      const response = await fetch("/api/leaderboard", {
        credentials: "include",
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
        ...data.otherUsers.map((user) => ({ ...user, isCurrentUser: false })),
      ]
      .sort((a, b) => {
        // First sort by points (descending)
        if (b.points !== a.points) {
          return b.points - a.points;
        }
        // If points are equal, sort by name (ascending)
        return a.name.localeCompare(b.name);
      })
      .map((user, index) => ({ ...user, position: index + 1 }));

      if (allUsers.length === 0) {
        const noData = document.createElement("p");
        noData.textContent = "Nenhum dado de ranking disponível.";
        leaderboardContainer.appendChild(noData);
      } else {
        const tableDiv = document.createElement("div");
        tableDiv.className = "leaderboard-table";

        const table = document.createElement("table");

        const thead = document.createElement("thead");
        const headerRow = document.createElement("tr");

        ["Posição", "Usuário", "Pontuação"].forEach((text) => {
          const th = document.createElement("th");
          th.textContent = text;
          headerRow.appendChild(th);
        });

        table.appendChild(thead);
        thead.appendChild(headerRow);

        const tbody = document.createElement("tbody");

        // Find current user
        const currentUser = allUsers.find(user => user.isCurrentUser);
        const currentUserPosition = currentUser ? currentUser.position : -1;
        
        // Always show top 10 users
        const top10Users = allUsers.slice(0, 10);

        // Render top 10 rows
        top10Users.forEach((user, index) => {
          const row = document.createElement("tr");

          if (user.isCurrentUser) {
            row.className = "current-user";
          } else {
            row.className = index % 2 === 0 ? "row-1" : "row-2";
          }

          [user.position, user.name, user.points].forEach((text) => {
            const td = document.createElement("td");
            td.textContent = text;
            row.appendChild(td);
          });

          tbody.appendChild(row);
        });

        // If current user is not in top 10, add separator and their row
        if (currentUserPosition > 10) {
          // Add separator row
          const separatorRow = document.createElement("tr");
          const separatorCell = document.createElement("td");
          separatorCell.colSpan = 3;
          separatorCell.textContent = "...";
          separatorCell.style.textAlign = "center";
          separatorCell.style.padding = "8px";
          separatorCell.style.fontStyle = "italic";
          separatorRow.appendChild(separatorCell);
          tbody.appendChild(separatorRow);

          // Add current user row
          const userRow = document.createElement("tr");
          userRow.className = "current-user";
          [currentUser.position, currentUser.name, currentUser.points].forEach((text) => {
            const td = document.createElement("td");
            td.textContent = text;
            userRow.appendChild(td);
          });
          tbody.appendChild(userRow);
        }

        table.appendChild(tbody);
        tableDiv.appendChild(table);
        leaderboardContainer.appendChild(tableDiv);
      }
    } catch (error) {
      leaderboardContainer.removeChild(loading);

      const errorMessage = document.createElement("p");
      errorMessage.className = "error-message";
      errorMessage.textContent = `Erro: ${error.message}`;
      leaderboardContainer.appendChild(errorMessage);
    }
  }

  fetchLeaderboard();

  return leaderboardContainer;
}

export default renderLeaderboard;
