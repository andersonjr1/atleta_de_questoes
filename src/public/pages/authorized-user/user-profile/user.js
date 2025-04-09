import Header from "/components/headerWithMenu.js";
import { renderFooter } from "../../../components/footer.js";
import { fetchUserProfile, checkAuth } from "../../auth.js";
import { navegateTo } from "../../not-authorized-user/script.js";

function renderProfileContent(user) {
  const profileContainer = document.createElement("section");
  profileContainer.className = "profile-container";

  profileContainer.innerHTML = `
        <div class="profile-header">
            <div class="profile-image-container">
                <img id="profileImage" src="${user.avatar_url || "../../images/site/profile.png"
    }" alt="Avatar">
                <div class="edit-overlay">
                    <span class="photo-icon">📷</span>
                </div>
            </div>
            <div class="profile-info">
                <h1>${user.name || "Usuário"}</h1>
                ${user.level
      ? `<p class="user-level">Nível: ${user.level}</p>`
      : ""
    }
            </div>
        </div>
        <div class="profile-details">
            ${createProfileField("Nome", "name", user.name, false)}
            ${createProfileField("Email", "email", user.email, false)}
            ${createProfileField("Data Nasc.", "birthdate", user.birthdate ? formatarDataParaExibicao(user.birthdate) : "XX/XX/XXXX", true)}
            ${createProfileField("Celular", "phone", user.phone || "(00) 00000-0000", true)}
            ${createProfileField("Local", "location", user.location || "Não informado", true)}
            ${createProfileField(
      "Criação da Conta",
      "accountCreated",
      user.created_at,
      false
    )}
        </div>
    `;

  return profileContainer;
}

function createProfileField(label, key, value, editable) {
  return `
      <div class="profile-field">
      <div class="profile-label-value">
        <strong>${label}:</strong>
        ${
          editable
            ? `<span class="editable" data-key="${key}">${value || ""}</span>`
            : `<span>${value || ""}</span>`
        }
      </div>
      ${
        editable
          ? `<span class="edit-icon" aria-label="Editar ${label}">✏️</span>`
          : ""
      }
    </div>
    `;
}

async function ProfilePage() {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    await navegateTo("/login?redirect=/profile");
    return document.createElement("div");
  }

  const localUser = JSON.parse(localStorage.getItem('user'));
  const authData = JSON.parse(localStorage.getItem('authData'));

  let user;
  if (localUser && authData?.token) {
    user = localUser;
  } else {
    user = await fetchUserProfile();
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (!authData){
        localStorage.removeItem("user");
      }
    }
  }

  if (!user) {
    console.error("Falha ao carregar perfil");
    return document.createElement("div");
  }
  const element = document.createElement("div");
  element.style.height = "100vh";
  element.style.display = "flex";
  element.style.flexDirection = "column";

  if (!window.profileImageUpload) {
    window.profileImageUpload = document.createElement("input");
    window.profileImageUpload.type = "file";
    window.profileImageUpload.accept = "image/*";
    window.profileImageUpload.style.display = "none";
    document.body.appendChild(window.profileImageUpload);
  }

  element.appendChild(Header());

  const main = document.createElement("div");
  main.appendChild(renderProfileContent(user));
  element.appendChild(main);

  element.appendChild(renderFooter());

  setupProfileEvents(element);

  return element;
}

