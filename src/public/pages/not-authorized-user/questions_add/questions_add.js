const root = document.querySelector('.root')

const element = document.createElement("div");

element.innerHTML = `
<h1>Adicionar Nova Questão</h1>
    <form>
        <div class="form-group">
            <label>Vestibular:</label>
            <select>
                <option>ENEM</option>
                <option>FUVEST</option>
                <option>Unicamp</option>
            </select>
        </div>

        <div class="form-group">
            <label>Ano:</label>
            <select>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
            </select>
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

        <!-- Alternativas -->
        <div class="alternativa-linha">
            <input type="radio" name="resposta">
            <input type="text" placeholder="Resposta 1" style="flex-grow: 1;">
            <button class="botao-imagem">Imagem</button>
        </div>
        <div class="alternativa-linha">
            <input type="radio" name="resposta">
            <input type="text" placeholder="Resposta 2" style="flex-grow: 1;">
            <button class="botao-imagem">Imagem</button>
        </div>
        <div class="alternativa-linha">
            <input type="radio" name="resposta">
            <input type="text" placeholder="Resposta 3" style="flex-grow: 1;">
            <button class="botao-imagem">Imagem</button>
        </div>
        <div class="alternativa-linha">
            <input type="radio" name="resposta">
            <input type="text" placeholder="Resposta 4" style="flex-grow: 1;">
            <button class="botao-imagem">Imagem</button>
        </div>

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



root.appendChild(element)
// export default element;