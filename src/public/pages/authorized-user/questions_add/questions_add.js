let imagens = {
    questao: null,
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
    element.innerHTML = `
        <h1>Adicionar Nova Questão</h1>
        <form>
            <div class="form-group">
                <label>Vestibular:</label>
                <select>
                    <option>ENEM</option>
                </select>
            </div>
            <div class="form-group">
                <label>Ano:</label>
                <select></select>
            </div>
            <div class="form-group">
                <label>Assunto:</label>
                <input type="text">
            </div>
            <div class="form-group">
                <label>Nível de Dificuldade (1-5):</label>
                <input type="number" min="1" max="5">
            </div>
            <div class="form-group">
                <label>Contexto da Questão:</label>
                <textarea rows="4"></textarea>
            </div>
            <div class="form-group">
                <button class="botao-imagem">Selecionar Imagem da Questão</button>
            </div>
            <div class="form-group">
                <label>Texto das Alternativas:</label>
                <input type="text">
            </div>
            ${[1, 2, 3, 4].map(num => `
                <div class="alternativa-linha">
                    <input type="radio" name="resposta">
                    <input type="text" placeholder="Resposta ${num}" style="flex-grow: 1;">
                    <button class="botao-imagem">Imagem</button>
                </div>
            `).join('')}
            <div class="form-group">
                <label>Explicação da Alternativa Correta:</label>
                <textarea rows="3"></textarea>
            </div>
            <div class="form-group">
                <label>Apoio (separado por vírgula):</label>
                <input type="text">
            </div>
            <button class="submit-btn">Adicionar Questão</button>
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
            assunto: form.querySelector('input[type="text"]').value,
            nivelDificuldade: form.querySelector('input[type="number"]').value,
            contexto: form.querySelector('textarea').value,
            alternativas: [],
            explicacao: form.querySelectorAll('textarea')[1].value,
            apoio: form.querySelectorAll('input[type="text"]')[1].value.split(','),
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
                    imagens.questao = arquivo;
                    
                } else { // Imagens das alternativas
                    imagens.alternativas[index - 1] = arquivo;
                }

                botao.textContent = arquivo.name

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
