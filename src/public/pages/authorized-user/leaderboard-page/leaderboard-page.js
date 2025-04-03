import Header from "/components/headerWithMenu.js";
import renderLeaderboard from "/components/leaderboard.js";
import Footer from "/components/footer.js";

function leaderboardPage() {
  const element = document.createElement("div");

  element.appendChild(Header());
  element.appendChild(renderLeaderboard());
  element.appendChild(Footer());

  return element;
}

export default leaderboardPage;
