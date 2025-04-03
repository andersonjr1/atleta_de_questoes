import { renderHeader } from "../../../components/header.js";
import { renderFooter } from "../../../components/footer.js";
import { getCurrentUser, checkAuth } from "../../auth.js";
import { navegateTo } from "../../not-authorized-user/script.js";


async function profilePage() {

    const isAuthenticated = await checkAuth();
    if (!isAuthenticated) {
        await navegateTo("/login?redirect=/profile");
        return document.createElement("div"); // Retorna vazio se não autenticado
    }

    const element = document.createElement("div");
    const user = getCurrentUser(); // Obtém dados do usuário logado

    element.appendChild(renderHeader());

    const main = document.createElement("main");
    main.innerHTML = `
  <section class="profile-container">
    <div class="profile-header">
      <div class="profile-image-container">
        <input type="file" id="imageUpload" accept="image/*" style="display: none;">
        <img id="profileImage" src="${user.photo || '/default-profile.png'}" alt="Avatar" width="100" height="100">
        <div class="edit-overlay">
          <span class="edit-icon">📷</span>
        </div>
      </div>
      <div>
        <h1>${user.name || 'Usuário'}</h1>
        ${user.level ? `<p>Nível: ${user.level}</p>` : ''}
      </div>
    </div>
    <div class="profile-details">
      <div><strong>Nome:</strong> <span class="editable" data-key="name">${user.name || ''}</span> <span class="edit-icon">✏️</span></div>
      <div><strong>Email:</strong> <span>${user.email || ''}</span></div>
      <div><strong>Data de Nascimento:</strong> <span class="editable" data-key="birthdate">XX/XX/XXXX</span> <span class="edit-icon">✏️</span></div>
                <div><strong>Celular:</strong> <span class="editable" data-key="phone">(11) 22222-3333</span> <span class="edit-icon">✏️</span></div>
                <div><strong>Local:</strong> <span class="editable" data-key="location">São Paulo - SP</span> <span class="edit-icon">✏️</span></div>
                <div><strong>Criação da Conta:</strong> <span class="editable" data-key="accountCreation">XX/XX/XXXX</span></div>
    </div>
  </section>
`;

    element.appendChild(main);
    element.appendChild(renderFooter());

    // Adiciona o conteúdo ao DOM
    // const app = document.getElementById("app");
    // app.appendChild(element);

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
                const span = event.target.previousElementSibling; 
                const oldValue = span.textContent; 
                const input = document.createElement("input");
                input.type = "text";
                input.value = oldValue;
                input.dataset.key = span.dataset.key; 

                span.replaceWith(input);  
                input.focus();

                function saveEdit() {
                    const newValue = input.value.trim();
                    const newSpan = document.createElement("span");
                    newSpan.classList.add("editable");
                    newSpan.dataset.key = input.dataset.key;
                    newSpan.textContent = newValue || oldValue;
                    input.replaceWith(newSpan);
                    enableEditing();
                }

                input.addEventListener("blur", saveEdit);
                input.addEventListener("keydown", (e) => {
                    if (e.key === "Enter") saveEdit();
                });
            });
        });
    }

    enableEditing();

    return element;

}

export default profilePage;