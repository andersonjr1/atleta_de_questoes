export function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "footer";

  const signature = document.createElement("div");
  signature.className = "footer-signature";
  signature.innerHTML =
    "<p>&#169; 2025 Atleta de Questões. Todos os direitos reservados.</p>";

  footer.appendChild(signature);

  return footer;
}
