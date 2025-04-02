function messageCreate(success, text) {
  const message = document.createElement("div");
  if (document.getElementById("message")) {
    document.getElementById("message").remove();
  }

  message.id = "message";

  message.innerText = text;

  const styleSheet = document.styleSheets[0];

  styleSheet.insertRule(
    `
            @keyframes slideRight {
                0% {
                    right: 0px;
                }
                100% {
                    right: 50px;
                }
            }
        `,
    styleSheet.cssRules.length
  );

  message.style.position = "fixed";
  message.style.color = "white";
  message.style.bottom = "30px";
  message.style.animation = "slideRight 0.4s forwards";
  message.style.padding = "10px 20px";
  message.style.borderRadius = "10px";
  message.style.zIndex = "3";

  if (success) {
    message.style.backgroundColor = "#06402A";
  } else {
    message.style.backgroundColor = "#791C27";
  }

  setTimeout(() => {
    message.remove();
  }, 8000);

  message.addEventListener("click", () => {
    message.remove();
  });

  return message;
}

export default messageCreate;
