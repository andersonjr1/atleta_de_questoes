export function Footer() {
    const footer = document.createElement("footer");
    footer.className = "footer";

    const nav = document.createElement("nav");
    nav.className = "footer-nav";

    const contactLink = document.createElement("a");
    contactLink.href = "tel:+55-11-99999-9999";
    contactLink.className = "contact";
    contactLink.innerHTML = "Entrar em contato &#9742;'"

    nav.appendChild(contactLink);

    const signature = document.createElement("div");
    signature.className = "footer-signature";
    signature.innerHTML = "<p>&#169; 2025 Atleta de Questões. Todos os direitos reservados.</p>";

    footer.appendChild(nav);
    footer.appendChild(signature);

    return footer;
}

export default Footer;