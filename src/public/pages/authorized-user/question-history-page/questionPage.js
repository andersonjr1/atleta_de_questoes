import { renderHeader } from "../../../components/header.js";
import { renderFooter } from "../../../components/footer.js";
import { renderHistoryPage } from "../../../components/historyPage.js";

function HistoryPage() {
  const element = document.createElement("div");

  element.appendChild(renderHeader());
  const mainContent = document.createElement("main");
  mainContent.appendChild(renderHistoryPage());
  element.appendChild(mainContent);

  element.appendChild(renderFooter());

  return element;
}

export default HistoryPage;
