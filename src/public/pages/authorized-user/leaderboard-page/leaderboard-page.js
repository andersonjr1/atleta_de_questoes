import Header from "/components/headerWithMenu.js";
import renderLeaderboard from "/components/leaderboard.js";
import { renderFooter as Footer } from "/components/footer.js";

//Composes the leaderboard page with header, content and footer
function leaderboardPage() {
  const element = document.createElement("div");
  const leaderboardContainer = document.createElement("div");

  element.style.display = "flex";
  element.style.height = "100vh";
  element.style.flexDirection = "column";
  leaderboardContainer.style.flexGrow = 2; //Make content area grow to fill space
  element.appendChild(Header());
  element.appendChild(leaderboardContainer);
  leaderboardContainer.appendChild(renderLeaderboard());
  element.appendChild(Footer());

  return element;
}

export default leaderboardPage;
