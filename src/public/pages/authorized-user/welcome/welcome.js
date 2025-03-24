const element = document.createElement("div");

element.innerHTML = `
<div class="welcome-container">
    <h1>Seja Bem-Vindo!</h1>
    <p>Você está logado na aplicação</p>
    <button id="exitButton">Sair</button>
</div>
`;

const button = element.querySelector("#exitButton");

button.addEventListener("click", async () => {
  try {
    const response = await fetch("http://localhost:4000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.href = "../login";
    }
  } catch (error) {
    console.error("Erro na requisição: ", error);
  }
});

export default element;
