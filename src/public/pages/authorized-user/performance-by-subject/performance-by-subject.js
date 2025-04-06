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

    //Feedback
    const feedbackContainer = document.createElement("div");
    feedbackContainer.className = "feedback-container";
    main.appendChild(feedbackContainer);

    //Suggestions
    const suggestionsBox = document.createElement("div");
    suggestionsBox.className = "suggestion-box";
    feedbackContainer.appendChild(suggestionsBox);

    //Medals box
    const medalsBox = document.createElement("div");
    medalsBox.className = "medals-box";
    feedbackContainer.appendChild(medalsBox);

    //Medals title
    const medalsTitle = document.createElement("h3");
    medalsTitle.textContent = "Medalhas";
    medalsBox.appendChild(medalsTitle);

    //Medals content
    const medalsContent = document.createElement("div");
    medalsContent.className = "medals-content";
    medalsBox.appendChild(medalsContent);

    //Update feedbacks and medals
    async function updateFeedbackAndMedals(year, month) {
        const data = await loadPerformanceData(year, month);

        if (!data) return;

        //Clear previous content
        suggestionsBox.innerHTML = '';
        medalsContent.innerHTML = '';

        //Check for subject below 70%
        const weakSubjects = [];

        if (data.matematica < 70) weakSubjects.push('Matemática');
        if (data.linguagens < 70) weakSubjects.push('Linguagens');
        if (data[ciencias-humanas] < 70) weakSubjects.push('Ciências Humanas');
        if (data[ciencias-natureza] < 70) weakSubjects.push('Ciências da Natureza');

        //Add suggestions 
        if (weakSubjects.length > 0) {
            const suggestionTitle = document.createElement("h3");
            suggestionTitle.textContent = "Sugestão de Estudo:";
            suggestionsBox.appendChild(suggestionTitle);

            const suggestionList = document.createElement("ul");
            suggestionList.className = "suggestion-list";

            weakSubjects.forEach(subject => {
                const item = document.createElement("li");
                item.textContent = subject;
                suggestionList.appendChild(item);
            });

            suggestionsBox.appendChild(suggestionList);
        }

        //Add medals
        const medals = [
            { subject: 'Matemática', score: data.matematica },
            { subject: 'Linguagens', score: data.linguagens },
            { subject: 'Ciências Humanas', score: data['ciencias-humanas'] },
            { subject: 'Ciências da Natureza', score: data['ciencias-natureza'] }
        ]

        medals.forEach(medal => {
            if (medal.score >= 70) {
                const medalElement = document.createElement("div");
                medalElement.className = "medal";

                const medalIcon = document.createElement("div");
                medalIcon.className = "medal-icon";

                //Medal type by score
                let medalType, medalName;

                if (medal.score >= 90) {
                    medalType = "gold";
                    if (medal.subject === 'Matemática') medalName = "Mestre dos Números";
                    else if (medal.subject === 'Linguagens') medalName = "Gênio da Interpretação";
                    else if (medal.subject === 'Ciências Humanas') medalName = "Sábio da História e Sociedade";
                    else medalName = "Gênio das Ciências";
                } else if (medal.score >= 80) {
                    medalType = "silver";
                    if (medal.subject === 'Matemática') medalName = "Matemático Estratégico";
                    else if (medal.subject === 'Linguagens') medalName = "Mestre das Palavras";
                    else if (medal.subject === 'Ciências Humanas') medalName = "Analista Social";
                    else medalName = "Mente Científica";
                } else {
                    medalType = "bronze";
                    if (medal.subject === 'Matemática') medalName = "Calculista Iniciante";
                    else if (medal.subject === 'Linguagens') medalName = "Leitor Atento";
                    else if (medal.subject === 'Ciências Humanas') medalName = "Explorador do Passado";
                    else medalName = "Aprendiz da Ciência";
                }

                medalIcon.innerHTML = `
                    <svg viewBox="0 0 100 100" class="${medalType}">
                        <circle cx="50" cy="50" r="45" fill="${medalType === 'gold' ? '#FFD700' : medalType === 'silver' ? '#C0C0C0' : '#CD7F32'}"/>
                        <text x="50" y="50" text-anchor="middle" dominant-baseline="middle" fill="white" font-size="40">${medal.subject.charAt(0)}</text>
                        </svg>
                `;

                const medalInfo = document.createElement("div");
                medalInfo.className = "medal-info";

                const medalSubject = document.createElement("div");
                medalSubject.className = "medal-subject";
                medalSubject.textContent = medalSubject;

                const medalNameElement = document.createElement("div");
                medalNameElement.className = "medal-name";
                medalNameElement.textContent = medalName;

                const medalScore = document.createElement("div");
                medalScore.className = "medal-score";
                medalScore.textContent = `${medal.score}%`;

                medalInfo.appendChild(medalSubject);
                medalInfo.appendChild(medalNameElement);
                medalInfo.appendChild(medalScore);

                medalElement.appendChild(medalIcon);
                medalElement.appendChild(medalInfo);

                medalsContent.appendChild(medalElement);
            }
        });

        //Message if no medals
        if (medalsContent.children.length === 0) {
            const noMedals = document.createElement("p");
            noMedals.textContent = "Nenhuma medalha conquistada ainda. Continue estudando!";
            medalsContent.appendChild(noMedals);
        }
    }

    //Filters
    const filtersContainer = document.createElement("div");
    filtersContainer.className = "filters-container";
    main.insertBefore(filtersContainer, chartContainer);

    //Year Filter
    const yearFilterGroup = document.createElement("div");
    yearFilterGroup.className = "filter-group";

    const yearLabel = document.createElement("label");
    yearLabel.textContent = "Ano";
    yearLabel.htmlFor = "yearFilter";

    const yearSelect = document.createElement("select");
    yearSelect.id = "yearFilter";
    yearSelect.className = "filter-select"

    //Add year options
    const years = ['Todos', '2024', '2025', '2026'];
    years.forEach(year => {
        const option = document.createElement("option");
        option.value = year === 'Todos' ? 'all' : year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    yearFilterGroup.appendChild(yearLabel);
    yearFilterGroup.appendChild(yearSelect);
    filtersContainer.appendChild(yearFilterGroup);

    //Month filter 
    const monthFilterGroup = document.createElement("div");
    monthFilterGroup.className = "filter-group";
   
    const monthLabel = document.createElement("label");
    monthLabel.textContent = "Mês";
    monthLabel.htmlFor = "monthFilter";

    const monthSelect = document.createElement("select");
    monthSelect.id = "monthFilter";
    monthSelect.className = "filter-select";

    //Add month options
    const months = [
        {value: 'all', text: "Todos"},
        {value: '1', text: "Janeiro"},
        {value: '2', text: "Fevereiro"},
        {value: '3', text: "Março"},
        {value: '4', text: "Abril"},
        {value: '5', text: "Maio"},
        {value: '6', text: "Junho"},
        {value: '7', text: "Julho"},
        {value: '8', text: "Agosto"},
        {value: '9', text: "Setembro"},
        {value: '10', text: "Outubro"},
        {value: '11', text: "Novembro"},
        {value: '12', text: "Dezembro"}
    ];

    months.forEach(month => {
        const option = document.createElement("option");
        option.value = month.value;
        option.textContent = month.text;
        monthSelect.appendChild(option);
    });

    monthFilterGroup.appendChild(monthLabel);
    monthFilterGroup.appendChild(monthSelect);
    filtersContainer.appendChild(monthFilterGroup);

    //Event listeners for filters
    yearSelect.addEventListener('change', () => {
        updateChart(yearSelect.value, monthSelect.value);
    });

    monthSelect.addEventListener('change', () => {
        updateChart(yearSelect.value, monthSelect.value);
    })

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

        //Update feedback and medals
        updateFeedbackAndMedals(year, month);
    }

    //Initial load
    updateChart('all', 'all');

    //Footer
    element.appendChild(renderFooter());

    return element;
}

export default PerformanceBySubjetPage;