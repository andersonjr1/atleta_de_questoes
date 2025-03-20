const formRegister = document.getElementById("formRegister");
const errorMessage = document.getElementById("errorMessage");

formRegister.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(formRegister);

  const email = formData.get("email");
  const password = formData.get("password");
  const name = formData.get("name");
  const confirmPassword = formData.get("confirmPassword");

  errorMessage.style.display = "none";
  errorMessage.textContent = "";

  if (!email || !password || !name || !confirmPassword) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "Preencha todos os campos";
    return;
  }

  if (password != confirmPassword) {
    errorMessage.style.display = "block";
    errorMessage.textContent = "As senhas precisam ser iguais";
    return;
  }

  try {
    const response = await fetch("http://localhost:4000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });

    const data = await response.json();
    if (response.ok) {
      window.location.href = "../bem-vindo";
    } else {
      errorMessage.style.display = "block";
      errorMessage.textContent = data || "Erro ao fazer registro";
    }
  } catch (error) {
    console.error("Erro na requisição: ", error);
    errorMessage.style.display = "block";
    errorMessage.textContent = "Erro na requisição. Tente novamente.";
  }
});
