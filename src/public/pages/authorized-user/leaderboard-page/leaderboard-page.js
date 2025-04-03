import Header from "/src/public/components/headerWithMenu.js";
import renderLeaderboard from "/src/public/components/leaderboard.js"
import Footer from "/src/public/components/footer.js";

function leaderboardPage() {
    const app = document.getElementById("app");

    app.appendChild(Header());
    app.appendChild(renderLeaderboard());
    app.appendChild(Footer());
}

document.addEventListener("DOMContentLoaded", leaderboardPage);