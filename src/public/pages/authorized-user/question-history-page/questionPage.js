import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";
import { renderHistoryPage } from "../components/historyPage.js";

function HistoryPage() {
  const element = document.createElement("div");

  element.appendChild(renderHeader());
  element.appendChild(renderHistoryPage());
  element.appendChild(renderFooter());

  return element;
}

export default HistoryPage;
