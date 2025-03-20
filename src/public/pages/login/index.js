const formLogin = document.getElementById("formLogin");
const errorMessage = document.getElementById("errorMessage");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(formLogin);

  const email = formData.get("email");
  const password = formData.get("password");

  errorMessage.style.display = "none";
  errorMessage.textContent = "";

  try {
    const response = await fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      window.location.href = "../bem-vindo";
    } else {
      errorMessage.style.display = "block";
      errorMessage.textContent = data || "Erro ao fazer login";
    }
  } catch (error) {
    console.error("Erro na requisição: ", error);
    errorMessage.style.display = "block";
    errorMessage.textContent = "Erro na requisição. Tente novamente.";
  }
});
