function ConfirmationModal(text, callback) {
  const modalContainer = document.createElement("div");
  modalContainer.style.position = "fixed";
  modalContainer.style.top = "0";
  modalContainer.style.left = "0";
  modalContainer.style.width = "100%";
  modalContainer.style.height = "100%";
  modalContainer.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  modalContainer.style.display = "flex";
  modalContainer.style.justifyContent = "center";
  modalContainer.style.alignItems = "center";
  modalContainer.style.zIndex = "10";

  const modalContent = document.createElement("div");
  modalContent.style.backgroundColor = "white";
  modalContent.style.padding = "20px";
  modalContent.style.borderRadius = "5px";
  modalContent.style.textAlign = "center";
  modalContent.style.maxWidth = "80%";
  modalContent.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.5)";

  const textElement = document.createElement("p");
  textElement.textContent = text;
  textElement.style.marginBottom = "20px";

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.justifyContent = "center";
  buttonContainer.style.gap = "20px";

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancelar";
  cancelButton.style.backgroundColor = "#ccc";
  cancelButton.style.color = "black";
  cancelButton.style.border = "none";
  cancelButton.style.padding = "10px 20px";
  cancelButton.style.borderRadius = "5px";
  cancelButton.style.cursor = "pointer";

  const confirmButton = document.createElement("button");
  confirmButton.textContent = "Confirmar";
  confirmButton.style.backgroundColor = "#3D52A0";
  confirmButton.style.color = "white";
  confirmButton.style.border = "none";
  confirmButton.style.padding = "10px 20px";
  confirmButton.style.borderRadius = "5px";
  confirmButton.style.cursor = "pointer";

  buttonContainer.appendChild(cancelButton);
  buttonContainer.appendChild(confirmButton);
  modalContent.appendChild(textElement);
  modalContent.appendChild(buttonContainer);
  modalContainer.appendChild(modalContent);

  function handleEscapeKey(event) {
    if (event.key === "Escape") {
      modalContainer.remove();
      document.removeEventListener("keydown", handleEscapeKey);
    }
  }

  document.addEventListener("keydown", handleEscapeKey);

  modalContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  modalContainer.addEventListener("click", (event) => {
    modalContainer.remove();
    document.removeEventListener("keydown", handleEscapeKey);
  });

  cancelButton.addEventListener("click", () => {
    modalContainer.remove();
    document.removeEventListener("keydown", handleEscapeKey);
  });

  confirmButton.addEventListener("click", () => {
    callback();
    modalContainer.remove();
    document.removeEventListener("keydown", handleEscapeKey);
  });

  return modalContainer;
}

export default ConfirmationModal;
