const element = document.createElement("div");

element.innerHTML = `
    <header>
        <nav class="navbar">
            <div class="logo">
                <img src="../../../images/site/runnerLogo.png" alt="Logo">
                <a href="#">Questões</a>
            </div>
            <div class="hamburger" id="hamburger-menu">
                <div class="bar"></div>
                <div class="bar"></div>
                <div class="bar"></div>
            </div>
            <ul class="navbar-list" id="navbar-list">
                <li><a href="#">Buscar</a></li>
                <li><a href="#">Questão Aleatória</a></li>
                <li><a href="#">Simulado</a></li>
                <li><a href="#">Ranking</a></li>
                <li><a href="#">Desempenho</a></li>
                <li><a href="#">Perfil</a></li>
                <li><a href="#">Histórico</a></li>
                <li class="logout-item"><a href="#" class="logout">Sair<img src="../../../images/site/exitLogo.png" alt="logout"></a></li>
            </ul>
            <div>
                <a href="#" class="logout logout-desktop"><img src="../../../images/site/exitLogo.png" alt="logout"></a>
            </div>
        </nav>
    </header>
    <main>
        <section class="profile-container">
            <div class="profile-header">
                <div class="profile-image-container">
                    <input type="file" id="imageUpload" accept="image/*" style="display: none;">
                    <img id="profileImage" src="../../../images/site/profile.png" alt="Avatar do Usuário" width="100" height="100">
                    <div class="edit-overlay">
                        <span class="edit-icon">📷</span>
                    </div>
                </div>
                <div>
                    <h1>Usuário X</h1>
                    <p>Nível: 4</p>
                </div>
            </div>
            <div class="profile-details">
                <div><strong>Nome:</strong> <span class="editable" data-key="name">XXXXX</span> <span class="edit-icon">✏️</span></div>
                <div><strong>Sobrenome:</strong> <span class="editable" data-key="surname">ZZZZZ</span> <span class="edit-icon">✏️</span></div>
                <div><strong>Email:</strong> <span class="editable" data-key="email">XZXZ@email.com</span> <span class="edit-icon">✏️</span></div>
                <div><strong>Data de Nascimento:</strong> <span class="editable" data-key="birthdate">XX/XX/XXXX</span> <span class="edit-icon">✏️</span></div>
                <div><strong>Celular:</strong> <span class="editable" data-key="phone">(11) 22222-3333</span> <span class="edit-icon">✏️</span></div>
                <div><strong>Local:</strong> <span class="editable" data-key="location">São Paulo - SP</span> <span class="edit-icon">✏️</span></div>
                <div><strong>Criação da Conta:</strong> <span class="editable" data-key="accountCreation">XX/XX/XXXX</span> <span class="edit-icon">✏️</span></div>
            </div>
        </section>
    </main>
`;

// Adiciona o conteúdo ao DOM
const app = document.getElementById("app");
app.appendChild(element);

// Seleciona o botão de hambúrguer e a lista de navegação
const hamburger = document.getElementById('hamburger-menu');
const navbarList = document.getElementById('navbar-list');

// Adiciona o evento de clique ao botão do hambúrguer
if (hamburger && navbarList) {
    console.log("Elementos encontrados no DOM");  
    hamburger.addEventListener('click', () => {
        console.log('Hamburguer clicado'); // Verifica se o clique está sendo detectado
        navbarList.classList.toggle('active'); // Alterna a classe 'active' no menu
    });
} else {
    console.error("Elementos não encontrados no DOM.");
}

const profileImageContainer = element.querySelector(".profile-image-container");
const imageUpload = element.querySelector("#imageUpload");

profileImageContainer.addEventListener("click", () => {
    imageUpload.click();
});

imageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profileImage.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function enableEditing() {
    const editIcons = element.querySelectorAll(".edit-icon");

    editIcons.forEach(icon => {
        icon.addEventListener("click", (event) => {
            const span = event.target.previousElementSibling; // Pega o elemento que contém o texto
            const oldValue = span.textContent; // Salva o valor antigo
            const input = document.createElement("input");
            input.type = "text";
            input.value = oldValue;
            input.dataset.key = span.dataset.key; // Mantém a referência à chave do dado

            span.replaceWith(input); // Substitui o span pelo input
            input.focus();

            // Salvar ao pressionar "Enter" ou sair do campo
            function saveEdit() {
                const newValue = input.value.trim();
                const newSpan = document.createElement("span");
                newSpan.classList.add("editable");
                newSpan.dataset.key = input.dataset.key;
                newSpan.textContent = newValue || oldValue; // Se vazio, mantém o valor antigo
                input.replaceWith(newSpan);
                enableEditing(); // Reaplica os eventos
            }

            input.addEventListener("blur", saveEdit);
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") saveEdit();
            });
        });
    });
}

enableEditing();

export default element;