let imagens = {
    questao: [],
    alternativas: []
};

const exibirMensagem = (mensagem, tipo = 'sucesso') => {
    containerMensagem.textContent = mensagem;
    containerMensagem.style.display = 'block';
    containerMensagem.className = `mensagem-${tipo}`;
    containerMensagem.focus();
    setTimeout(() => containerMensagem.style.display = 'none', 5000);
};

const validarFormulario = (dados) => {
    if (!dados.vestibular || !dados.ano || !dados.contexto || 
        dados.alternativas.some(alt => !alt.texto) || !dados.explicacao) {
        exibirMensagem('Preencha todos os campos obrigatórios!', 'erro');
        return false;
    }
    
    if (dados.alternativas.filter(alt => alt.correta).length !== 1) {
        exibirMensagem('Selecione exatamente uma alternativa correta!', 'erro');
        return false;
    }
    
    return true;
};

const criarElementoFormulario = () => {
    const element = document.createElement("div");
    element.classList.add('root')
    element.innerHTML = `
        <h1>Adicionar Nova Questão</h1>
        <form id="form-questao">
            <div class="form-group">
                <label>Vestibular:</label>
                <select id="vestibular">
                    <option>ENEM</option>
                </select>
            </div>
            <div class="form-group">
                <label>Ano:</label>
                <select id="ano"></select>
            </div>
            <div class="form-group">
                <label>Assunto:</label>
                <input type="text" id="assunto">
            </div>
            <div class="form-group">
                <label>Sub-Assunto:</label>
                <input type="text" id="subassunto">
            </div>
            <div class="form-group">
                <label>Nível de Dificuldade (1-5):</label>
                <input type="number" min="1" max="5" id="dificuldade">
            </div>
            <div class="form-group">
                <label>Contexto da Questão:</label>
                <textarea rows="4" id="contexto"></textarea>
            </div>
            <div class="form-group">
                <button type="button" class="botao-imagem" id="botao-imagem-questao">Selecionar Imagem da Questão</button>
            </div>
            <div class="form-group">
                <label>Texto das Alternativas:</label>
                <input type="text" id="texto-alternativas">
            </div>
            ${[1, 2, 3, 4, 5].map(num => `
                <div class="alternativa-linha">
                    <input type="radio" name="resposta" id="resposta-${num}" value="${num}">
                    <input type="text" placeholder="Resposta ${num}" id="alternativa-${num}" style="flex-grow: 1;">
                    <button type="button" class="botao-imagem" id="botao-imagem-alt-${num}">Imagem</button>
                </div>
            `).join('')}
            <div class="form-group">
                <label>Explicação da Alternativa Correta:</label>
                <textarea rows="3" id="explicacao"></textarea>
            </div>
            <div class="form-group">
                <label>Apoio (separado por vírgula):</label>
                <input type="text" id="apoio">
            </div>
            <button type="submit" class="submit-btn">Adicionar Questão</button>
        </form>
    `;
    return element;
};

const preencherAnos = (selectAno) => {
    for (let ano = 2023; ano >= 2009; ano--) {
        const option = document.createElement('option');
        option.value = ano;
        option.textContent = ano;
        selectAno.appendChild(option);
    }
};

const configurarFormulario = (form) => {
    const selectAno = form.querySelectorAll('select')[1];
    preencherAnos(selectAno);
    
    const containerMensagem = document.createElement('div');
    containerMensagem.style.display = 'none';
    form.parentNode.insertBefore(containerMensagem, form.nextSibling);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const dados = {
            vestibular: form.querySelector('select').value,
            ano: selectAno.value,
            assunto: form.querySelector('#assunto').value,
            subassunto: form.querySelector('#subassunto').value,
            nivelDificuldade: form.querySelector('input[type="number"]').value,
            contexto: form.querySelector('#contexto').value,
            alternativas: [],
            explicacao: form.querySelector('#explicacao').value,
            apoio: form.querySelector('#apoio').value.split(','),
            imagens: imagens
        };

        document.querySelectorAll('.alternativa-linha').forEach((linha, index) => {
            dados.alternativas.push({
                texto: linha.querySelector('input[type="text"]').value,
                correta: linha.querySelector('input[type="radio"]').checked,
                imagem: imagens.alternativas[index] || null
            });
        });

        if (!validarFormulario(dados)) return;

        console.log(dados);
    });
};

const element = criarElementoFormulario();
const form = element.querySelector("form");
configurarFormulario(form);

form.querySelectorAll('.botao-imagem').forEach((botao, index) => {
   
    botao.addEventListener('click', (e) => {
        e.preventDefault();
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (event) => {
            const arquivo = event.target.files[0];
            if (arquivo) {
                if (index === 0) { // Imagem da questão
                    imagens.questao.push(arquivo);

                    let labelTitle = document.createElement('label');
                    labelTitle.textContent = arquivo.name;
                    
                    labelTitle.dataset.id = imagens.questao.length - 1; 
                    
                    let removeBtn = document.createElement('button');
                    removeBtn.innerHTML = '&times;'; 
                    removeBtn.style.marginLeft = '10px';
                    removeBtn.style.cursor = 'pointer';
                    
                    removeBtn.addEventListener('click', function() {
                        const id = parseInt(this.parentElement.dataset.id);
                        imagens.questao.splice(id, 1);
                        
                        this.parentElement.remove();
                        
                        document.querySelectorAll('label[data-id]').forEach((label, index) => {
                            label.dataset.id = index;
                        });
                    });
                    
                    labelTitle.appendChild(removeBtn);
                    
                    botao.before(labelTitle);
                } else { // Imagens das alternativas
                    imagens.alternativas[index - 1] = arquivo;
                    botao.style.maxWidth = "100px"
                    botao.textContent = arquivo.name
                }

                botao.style.textOverflow = 'ellipsis';

                exibirMensagem('Imagem carregada com sucesso!');
            }
        };
        
        input.click();
    });
});

const containerMensagem = document.createElement('div');
containerMensagem.style.display = 'none';
form.parentNode.insertBefore(containerMensagem, form.nextSibling);

export default element;
