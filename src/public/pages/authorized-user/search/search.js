const element = document.createElement('div')

element.innerHTML = `

<h1>Buscar questões</h1>
    
    <div class="search-container">
        <input type="text" placeholder="Questão">
        
        <select>
            <option value="" disabled selected>Vestibular</option>
            <option value="enem">ENEM</option>
            <option value="fuvest">FUVEST</option>
            <option value="unicamp">UNICAMP</option>
            <option value="outro">Outro</option>
        </select>
        
        <select>
            <option value="" disabled selected>Ano</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
        </select>
        
        <select>
            <option value="" disabled selected>Área</option>
            <option value="matematica">Matemática</option>
            <option value="portugues">Português</option>
            <option value="ciencias">Ciências</option>
            <option value="historia">História</option>
        </select>
        
        <select>
            <option value="" disabled selected>Assunto</option>
            <option value="algebra">Álgebra</option>
            <option value="geometria">Geometria</option>
            <option value="literatura">Literatura</option>
            <option value="fisica">Física</option>
        </select>
    </div>
    
    <button class="search-button">Buscar</button>
    
    <div class="results">
        <div class="question-item">
            <div class="question-title">Questão sobre teorema de Pitágoras e suas aplicações em geometria espacial</div>
            <div class="tags">
                <span class="tag tag-vestibular">ENEM</span>
                <span class="tag tag-ano">2023</span>
                <span class="tag tag-area">Matemática</span>
                <span class="tag tag-assunto">Geometria</span>
            </div>
        </div>
        
        <div class="question-item">
            <div class="question-title">Análise do movimento modernista brasileiro com enfoque na Semana de Arte Moderna de 1922</div>
            <div class="tags">
                <span class="tag tag-vestibular">FUVEST</span>
                <span class="tag tag-ano">2022</span>
                <span class="tag tag-area">História</span>
                <span class="tag tag-assunto">Literatura</span>
            </div>
        </div>
        
        <div class="question-item">
            <div class="question-title">Cálculo estequiométrico envolvendo reações de combustão completa e incompleta de hidrocarbonetos</div>
            <div class="tags">
                <span class="tag tag-vestibular">UNICAMP</span>
                <span class="tag tag-ano">2021</span>
                <span class="tag tag-area">Ciências</span>
                <span class="tag tag-assunto">Química</span>
            </div>
        </div>
    </div>

`

export default element