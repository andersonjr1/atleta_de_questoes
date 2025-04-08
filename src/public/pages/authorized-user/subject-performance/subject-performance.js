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
    
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ["Matemática", "Linguagens", "Ciências da Natureza", "Ciências Humanas"],
        datasets: [{
          label: 'Desempenho por Matéria',
          data: [
            data.matematica.percentage,
            data.linguagens.percentage,
            data.cienciasNatureza.percentage,
            data.cienciasHumanas.percentage
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
                const subject = context.label;
                const subjectData = data[subject.toLowerCase().replace(' ', '').replace('ciências', 'ciencias')];
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
    
    const subjectsBelow70 = [];
    
    // Subject percentage
    if (data.matematica.percentage < 70) subjectsBelow70.push("Matemática");
    if (data.linguagens.percentage < 70) subjectsBelow70.push("Linguagens");
    if (data.cienciasNatureza.percentage < 70) subjectsBelow70.push("Ciências da Natureza");
    if (data.cienciasHumanas.percentage < 70) subjectsBelow70.push("Ciências Humanas");
    
    if (subjectsBelow70.length > 0) {
      const title = document.createElement("h3");
      title.textContent = "Sugestão de Estudo:";
      title.style.marginTop = "0";
      suggestionBox.appendChild(title);
      
      const list = document.createElement("ul");
      list.style.paddingLeft = "20px";
      
      subjectsBelow70.forEach(subject => {
        const item = document.createElement("li");
        item.textContent = subject;
        list.appendChild(item);
      });
      
      suggestionBox.appendChild(list);
    } else {
      suggestionBox.innerHTML = "<p>Seu desempenho está acima de 70% em todas as matérias. Parabéns!</p>";
    }
  }

  function renderMedals(data) {
    medalsContent.innerHTML = "";
    
    const medals = [];
    
    //Math
    if (data.matematica.percentage >= 90) {
      medals.push({ subject: "Matemática", medal: "🥇", title: "Mestre dos Números" });
    } else if (data.matematica.percentage >= 80) {
      medals.push({ subject: "Matemática", medal: "🥈", title: "Matemático Estratégico" });
    } else if (data.matematica.percentage >= 70) {
      medals.push({ subject: "Matemática", medal: "🥉", title: "Calculista Iniciante" });
    }
    
    //Languages
    if (data.linguagens.percentage >= 90) {
      medals.push({ subject: "Linguagens", medal: "🥇", title: "Gênio da Interpretação" });
    } else if (data.linguagens.percentage >= 80) {
      medals.push({ subject: "Linguagens", medal: "🥈", title: "Mestre das Palavras" });
    } else if (data.linguagens.percentage >= 70) {
      medals.push({ subject: "Linguagens", medal: "🥉", title: "Leitor Atento" });
    }
    
    //Natural Sciences
    if (data.cienciasNatureza.percentage >= 90) {
      medals.push({ subject: "Ciências da Natureza", medal: "🥇", title: "Gênio das Ciências" });
    } else if (data.cienciasNatureza.percentage >= 80) {
      medals.push({ subject: "Ciências da Natureza", medal: "🥈", title: "Mente Científica" });
    } else if (data.cienciasNatureza.percentage >= 70) {
      medals.push({ subject: "Ciências da Natureza", medal: "🥉", title: "Aprendiz da Ciência" });
    }
    
    //Human Sciences
    if (data.cienciasHumanas.percentage >= 90) {
      medals.push({ subject: "Ciências Humanas", medal: "🥇", title: "Sábio da História e Sociedade" });
    } else if (data.cienciasHumanas.percentage >= 80) {
      medals.push({ subject: "Ciências Humanas", medal: "🥈", title: "Analista Social" });
    } else if (data.cienciasHumanas.percentage >= 70) {
      medals.push({ subject: "Ciências Humanas", medal: "🥉", title: "Explorador do Passado" });
    }
    
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
}

export default SubjectPerformancePage;