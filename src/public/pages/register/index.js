const formRegister = document.getElementById("formRegister");

formRegister.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(formRegister);
  console.log(formData);
});