function setupProfileEvents(container) {
  const profileImage = container.querySelector("#profileImage");

  container
    .querySelector(".profile-image-container")
    ?.addEventListener("click", () => {
      window.profileImageUpload.click();
    });

  window.profileImageUpload.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    if (file) {

      if (window.isUploading) return;
      window.isUploading = true;

      const authData = JSON.parse(localStorage.getItem("authData"));
      const formData = new FormData();
      formData.append("avatar", file);

      try {
        const response = await fetch("http://localhost:4000/api/user/profile/avatar", {
          method: "POST",
          headers: {
            'Authorization': `Bearer ${authData.token}`
          },
          body: formData,
          credentials: 'include'
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error("Detalhes do erro:", {
            status: response.status,
            statusText: response.statusText,
            errorData
          });
          throw new Error(errorData.message || "Falha no upload");
        }

        const { avatarUrl } = await response.json();
        profileImage.src = avatarUrl;

        const user = JSON.parse(localStorage.getItem('user'));
        user.avatar_url = avatarUrl; // Ou photo, conforme seu padrão
        localStorage.setItem('user', JSON.stringify(user));

        profileImage.src = data.avatarUrl;
      } catch (error) {
        console.error("Error ao enviar imagem", error)
      } finally {
        window.isUploading = false;
      }
    }
    event.target.value = "";
  });

  container.querySelectorAll(".edit-icon").forEach((icon) => {
    icon.addEventListener("click", handleEdit);
  });

  window.addEventListener('storage', (event) => {
    if (event.key === 'user') {
      location.reload(); 
    }
  });
}

function handleEdit(event) {
  event.stopPropagation();

  const profileField = event.target.closest('.profile-field');
  const span = profileField.querySelector('.editable');
  if (!span) return;

  const oldValue = span.textContent;
  const fieldName = span.dataset.key;

  const placeholders = {
    birthdate: 'DD/MM/AAAA',
    phone: '(00) 00000-0000',
    location: 'Cidade, Estado',
  };

  const input = document.createElement("input");
  input.type = "text";
  input.value = oldValue;
  input.dataset.key = fieldName;
  input.placeholder = placeholders[fieldName] || '';

  span.replaceWith(input);
  input.focus();

  let isSaving = false;

  async function saveEdit() {

    if (isSaving) return;
    isSaving = true;

    const newValue = input.value.trim();

    try {
      const updated = await updateProfileField(fieldName, newValue);

      const user = JSON.parse(localStorage.getItem('user'));
      user[fieldName] = updated[fieldName] || newValue;
      localStorage.setItem('user', JSON.stringify(user));

      const newSpan = document.createElement("span");
      newSpan.classList.add("editable");
      newSpan.dataset.key = fieldName;
      newSpan.textContent = fieldName === 'birthdate' 
      ? formatarDataParaExibicao(newValue) 
      : newValue;
      input.replaceWith(newSpan);

      input.removeEventListener("blur", saveEdit);
      input.removeEventListener("keydown", handleKeyDown);

      newSpan.closest('.profile-field').querySelector('.edit-icon').addEventListener('click', handleEdit);

    } catch (error) {
      console.error("Erro ao atualizar:", error.message);
      const newSpan = document.createElement("span");
      newSpan.classList.add("editable");
      newSpan.dataset.key = fieldName;
      newSpan.textContent = oldValue;
      input.replaceWith(newSpan);
      newSpan.closest('.profile-field').querySelector('.edit-icon').addEventListener('click', handleEdit);    
    } finally {
      isSaving = false;
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      saveEdit();
    }
    if (e.key === "Escape") {
      const newSpan = document.createElement("span");
      newSpan.classList.add("editable");
      newSpan.dataset.key = fieldName;
      newSpan.textContent = oldValue;
      input.replaceWith(newSpan);
      newSpan.closest('.profile-field').querySelector('.edit-icon').addEventListener('click', handleEdit);
    }
  }

  input.addEventListener("blur", saveEdit);
  input.addEventListener("keydown", handleKeyDown);
}

async function updateProfileField(field, value) {
  const authData = JSON.parse(localStorage.getItem("authData"));
  const response = await fetch("http://localhost:4000/api/user/profile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${authData.token}`
    },
    body: JSON.stringify({ [field]: value }),
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error("Falha ao atualizar o campo");
  }

  return await response.json();
}

function formatarDataParaExibicao(dataISO) {
  if (!dataISO) return "XX/XX/XXXX";

  if (typeof dataISO === 'string' && dataISO.includes('/')) {
    return dataISO;
  }

  const data = new Date(dataISO);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export default ProfilePage;
