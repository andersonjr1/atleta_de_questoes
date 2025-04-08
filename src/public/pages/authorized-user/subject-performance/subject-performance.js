import Header from "/components/headerWithMenu.js";
import { renderFooter } from "/components/footer.js";
import { getCurrentUser } from "/pages/auth.js";

function SubjectPerformancePage() {
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

  const title = document.createElement("h1");
  title.textContent = "Desempenho por Matéria";
  main.appendChild(title);

  //Filters
  const filtersContainer = document.createElement("div");
  filtersContainer.style.display = "flex";
  filtersContainer.style.gap = "20px";
  filtersContainer.style.marginBottom = "20px";
  filtersContainer.style.flexWrap = "wrap";
  filtersContainer.style.justifyContent = "center";

  //YearFilter
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
  filtersContainer.appendChild(monthLabel);

  main.appendChild(filtersContainer);

  //Chart Container
  const chartContainer = document.createElement("div");
  chartContainer.id = "chartContainer";
  chartContainer.style.width = "90%";
  chartContainer.style.maxWidth = "800px";
  chartContainer.style.height = "400px";
  chartContainer.style.margin = "0 auto";
  main.appendChild(chartContainer);

  //Badges suggestions container 
  const bottomContainer = document.createElement("div");
  bottomContainer.style.display = "flex";
  bottomContainer.style.gap = "20px";
  bottomContainer.style.width = "90%";
  bottomContainer.style.maxWidth = "800px";
  bottomContainer.style.margin = "20px auto";

  //Study suggestion box 
  const suggestionBox = document.createElement("div");
  suggestionBox.id = "suggestionBox";
  suggestionBox.style.flex = "1";
  suggestionBox.style.padding = "15px";
  suggestionBox.style.borderRadius = "8px";
  suggestionBox.style.backgroundColor = "#f8f9fa";
  suggestionBox.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  bottomContainer.appendChild(suggestionBox);

  //Medals box
  const medalsBox = document.createElement("div");
  medalsBox.id = "medalsBox";
  medalsBox.style.flex = "1";
  medalsBox.style.padding = "15px";
  medalsBox.style.borderRadius = "8px";
  medalsBox.style.backgroundColor = "#f8f9fa";
  medalsBox.style.boxShadow = "0 2px 5px rgba(0,0,0,0.1)";
  
  const medalsTitle = document.createElement("h3");
  medalsTitle.textContent = "Medalhas";
  medalsTitle.style.marginTop = "0";
  medalsBox.appendChild(medalsTitle);
  
  const medalsContent = document.createElement("div");
  medalsContent.id = "medalsContent";
  medalsBox.appendChild(medalsContent);
  
  bottomContainer.appendChild(medalsBox);
  
  main.appendChild(bottomContainer);
  element.appendChild(main);

  const footer = renderFooter();
  element.appendChild(footer);

  //Chart load
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = () => {
    loadPerformanceData();
  };
  document.head.appendChild(script);

  //Filters Event Listeners 
  yearFilter.addEventListener("change", loadPerformanceData);
  monthFilter.addEventListener("change", loadPerformanceData);

  async function loadPerformanceData() {
    const year = yearFilter.value;
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
      renderChart(performanceData);
      renderSuggestions(performanceData);
      renderMedals(performanceData);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  function renderChart(data) {
    chartContainer.innerHTML = "";
    
    const canvas = document.createElement("canvas");
    canvas.id = "performanceChart";
    canvas.width = chartContainer.offsetWidth;
    canvas.height = chartContainer.offsetHeight;
    chartContainer.appendChild(canvas);
    
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
    title.style.marginTop = "0";
    suggestionBox.appendChild(title);

    const subjectMapping = {
        "Matemática": "matematica",
        "Linguagens": "linguagens",
        "Ciências da Natureza": "ciencias-natureza",
        "Ciências Humanas": "ciencias-humanas"
    };

    //Verify if there is any answered questions
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
    
    // Subject percentage
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

    //Verify if there is any answered question
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
    
    //Add medals for each subject
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

  return element;

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
}

export default SubjectPerformancePage;