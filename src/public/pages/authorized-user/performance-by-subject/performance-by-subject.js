import Header from "/components/headerWithMenu.js";
import { renderFooter } from "/components/footer.js";
import Chart from 'chart.js/auto';
import { urlencoded } from "express";

function PerformanceBySubjetPage() {
    const element = document.createElement("div");
    element.style.height = "100vh";
    element.style.display = "flex";
    element.style.flexDirection = "column";

    //Header
    element.appendChild(Header());

    //Main
    const main = document.createElement("main");
    main.className = "performance-container";
    element.appendChild(main);

    //Title
    const title = document.createElement("h1");
    title.textContent = "Desempenho por Matéria";
    title.className = "performance-title";
    main.appendChild("title");

    //Chart
    const chartContainer = document.createElement("div");
    chartContainer.className = "chart-container";
    main.appendChild(chartContainer);

    //Canvas for chart
    const canvas = document.createElement("canvas");
    canvas.id = "performanceChart";
    chartContainer.appendChild(canvas);

    //Initialize chart
    let performanceChart = null;

    async function loadPerformanceData(year = 'all', month = 'all') {
        try {
            const url = new URL('/api/performance/subjects', window.location.origin);
            url.searchParams.append('year', year);
            url.searchParams.append('month', month);
    
            const response = await fetch(url, {
                credential: 'include'
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            return await response.json();
        } catch(error) {
            console.error('Error loading performance data:', error);
            return null;
        }
    }

    async function updateChart(year, month) {
        const data = await loadPerformanceData(year, month);

        if (!data) {
            return;
        }

        const ctx = document.getElementById('performanceChart').getContext('2d');

        if (performanceChart) {
            performanceChart.destroy();
        }

        performanceChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Matemática', 'Linguagens', 'Ciências Humanas', 'Ciências da Natureza'],
                datasets: [{
                    label: 'Percentual de Acertos',
                    data: [
                        data.matematica || 0,
                        data.linguagens || 0,
                        data['ciencias-humanas'] || 0,
                        data['ciencias-natureza'] || 0
                    ],
                    backgoundColor: 'rgba(59, 89, 152, 0.2)',
                    borderColor: 'rgba(59, 89, 152, 1)',
                    pointRadius: 4
                }]
            },
            options: {
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100,
                        ticks: {
                            stepSize: 20
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: ${context.raw}%`;
                            }
                        }
                    }
                }
            }
        });
    }

    //Initial load
    updateChart('all', 'all');

    //Footer
    element.appendChild(renderFooter());

    return element;
}

export default PerformanceBySubjetPage;