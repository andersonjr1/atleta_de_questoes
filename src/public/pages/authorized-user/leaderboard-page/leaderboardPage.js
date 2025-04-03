import { renderHeader } from "../../../components/header.js";
import { renderFooter } from "../../../components/footer.js";
import { renderLeaderboard } from "../../../components/leaderboard.js";

function LeaderboardPage() {
  const element = document.createElement("div");

  element.appendChild(renderHeader());
  const mainContent = document.createElement("main");
  mainContent.appendChild(renderLeaderboard());
  element.appendChild(mainContent);

  element.appendChild(renderFooter());

  return element;
}

export default LeaderboardPage;
