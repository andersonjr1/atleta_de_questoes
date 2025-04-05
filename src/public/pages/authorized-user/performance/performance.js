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

    //Chart initializaation
    let performanceChart = null;

    async function loadPerformanceData(year, discipline) {
        try {
            const url = new URL('/api/performance', window.location.origin);
            url.searchParams.append('year', year);
            if (discipline !== 'all') {
                url.searchParams.append('discipline', discipline);
            }

            if (!response.ok) {
                throw new Error('Error: ${response.status}');
            }

            const data = await response.json();

            //Transform data if needed
            return data.map(item => ({
                ...item,
                month: new Date(item.month) //Ensure month is Date object
            }));


        } catch(error) {
            console.error('Error loading performance data: ', error);
            return [];
        }
    }

    async function updateChart(year, discipline) {
        const data = await loadPerformanceData(year, discipline);

        //Process data for Char.js
        const months = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        //Group data by month
        const monthlyData = {};
        data.forEach(item => {
            const month = new Date(item.month).getMonth();
            if (!monthlyData[month]) {
                monthlyData[month] = {
                    correct: 0,
                    total: 0
                };
            }
            monthlyData[month].correct += item.correct_answers;
            monthlyData[month].total += item.total_answers;
        });

        //Prepare chart data
        const labels = months;
        const percentages = months.map((_, index) => {
            if (monthlyData[index]) {
                return (monthlyData[index].correct / monthlyData[index].total) * 100;
            }
            return 0;
        });

        //Calculate average
        const validMonths = data.filter(item => item.tital_answers > 0);
        const average = validMonths.length > 0
            ? validMonths.reduce((sum, item) => sum + (item.correct_answers / item.total_answers), 0) * 100 / validMonths.length
            : 0;

        //Create or update chart
        const ctx = document.getElementById('performanceChart').getContext('2d');

        if (performanceChart) {
            performanceChart.destroy();
        }

        performanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: '% Acertos',
                        data: percentages,
                        borderColor: '#0B2072',
                        backgroundColor: 'rgba(11, 32, 114, 0.1)',
                        tension: 0.3,
                        fill: true
                    },
                    {
                        label: 'Meta (70%)',
                        data: Array(12).fill(70),
                        borderColor: '#4CAF50',
                        borderDash: [5, 5],
                        borderWidth: 1,
                        pointRadius: 0
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        title: {
                            text: '% Acertos'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Mês'
                        }
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y.toFixed(2) + '%';
                                }
                                return label;
                            }
                        }
                    }
                }
            }
        });
    }

    //Initialize with default filters
    document.addEventListener('DOMContentLoaded', () => {
        const yearSelect = document.getElementById('yearFilter');
        const disciplineSelect = document.getElementById('disciplineFilter');

        //Load initial data
        updateChart(yearSelect.value, disciplineSelect.value);

        //Add event listeners for filters
        yearSelect.addEventListener('change', () => {
            updateChart(yearSelect.value, disciplineSelect.value);
        });

        disciplineSelect.addEventListener('change', () => {
            updateChart(yearSelect.value, disciplineSelect.value);
        });
    });

    return element;
}

export default PerformancePage;