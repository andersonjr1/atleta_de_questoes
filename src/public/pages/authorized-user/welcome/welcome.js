import { navegateTo } from "../../not-authorized-user/script.js";

function welcomePage() {
  const element = document.createElement("div");
  element.className = "welcome-container";

  // Verificação segura dos dados
  const authData = JSON.parse(localStorage.getItem('authData')) || {};
  const user = authData.user || {};
  const userName = user.name || 'Usuário';
  const userEmail = user.email || '';

  element.innerHTML = `
    <div class="welcome-card">
      <h1>Bem-vindo, ${userName}!</h1>
      <div class="user-info">
        <p>Email: ${userEmail}</p>
        ${user.level ? `<p>Nível: ${user.level}</p>` : ''}
      </div>
      <div class="welcome-actions">
        <button id="continueButton" class="btn-primary">Acessar Plataforma</button>
        <button id="logoutButton" class="btn-secondary">Sair</button>
      </div>
    </div>
  `;

  element.querySelector("#continueButton").addEventListener("click", () => {
    navegateTo("/profile");
  });

  element.querySelector("#logoutButton").addEventListener("click", async () => {
  try {
    await fetch("http://localhost:4000/api/logout", {
      method: "POST",
      credentials: 'include'
    });
    
    // Limpa todos os dados de autenticação
    localStorage.removeItem('authData');
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    
    // Redireciona para login
    await navegateTo("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
});

  return element;
}

export default welcomePage;
