import Header from "/components/headerWithMenu.js";

function showQuestionModal(questionId) {
    
    const modal = document.createElement('div');
    modal.id = 'questionModal';
    modal.style.display = 'block';
    modal.style.position = 'fixed';
    modal.style.zIndex = '1';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.overflow = 'auto';
    modal.style.backgroundColor = 'rgba(0,0,0,0.4)';
    
    const modalContent = document.createElement('div');
    modalContent.style.backgroundColor = '#fefefe';
    modalContent.style.margin = '5% auto';
    modalContent.style.padding = '20px';
    modalContent.style.border = '1px solid #888';
    modalContent.style.width = '80%';
    modalContent.style.maxWidth = '800px';
    modalContent.style.borderRadius = '8px';
    modalContent.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.color = '#aaa';
    closeBtn.style.float = 'right';
    closeBtn.style.fontSize = '28px';
    closeBtn.style.fontWeight = 'bold';
    closeBtn.style.cursor = 'pointer';
    
    closeBtn.onmouseover = () => closeBtn.style.color = '#000';
    closeBtn.onmouseout = () => closeBtn.style.color = '#aaa';
    
    const modalHeader = document.createElement('div');
    modalHeader.style.padding = '10px 0';
    modalHeader.style.borderBottom = '1px solid #eee';
    modalHeader.style.marginBottom = '20px';
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = 'Detalhes da Questão';
    modalTitle.style.fontSize = '24px';
    modalTitle.style.margin = '0';
    
    const modalBody = document.createElement('div');
    modalBody.style.padding = '10px 0';
    
    const questionContent = document.createElement('div');
    questionContent.innerHTML = `<p><strong>ID da Questão:</strong> ${questionId}</p>`;
    
    modalHeader.appendChild(modalTitle);
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalHeader);
    modalBody.appendChild(questionContent);
    modalContent.appendChild(modalBody);
    modal.appendChild(modalContent);
    
    document.body.appendChild(modal);
    
    function closeModal() {
        document.body.removeChild(modal);
    }
    
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
    
    return closeModal;
}

const element = document.createDocumentFragment();

function renderSearchPage() {
    element.appendChild(Header());

    const container = document.createElement("div");
    container.innerHTML = `
        <h1>Buscar questões</h1>
        <div class="search-container">
            <input type="text" placeholder="Questão">
            <select>
                <option value="" selected>Ano</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
            </select>
            <select>
                <option value="" selected>Área</option>
                <option value="matematica">Matemática</option>
                <option value="portugues">Português</option>
                <option value="ciencias">Ciências</option>
                <option value="historia">História</option>
            </select>
            <select>
                <option value="" selected>Assunto</option>
                <option value="algebra">Álgebra</option>
                <option value="geometria">Geometria</option>
                <option value="literatura">Literatura</option>
                <option value="fisica">Física</option>
            </select>
            <select>
                <option value="" selected>Nivel da questão</option>
                <option value="1">⭐</option>
                <option value="2">⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
            </select>
        </div>
        <button class="search-button">Buscar</button>
        <div class="results">
    <div class="question-item" data-id='1'>
        <div class="question-title">Questão sobre teorema de Pitágoras e suas aplicações em geometria espacial</div>
        <div class="tags">
            <span class="tag tag-ano">2023</span>
            <span class="tag tag-area">Matemática</span>
            <span class="tag tag-assunto">Geometria</span>
            <span class="tag star-emoji">⭐</span>
        </div>
    </div>
    <div class="question-item" data-id='2'>
        <div class="question-title">Análise do movimento modernista brasileiro com enfoque na Semana de Arte Moderna de 1922</div>
        <div class="tags">
            <span class="tag tag-ano">2022</span>
            <span class="tag tag-area">História</span>
            <span class="tag tag-assunto">Literatura</span>
            <span class="tag star-emoji">⭐⭐</span>
        </div>
    </div>
    <div class="question-item" data-id='3'>
        <div class="question-title">Cálculo estequiométrico envolvendo reações de combustão completa e incompleta de hidrocarbonetos</div>
        <div class="tags">
            <span class="tag tag-ano">2021</span>
            <span class="tag tag-area">Ciências</span>
            <span class="tag tag-assunto">Química</span>
            <span class="tag star-emoji">⭐⭐⭐</span>
        </div>
    </div>
</div>
    `;

    const questionItems = container.querySelectorAll(".question-item");
    questionItems.forEach(item => {
        item.addEventListener('click', function() {
            showQuestionModal(this.dataset.id);
        });
    });

    element.appendChild(container);
}

renderSearchPage();

export default element;
