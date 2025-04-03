import Header from "/components/headerWithMenu.js";
import { renderFooter } from "../../../components/footer.js";
import { getCurrentUser, checkAuth } from "../../auth.js";
import { navegateTo } from "../../not-authorized-user/script.js";

function renderProfileContent(user) {
  const profileContainer = document.createElement("section");
  profileContainer.className = "profile-container";

  profileContainer.innerHTML = `
        <div class="profile-header">
            <div class="profile-image-container">
                <img id="profileImage" src="${
                  user.photo || "/default-profile.png"
                }" alt="Avatar">
                <div class="edit-overlay">
                    <span class="edit-icon">📷</span>
                </div>
            </div>
            <div class="profile-info">
                <h1>${user.name || "Usuário"}</h1>
                ${
                  user.level
                    ? `<p class="user-level">Nível: ${user.level}</p>`
                    : ""
                }
            </div>
        </div>
        <div class="profile-details">
            ${createProfileField("Nome", "name", user.name, true)}
            ${createProfileField("Email", "email", user.email, false)}
            ${createProfileField("Data Nasc.", "birthdate", "XX/XX/XXXX", true)}
            ${createProfileField("Celular", "phone", "(11) 22222-3333", true)}
            ${createProfileField("Local", "location", "São Paulo - SP", true)}
            ${createProfileField(
              "Criação da Conta",
              "accountCreated",
              "XX/XX/XXXX",
              false
            )}
        </div>
    `;

  return profileContainer;
}

function createProfileField(label, key, value, editable) {
  return `
        <div class="profile-field">
            <strong>${label}:</strong>
            ${
              editable
                ? `
                <span class="editable" data-key="${key}">${value || ""}</span>
                <span class="edit-icon" aria-label="Editar ${label}">✏️</span>
            `
                : `<span>${value || ""}</span>`
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

  const user = getCurrentUser();
  const element = document.createElement("div");

  if (!window.profileImageUpload) {
    window.profileImageUpload = document.createElement("input");
    window.profileImageUpload.type = "file";
    window.profileImageUpload.accept = "image/*";
    window.profileImageUpload.style.display = "none";
    document.body.appendChild(window.profileImageUpload);
  }

  element.appendChild(Header());

  const main = document.createElement("main");
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

  window.profileImageUpload.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        profileImage.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    event.target.value = "";
  });

  container.querySelectorAll(".edit-icon").forEach((icon) => {
    icon.addEventListener("click", handleEdit);
  });
}

function handleEdit(event) {
  const span = event.target.previousElementSibling;
  if (!span) return;

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
    newSpan.nextElementSibling?.addEventListener("click", handleEdit);
  }

  input.addEventListener("blur", saveEdit, { once: true });
  input.addEventListener(
    "keydown",
    (e) => {
      if (e.key === "Enter") saveEdit();
    },
    { once: true }
  );
}

export default ProfilePage;
