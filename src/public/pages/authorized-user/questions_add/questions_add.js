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

    console.log('Alternativas corretas:', dados.alternativas.filter(alt => alt.correta));


    if (
        dados.vestibular === "" || 
        dados.ano === "" || 
        dados.dificuldade === "" ||
        !dados.contexto || 
        dados.alternativas.some(alt => !alt.texto) || 
        !dados.explicacao
    ) {
        exibirMensagem('Preencha todos os campos obrigatórios!', 'erro');
        return false;
    }

    if (
        dados.vestibular === "Selecione o vestibular" || 
        dados.ano === "Selecione o ano" ||
        dados.dificuldade === "Selecione a dificuldade"
    ) {
        exibirMensagem('Selecione opções válidas nos menus suspensos!', 'erro');
        return false;
    }

    if (dados.alternativas.filter(alt => alt.correta).length !== 1) {
        exibirMensagem('Selecione exatamente uma alternativa correta!', 'erro');
        return false;
    }

    if (dados.dificuldade < 1 || dados.dificuldade > 3) {
        exibirMensagem('Selecione um nível de dificuldade entre 1 e 3 estrelas!', 'erro');
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
                    <option value="" disabled selected>Selecione o vestibular</option>
                    <option>ENEM</option>
                </select>
            </div>
            <div class="form-group">
                <label>Ano:</label>
                <select id="ano">
                    <option value="" disabled selected>Selecione o ano</option>
                </select>
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
                <label>Nível de Dificuldade:</label>
                <select id="dificuldade" class="dificuldade-select">
                    <option value="">Selecione uma dificuldade</option>
                    <option value="1">⭐ (Fácil)</option>
                    <option value="2">⭐⭐ (Médio)</option>
                    <option value="3" >⭐⭐⭐ (Difícil)</option>
                </select>
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
            vestibular: form.querySelector('#vestibular').value.trim(),
            ano: form.querySelector('#ano').value.trim(),
            assunto: form.querySelector('#assunto').value.trim(),
            subassunto: form.querySelector('#subassunto').value.trim(),
            nivelDificuldade: parseInt(form.querySelector('#dificuldade').value), 
            contexto: form.querySelector('#contexto').value.trim(),
            alternativas: Array.from(form.querySelectorAll('.alternativa-linha')).map((linha, index) => ({
                texto: linha.querySelector('input[type="text"]').value.trim(),
                correta: linha.querySelector('input[type="radio"]').checked,
                imagem: imagens.alternativas[index] || null
            })),
            explicacao: form.querySelector('#explicacao').value.trim(),
            apoio: form.querySelector('#apoio').value
                .split(',')
                .map(item => item.trim())
                .filter(item => item !== ''),
            imagens: imagens
        };

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
