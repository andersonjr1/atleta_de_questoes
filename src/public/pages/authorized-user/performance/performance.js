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

  const title = document.createElement("h1");
  title.textContent = "Evolução do Desempenho";
  main.appendChild(title);

  //Filters
  const filtersContainer = document.createElement("div");
  filtersContainer.style.display = "flex";
  filtersContainer.style.gap = "20px";
  filtersContainer.style.marginBottom = "20px";

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
  chartContainer.id = "chartContainer";
  chartContainer.style.width = "90%";
  chartContainer.style.maxWidth = "800px";
  chartContainer.style.height = "400px";
  chartContainer.style.margin = "0 auto";
  main.appendChild(chartContainer);

  element.appendChild(main);

  const footer = renderFooter();
  element.appendChild(footer);

  //Initial data load
  loadPerformanceData();

  // Filters Event listeners
  yearFilter.addEventListener("change", loadPerformanceData);
  subjectFilter.addEventListener("change", loadPerformanceData);

  async function loadPerformanceData() {
    const year = yearFilter.value;
    const discipline = subjectFilter.value;
    const user = getCurrentUser();

    try {
      const response = await fetch(`http://localhost:4000/api/performance?year=${year}&discipline=${discipline}`, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      });
      
      if (!response.ok) throw new Error("Erro ao carregar dados");
      
      const performanceData = await response.json();
      renderChart(performanceData);
    } catch (error) {
      console.error("Erro:", error);
    }
  }

  function renderChart(data) {
    //Erase previous chart
    chartContainer.innerHTML = "";
    
    //Create chart canvas
    const canvas = document.createElement("canvas");
    canvas.id = "performanceChart";
    canvas.width = chartContainer.offsetWidth;
    canvas.height = chartContainer.offsetHeight;
    chartContainer.appendChild(canvas);
    
    //Chart setup
    const ctx = canvas.getContext("2d");
    
    //Average percentage
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
            fill: false
          },
          {
            label: 'Sua média',
            data: Array(12).fill(averagePercentage),
            borderColor: '#FF9800',
            borderWidth: 1,
            borderDash: [5, 5],
            fill: false
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
                const monthData = data[context.dataIndex];
                return [
                  `Acertos: ${monthData.correct}/${monthData.total}`,
                  `Percentual: ${monthData.percentage}%`
                ];
              }
            }
          }
        }
      }
    });
  }

  return element;
}

export default PerformancePage;