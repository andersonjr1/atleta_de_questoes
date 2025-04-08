import { navegateTo } from "../script.js";
import message from "/components/message.js";

function RegisterPage() {
  const element = document.createElement("div");

  element.innerHTML = `
  <header id="registerHeader" class="auth-header">
      <div id="logo">
        <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.988 17.0656C34.9544 17.0656 34.9208 17.0824 34.8704 17.0824C34.8536 17.0824 34.8368 17.0656 34.82 17.0656L29.697 17.8383L26.7911 11.4219C26.4048 10.6324 25.9177 9.99415 25.3298 9.49024C25.0778 9.23829 24.7923 9.01993 24.4732 8.85196C24.154 8.66719 23.8013 8.54961 23.4485 8.48243C22.5079 8.26407 21.6513 8.39844 20.8618 8.85196L14.4454 11.8586C14.0087 12.1441 13.6056 12.2449 13.488 12.3289C12.8329 12.7824 12.7153 13.0344 12.6482 13.1688L9.42315 19.3668C9.38955 19.4172 9.37276 19.4844 9.35597 19.5516C9.23839 19.7867 9.1712 20.0555 9.1712 20.3242C9.1712 20.6098 9.25518 20.8953 9.37276 21.1305C9.54073 21.5336 9.80948 21.7856 10.179 21.9031C10.3974 22.0039 10.6493 22.0711 10.9181 22.0711C11.6067 22.0711 12.2114 21.668 12.497 21.0801C12.5138 21.0465 12.5474 21.0129 12.5642 20.9793C14.5798 17.2 15.5876 15.302 15.5876 15.2684L19.0142 14.4621L14.8989 31.7797L7.038 31.7293C7.0212 31.7293 7.00439 31.7293 7.00439 31.7461C6.9876 31.7461 6.97081 31.7461 6.95402 31.7461C5.91261 31.7461 5.07275 32.5859 5.07275 33.6273C5.07275 34.5848 5.79503 35.3742 6.71886 35.475V35.4918H8.91924C10.6157 35.5758 15.638 35.7941 17.1665 35.6262C17.2169 35.6262 17.2673 35.643 17.3177 35.643C18.1743 35.643 18.8798 35.0383 19.031 34.232L20.2067 30.7719C20.9962 28.5043 21.5337 26.3039 21.5337 26.3039C23.5829 28.4539 25.1114 29.8648 26.5224 31.343L28.9243 39.2375L29.4282 41.1356H29.445C29.7138 41.9586 30.4864 42.5801 31.3935 42.5801C32.5357 42.5801 33.4595 41.6562 33.4595 40.5141C33.4595 40.3461 33.4427 40.1949 33.3923 40.0438L33.2411 39.4559C33.2411 39.4391 33.2411 39.4391 33.2411 39.4223L32.8044 37.7762L32.3677 36.1469L30.604 29.5793C30.3521 28.9746 30.1505 28.3699 29.6298 27.7988C29.6298 27.7988 24.7083 22.3399 24.5739 22.2559L25.6993 16.9648L27.2614 20.2738C27.2782 20.3074 27.295 20.3242 27.3286 20.3578C27.4294 20.509 27.5302 20.6434 27.6142 20.7441C27.9165 21.0465 28.3196 21.2313 28.7732 21.2313C28.7899 21.2313 28.8067 21.2313 28.8067 21.2313C28.9411 21.2313 29.0755 21.2145 29.2099 21.1809L34.9544 20.5594C34.9712 20.5594 34.988 20.5594 35.0048 20.5594C35.156 20.5594 35.2903 20.5426 35.4247 20.509L35.5087 20.4922C35.5255 20.4922 35.5423 20.4754 35.5591 20.4586C36.231 20.2235 36.7349 19.5852 36.7349 18.8293C36.7013 17.8383 35.9286 17.0656 34.988 17.0656Z" fill="white"/>
            <path d="M24.1372 7.37383C25.1114 7.37383 25.9344 7.03789 26.6231 6.34922C27.3118 5.66054 27.6477 4.8543 27.6477 3.93047C27.6477 2.95625 27.3118 2.1332 26.6231 1.44453C25.9344 0.755855 25.1114 0.419922 24.1372 0.419922C23.1965 0.419922 22.3903 0.755855 21.7016 1.44453C21.0129 2.1332 20.677 2.95625 20.677 3.93047C20.677 4.8711 21.0129 5.67734 21.7016 6.34922C22.4071 7.03789 23.2133 7.37383 24.1372 7.37383Z" fill="white"/>
            <span id="logoText">Questões</span>
        </svg>
      </div>
  </header>
  <main id="mainRegister" class="auth-main">
      <div id="registerImage">
          <img src="../../images/site/RunnerLogin.png">
      </div>
      <div id="registerInputs">
          <h1 id="registerH1" class="auth-h1">Fazer Registro</h1>
          <div id="formRegister" class="auth-form">
              <div class="input-auth-container">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFFF"><path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/></svg>
                  <input id="registerNameInput" type="text" class="input-auth" placeholder="Nome" name="name">
              </div>
              <div class="input-auth-container">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFFF"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/></svg>
                  <input id="registerEmailInput" type="email" class="input-auth" placeholder="Email" name="email">
              </div>
              <div class="input-auth-container">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFFF"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                  <input id="registerPasswordInput" type="password" class="input-auth" placeholder="Senha" name="password">
              </div>
              <div class="input-auth-container">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFFF"><path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/></svg>
                  <input id="registerConfirmPasswordInput" type="password" class="input-auth" placeholder="Confirmar senha" name="confirmPassword">
              </div>
              <div id="registerButtons" class="auth-buttons">
                  <span id="spanLogin" class="auth-link">Login</span>
                  <button id="buttonRegister" class="auth-button">REGISTRAR</button>
              </div>
          </div>
          <div id="errorMessage" class="error-message" style="display: none;"></div>
      </div>
  </main>
  <footer id="footerRegister" class="auth-footer">
      <div>© 2025 Atleta de Questões. Todos direitos reservados </div>
      <img src="../../images/site/github.png" id="githubImage">
  </footer>
`;

  const errorMessage = element.querySelector("#errorMessage");
  const spanLogin = element.querySelector("#spanLogin");

  element.style.height = "100vh";
  element.style.display = "flex";
  element.style.flexDirection = "column";

  spanLogin.addEventListener("click", () => {
    navegateTo("/login");
  });

  const button = element.querySelector("#buttonRegister");

  button.addEventListener("click", async () => {
    try {
      button.disabled = true;
      const name = element.querySelector("#registerNameInput").value;
      const email = element.querySelector("#registerEmailInput").value;
      const password = element.querySelector("#registerPasswordInput").value;
      const confirmPassword = element.querySelector(
        "#registerConfirmPasswordInput"
      ).value;

      if (password != confirmPassword) {
        document
          .querySelector("body")
          .appendChild(message(false, "As senhas não coincidem!"));
        return;
      }

      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
        credentials: "include", // Importante para cookies
      });

      const data = await response.json();

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      if (!response.ok) {
        throw new Error(data.message || "Erro no registro");
      }

      localStorage.setItem("userData", JSON.stringify(data));

      navegateTo("/profile");
    } catch (error) {
      document.querySelector("body").appendChild(message(false, error.message));
    } finally {
      button.disabled = false;
    }
  });

  return element;
}

export default RegisterPage;
