import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { renderLeaderboard } from "../components/leaderboard.js";

function LeaderboardPage() {
  const element = document.getElementById("app");

  element.appendChild(renderHeader());
  element.appendChild(renderLeaderboard());
  element.appendChild(renderFooter());

  return element;
}

export default LeaderboardPage;
