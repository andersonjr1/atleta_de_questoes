import Header from "/components/headerWithMenu.js";
import { renderFooter } from "/components/footer.js";
import { getCurrentUser } from "/pages/auth.js";

function PerformancePage() {
  const element = document.createElement("div");
  element.style.height = "100vh";
  element.style.display = "flex";
  element.style.flexDirection = "column";

  const header = Header();
  element.appendChild(header);

  const main = document.createElement("main");
  main.style.flexGrow = "1";
  main.style.padding = "20px";
  main.style.display = "flex";
  main.style.flexDirection = "column";
  main.style.alignItems = "center";
  main.style.gap = "20px";

  //Performance chart Section
  const performanceTitle = document.createElement("h1");
  performanceTitle.textContent = "Evolução do Desempenho";
  main.appendChild(performanceTitle);

  //Filters
  const filtersContainer = document.createElement("div");
  filtersContainer.className = "filters";

  //Year Filter
  const yearFilter = document.createElement("select");
  yearFilter.id = "yearFilter";
  yearFilter.innerHTML = `
    <option value="2024">2024</option>
    <option value="2025" selected>2025</option>
    <option value="2026">2026</option>
  `;

  const yearLabel = document.createElement("label");
  yearLabel.textContent = "Ano:";
  yearLabel.appendChild(yearFilter);
  filtersContainer.appendChild(yearLabel);

  //Discipline filter
  const subjectFilter = document.createElement("select");
  subjectFilter.id = "subjectFilter";
  subjectFilter.innerHTML = `
    <option value="Todas" selected>Todas</option>
    <option value="Matemática">Matemática</option>
    <option value="Linguagens">Linguagens</option>
    <option value="Ciências da Natureza">Ciências da Natureza</option>
    <option value="Ciências Humanas">Ciências Humanas</option>
  `;

  const subjectLabel = document.createElement("label");
  subjectLabel.textContent = "Matéria:";
  subjectLabel.appendChild(subjectFilter);
  filtersContainer.appendChild(subjectLabel);

  main.appendChild(filtersContainer);

  //Chart container
  const chartContainer = document.createElement("div");
  chartContainer.className = "chart-container";
  chartContainer.id = "performanceChartContainer";
  chartContainer.style.height = "400px";
  main.appendChild(chartContainer);

  //Subject Performance Section
  const subjectPerformanceSection = document.createElement("div");
  subjectPerformanceSection.className = "subject-performance-section";

  const subjectTitle = document.createElement("h1");
  subjectTitle.textContent = "Desempenho por Matéria";
  subjectPerformanceSection.appendChild(subjectTitle);

  //Subject Filters
  const subjectFiltersContainer = document.createElement("div");
  subjectFiltersContainer.className = "filters";

  //Year Filter for subject performance
  const subjectYearFilter = document.createElement("select");
  subjectYearFilter.id = "subjectYearFilter";
  subjectYearFilter.innerHTML = `
    <option value="2024">2024</option>
    <option value="2025" selected>2025</option>
    <option value="2026">2026</option>
  `;

  const subjectYearLabel = document.createElement("label");
  subjectYearLabel.textContent = "Ano:";
  subjectYearLabel.appendChild(subjectYearFilter);
  subjectFiltersContainer.appendChild(subjectYearLabel);

  //Month Filter
  const monthFilter = document.createElement("select");
  monthFilter.id = "monthFilter";
  monthFilter.innerHTML = `
    <option value="" selected>Todos</option>
    <option value="1">Janeiro</option>
    <option value="2">Fevereiro</option>
    <option value="3">Março</option>
    <option value="4">Abril</option>
    <option value="5">Maio</option>
    <option value="6">Junho</option>
    <option value="7">Julho</option>
    <option value="8">Agosto</option>
    <option value="9">Setembro</option>
    <option value="10">Outubro</option>
    <option value="11">Novembro</option>
    <option value="12">Dezembro</option>
  `;

  const monthLabel = document.createElement("label");
  monthLabel.textContent = "Mês:";
  monthLabel.appendChild(monthFilter);
  subjectFiltersContainer.appendChild(monthLabel);

  subjectPerformanceSection.appendChild(subjectFiltersContainer);

  //Subject Chart Container
  const subjectChartContainer = document.createElement("div");
  subjectChartContainer.id = "subjectChartContainer";
  subjectChartContainer.className = "chart-container";
  subjectChartContainer.style.height = "400px";
  subjectPerformanceSection.appendChild(subjectChartContainer);

  //Badges suggestions container 
  const bottomContainer = document.createElement("div");
  bottomContainer.className = "bottom-container";

  //Study suggestion box 
  const suggestionBox = document.createElement("div");
  suggestionBox.id = "suggestionBox";

  const suggestionTitle = document.createElement("h3");
  suggestionTitle.textContent = "Sugestão de Estudo:";
  suggestionBox.appendChild(suggestionTitle);

  bottomContainer.appendChild(suggestionBox);

  //Medals box
  const medalsBox = document.createElement("div");
  medalsBox.id = "medalsBox";

  const medalsTitle = document.createElement("h3");
  medalsTitle.textContent = "Medalhas";
  medalsBox.appendChild(medalsTitle);
  
  const medalsContent = document.createElement("div");
  medalsContent.id = "medalsContent";
  medalsBox.appendChild(medalsContent);
  
  bottomContainer.appendChild(medalsBox);
  
  subjectPerformanceSection.appendChild(bottomContainer);
  main.appendChild(subjectPerformanceSection);

  element.appendChild(main);

  const footer = renderFooter();
  element.appendChild(footer);

  //Load chart
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = () => {
    loadPerformanceData();
    loadSubjectPerformanceData();
  };
  document.head.appendChild(script);

  //Event listeners
  yearFilter.addEventListener("change", loadPerformanceData);
  subjectFilter.addEventListener("change", loadPerformanceData);
  subjectYearFilter.addEventListener("change", loadSubjectPerformanceData);
  monthFilter.addEventListener("change", loadSubjectPerformanceData);

  //Performance chart functions
  async function loadPerformanceData() {
    const year = yearFilter.value;
    const discipline = mapDisciplineName(subjectFilter.value);
    const user = getCurrentUser();

    try {
      const response = await fetch(`http://localhost:4000/api/performance?year=${year}&discipline=${discipline}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (!response.ok) throw new Error("Erro ao carregar dados");
      
      const performanceData = await response.json();
      renderPerformanceChart(performanceData);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  function mapDisciplineName(displayName) {
    const mapping = {
        'Todas': '',
        'Matemática': 'matematica',
        'Linguagens': 'linguagens',
        'Ciências da Natureza': 'ciencias-natureza',
        'Ciências Humanas': 'ciencias-humanas'
    };
    return mapping[displayName] || '';
  }

  function renderPerformanceChart(data) {
    if (typeof Chart === 'undefined') {
        console.error('Chart.js não foi carregado corretamente');
        return;
    }
    
    chartContainer.innerHTML = "";
    
    const canvas = document.createElement("canvas");
    canvas.id = "performanceChart";
    canvas.width = chartContainer.offsetWidth;
    canvas.height = chartContainer.offsetHeight;
    chartContainer.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    
    const totalCorrect = data.reduce((sum, month) => sum + month.correct, 0);
    const totalQuestions = data.reduce((sum, month) => sum + month.total, 0);
    const averagePercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;
    const expectedPercentage = 70; 
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        datasets: [
          {
            label: 'Seu desempenho',
            data: data.map(m => m.percentage),
            borderColor: '#3D52A0',
            backgroundColor: 'rgba(61, 82, 160, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3
          },
          {
            label: 'Média esperada (70%)',
            data: Array(12).fill(expectedPercentage),
            borderColor: '#4CAF50',
            borderWidth: 1,
            borderDash: [5, 5],
            fill: false,
            tooltip: {
                enabled: false
            }
          },
          {
            label: 'Sua média',
            data: Array(12).fill(averagePercentage),
            borderColor: '#FF9800',
            borderWidth: 1,
            borderDash: [5, 5],
            fill: false,
            tooltip: {
                enabled: false
            }
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
              display: true,
              text: 'Percentual de Acertos (%)'
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
                        if (context.datasetIndex === 0) {
                            const monthData = data[context.dataIndex];
                            return [
                                `Acertos: ${monthData.correct}/${monthData.total}`,
                                `Percentual: ${monthData.percentage}%`
                            ];
                        }
                        return [];
                    }
                }
            }
        }
      }
    });
  }

  //Subject Performance Functions
  async function loadSubjectPerformanceData() {
    const year = subjectYearFilter.value;
    const month = monthFilter.value;
    const user = getCurrentUser();

    try {
      const response = await fetch(`http://localhost:4000/api/subject-performance?year=${year}&month=${month}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (!response.ok) throw new Error("Erro ao carregar dados");
      
      const performanceData = await response.json();
      renderSubjectPerformanceChart(performanceData);
      renderSuggestions(performanceData);
      renderMedals(performanceData);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  function renderSubjectPerformanceChart(data) {
    subjectChartContainer.innerHTML = "";
    
    const canvas = document.createElement("canvas");
    canvas.id = "subjectPerformanceChart";
    canvas.width = subjectChartContainer.offsetWidth;
    canvas.height = subjectChartContainer.offsetHeight;
    subjectChartContainer.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");

    const subjectMapping = {
        "Matemática": "matematica",
        "Linguagens": "linguagens",
        "Ciências da Natureza": "ciencias-natureza",
        "Ciências Humanas": "ciencias-humanas"
    };
    
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ["Matemática", "Linguagens", "Ciências da Natureza", "Ciências Humanas"],
        datasets: [{
          label: 'Desempenho por Matéria',
          data: [
            data[subjectMapping["Matemática"]].percentage,
            data[subjectMapping["Linguagens"]].percentage,
            data[subjectMapping["Ciências da Natureza"]].percentage,
            data[subjectMapping["Ciências Humanas"]].percentage
          ],
          backgroundColor: 'rgba(61, 82, 160, 0.2)',
          borderColor: '#3D52A0',
          borderWidth: 2,
          pointBackgroundColor: '#3D52A0',
          pointRadius: 5
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const subjectName = context.label;
                        const dbKey = subjectMapping[subjectName];
                        const subjectData = data[dbKey];
                        return [
                            `Acertos: ${subjectData.correct}/${subjectData.total}`,
                            `Percentual: ${subjectData.percentage}%`
                        ];
                    }
                }
            }
        }
      }
    });
  }

  function renderSuggestions(data) {
    suggestionBox.innerHTML = "";

    const title = document.createElement("h3");
    title.textContent = "Sugestão de Estudo:";
    suggestionBox.appendChild(title);

    const subjectMapping = {
        "Matemática": "matematica",
        "Linguagens": "linguagens",
        "Ciências da Natureza": "ciencias-natureza",
        "Ciências Humanas": "ciencias-humanas"
    };

    const totalQuestions = Object.values(subjectMapping).reduce((sum, dbName) => {
        return sum + (data[dbName]?.total || 0);
    }, 0);
    
    if (totalQuestions === 0) {
        const message = document.createElement("p");
        message.textContent = "Nenhuma questão respondida no período escolhido";
        suggestionBox.appendChild(message);
        return;
    }
    
    const subjectsBelow70 = [];
    
    Object.entries(subjectMapping).forEach(([displayName, dbName]) => {
        if (data[dbName] && data[dbName].total > 0 && data[dbName].percentage < 70) {
            subjectsBelow70.push(displayName);
        }
    });
    
    if (subjectsBelow70.length > 0) {
      const list = document.createElement("ul");
      list.style.paddingLeft = "20px";
      
      subjectsBelow70.forEach(subject => {
        const item = document.createElement("li");
        item.textContent = subject;
        list.appendChild(item);
      });
      
      suggestionBox.appendChild(list);
    } else {
        const message = document.createElement("p");
        message.textContent = "Seu desempenho está acima de 70% em todas as matérias. Parabéns!";
        suggestionBox.appendChild(message);
    }
  }

  function renderMedals(data) {
    medalsContent.innerHTML = "";

    const subjectMapping = {
        "Matemática": "matematica",
        "Linguagens": "linguagens",
        "Ciências da Natureza": "ciencias-natureza",
        "Ciências Humanas": "ciencias-humanas"
    };

    const totalQuestions = Object.values(subjectMapping).reduce((sum, dbName) => {
        return sum + (data[dbName]?.total || 0);
    }, 0);
    
    if (totalQuestions === 0) {
        medalsContent.innerHTML = "<p>Nenhuma questão respondida no período escolhido</p>";
        return;
    }
    
    const medals = [];
    
    const addMedal = (displayName, dbName) => {
        const percentage = data[dbName]?.percentage || 0;
        
        if (percentage >= 90) {
            medals.push({ subject: displayName, medal: "🥇", title: getMedalTitle(displayName, "gold") });
        } else if (percentage >= 80) {
            medals.push({ subject: displayName, medal: "🥈", title: getMedalTitle(displayName, "silver") });
        } else if (percentage >= 70) {
            medals.push({ subject: displayName, medal: "🥉", title: getMedalTitle(displayName, "bronze") });
        }
    };
    
    Object.entries(subjectMapping).forEach(([displayName, dbName]) => {
        addMedal(displayName, dbName);
    });
    
    if (medals.length > 0) {
      medals.forEach(medal => {
        const medalElement = document.createElement("div");
        medalElement.style.display = "flex";
        medalElement.style.alignItems = "center";
        medalElement.style.gap = "10px";
        medalElement.style.marginBottom = "10px";
        
        const medalIcon = document.createElement("span");
        medalIcon.textContent = medal.medal;
        medalIcon.style.fontSize = "24px";
        
        const medalText = document.createElement("div");
        medalText.innerHTML = `<strong>${medal.subject}</strong>: ${medal.title}`;
        
        medalElement.appendChild(medalIcon);
        medalElement.appendChild(medalText);
        medalsContent.appendChild(medalElement);
      });
    } else {
      medalsContent.innerHTML = "<p>Continue estudando para conquistar suas primeiras medalhas!</p>";
    }
  }

  function getMedalTitle(subject, level) {
    const titles = {
        "Matemática": {
            gold: "Mestre dos Números",
            silver: "Matemático Estratégico",
            bronze: "Calculista Iniciante"
        },
        "Linguagens": {
            gold: "Gênio da Interpretação",
            silver: "Mestre das Palavras",
            bronze: "Leitor Atento"
        },
        "Ciências da Natureza": {
            gold: "Gênio das Ciências",
            silver: "Mente Científica",
            bronze: "Aprendiz da Ciência"
        },
        "Ciências Humanas": {
            gold: "Sábio da História e Sociedade",
            silver: "Analista Social",
            bronze: "Explorador do Passado"
        }
    };
    
    return titles[subject][level];
  }

  return element;
}

export default PerformancePage;