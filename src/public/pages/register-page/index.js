const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(formLogin);
  console.log(formData);
});
