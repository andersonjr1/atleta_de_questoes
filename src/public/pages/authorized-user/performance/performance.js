import Header from "/components/headerWithMenu.js";
import { renderFooter } from "/components/footer.js";
import Chart from 'chart.js/auto';

function PerformancePage() {
    const element = document.createElement("div");
    element.style.height = "100vh";
    element.style.display = "flex";
    element.style.flexDirection = "column";

    //Header
    element.appendChild(Header());

    //Main content
    const main = document.createElement("main");
    main.style.flex = "1";
    main.style.padding = "20px";
    main.style.display = "flex";
    main.style.flexDirection = "column";
    main.style.alignItems = "center";

    //Title
    const title = document.createElement("h1");
    title.textContent = "Evolução do Desempenho";
    text.style.color = "#0b2072";
    title.style.marginBottom = "30px";
    main.appendChild(title);

    //Filter
    const filtersContainer = document.createElement("div");
    filtersContainer.style.display = "flex";
    filtersContainer.style.gap = "20px";
    filtersContainer.style.marginBottom = "30px";
    filtersContainer.style.flexWrap = "wrap";
    filtersContainer.style.justifyContent = "center";

    //Year filter
    const yearLabel = document.createElement("label");
    yearLabel.textContent = "Ano";
    const yearSelect = document.createElement("select");
    yearSelect.id = "yearFilter";
    yearSelect.style.padding = "8px";
    yearSelect.style.borderRadius = "5px";
    yearSelect.style.border = "1px solid #0B2072";

    //Add year options - 2025 as default
    const years = [2014, 2015, 2016];
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year;
        option.textContent = year;
        if (year === 2015) option.selected = true;
        yearSelect.appendChild(option);
    });

    yearLabel.appendChild(yearSelect);
    filtersContainer.appendChild(yearLabel);

    //Discipline filter
    const disciplineLabel = document.createElement("label");
    disciplineLabel.textContent = "Matéria";
    const disciplineSelect = document.createElement("select");
    disciplineSelect.id = "disciplineFilter";
    disciplineSelect.style.padding = "8px";
    disciplineSelect.style.borderRadius = "5px";
    disciplineSelect.style.border = "1px solid #0B2072";

    const disciplines = [
        { value: "all", text: "Todas" },
        { value: "matematica", text: "Matemática" },
        { value: "linguagens", text: "Linguagens" },
        { value: "ciencias-humanas", text: "Ciências Humanas" },
        { value: "ciencias-natureza", text: "Ciências da Natureza" }
    ];

    disciplines.forEach(discipline => {
        const option = document.createElement("option");
        option.value = discipline.value;
        option.textContent = discipline.text;
        disciplineSelect.appendChild(option);
    });

    disciplineLabel.appendChild(disciplineSelect);
    filtersContainer.appendChild(disciplineLabel);

    main.appendChild(filtersContainer);

    //Chart
    const chartContainer = document.createElement("div");
    chartContainer.style.width = "90%";
    chartContainer.style.maxWidth = "800px";
    chartContainer.style.height = "400px";
    chartContainer.style.marginBottom = "30px";

    const canvas = document.createElement("canvas");
    canvas.id = "performanceChart";
    chartContainer.appendChild(canvas);
    main.appendChild(chartContainer);

    element.appendChild(main);
    element.appendChild(renderFooter());

    return element;
}

export default PerformancePage;