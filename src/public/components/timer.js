function Timer(startTime, endTime, callback) {
  const timerContainer = document.createElement("div");
  timerContainer.id = "timerContainer";
  timerContainer.style.marginBottom = "10px";
  timerContainer.style.fontSize = "24px";
  timerContainer.style.fontWeight = "bold";

  function updateTime() {
    const now = Date.now();
    const minutes = Math.floor((endTime - now) / 1000 / 60);
    const seconds = Math.floor((endTime - now) / 1000) % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    timerContainer.innerText = `${formattedMinutes}:${formattedSeconds}`;
    if (now >= endTime) {
      clearInterval(intervalId);
      callback();
    }
  }

  const intervalId = setInterval(updateTime, 500);

  updateTime();

  return { timerContainer, intervalId };
}

export default Timer;
