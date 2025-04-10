function HomePage() {
  const element = document.createElement("div");
  element.className = "home-container";

  element.innerHTML = `
    <header class="header">
        <div id="logo">
            <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M34.988 17.0656C34.9544 17.0656 34.9208 17.0824 34.8704 17.0824C34.8536 17.0824 34.8368 17.0656 34.82 17.0656L29.697 17.8383L26.7911 11.4219C26.4048 10.6324 25.9177 9.99415 25.3298 9.49024C25.0778 9.23829 24.7923 9.01993 24.4732 8.85196C24.154 8.66719 23.8013 8.54961 23.4485 8.48243C22.5079 8.26407 21.6513 8.39844 20.8618 8.85196L14.4454 11.8586C14.0087 12.1441 13.6056 12.2449 13.488 12.3289C12.8329 12.7824 12.7153 13.0344 12.6482 13.1688L9.42315 19.3668C9.38955 19.4172 9.37276 19.4844 9.35597 19.5516C9.23839 19.7867 9.1712 20.0555 9.1712 20.3242C9.1712 20.6098 9.25518 20.8953 9.37276 21.1305C9.54073 21.5336 9.80948 21.7856 10.179 21.9031C10.3974 22.0039 10.6493 22.0711 10.9181 22.0711C11.6067 22.0711 12.2114 21.668 12.497 21.0801C12.5138 21.0465 12.5474 21.0129 12.5642 20.9793C14.5798 17.2 15.5876 15.302 15.5876 15.2684L19.0142 14.4621L14.8989 31.7797L7.038 31.7293C7.0212 31.7293 7.00439 31.7293 7.00439 31.7461C6.9876 31.7461 6.97081 31.7461 6.95402 31.7461C5.91261 31.7461 5.07275 32.5859 5.07275 33.6273C5.07275 34.5848 5.79503 35.3742 6.71886 35.475V35.4918H8.91924C10.6157 35.5758 15.638 35.7941 17.1665 35.6262C17.2169 35.6262 17.2673 35.643 17.3177 35.643C18.1743 35.643 18.8798 35.0383 19.031 34.232L20.2067 30.7719C20.9962 28.5043 21.5337 26.3039 21.5337 26.3039C23.5829 28.4539 25.1114 29.8648 26.5224 31.343L28.9243 39.2375L29.4282 41.1356H29.445C29.7138 41.9586 30.4864 42.5801 31.3935 42.5801C32.5357 42.5801 33.4595 41.6562 33.4595 40.5141C33.4595 40.3461 33.4427 40.1949 33.3923 40.0438L33.2411 39.4559C33.2411 39.4391 33.2411 39.4391 33.2411 39.4223L32.8044 37.7762L32.3677 36.1469L30.604 29.5793C30.3521 28.9746 30.1505 28.3699 29.6298 27.7988C29.6298 27.7988 24.7083 22.3399 24.5739 22.2559L25.6993 16.9648L27.2614 20.2738C27.2782 20.3074 27.295 20.3242 27.3286 20.3578C27.4294 20.509 27.5302 20.6434 27.6142 20.7441C27.9165 21.0465 28.3196 21.2313 28.7732 21.2313C28.7899 21.2313 28.8067 21.2313 28.8067 21.2313C28.9411 21.2313 29.0755 21.2145 29.2099 21.1809L34.9544 20.5594C34.9712 20.5594 34.988 20.5594 35.0048 20.5594C35.156 20.5594 35.2903 20.5426 35.4247 20.509L35.5087 20.4922C35.5255 20.4922 35.5423 20.4754 35.5591 20.4586C36.231 20.2235 36.7349 19.5852 36.7349 18.8293C36.7013 17.8383 35.9286 17.0656 34.988 17.0656Z" fill="white"/>
                <path d="M24.1372 7.37383C25.1114 7.37383 25.9344 7.03789 26.6231 6.34922C27.3118 5.66054 27.6477 4.8543 27.6477 3.93047C27.6477 2.95625 27.3118 2.1332 26.6231 1.44453C25.9344 0.755855 25.1114 0.419922 24.1372 0.419922C23.1965 0.419922 22.3903 0.755855 21.7016 1.44453C21.0129 2.1332 20.677 2.95625 20.677 3.93047C20.677 4.8711 21.0129 5.67734 21.7016 6.34922C22.4071 7.03789 23.2133 7.37383 24.1372 7.37383Z" fill="white"/>
            </svg>
            <p>Atleta de Questões</p>
        </div>
        <button class="menu-toggle">☰</button>
        <nav class="nav-links">
            <a href="#why-use">Por que usar</a>
            <a href="#testimonials">Depoimentos</a>
            <a href="#faq">FAQ</a>
        </nav>
        <div class="dropdown-menu">
            <a href="#why-use">Por que usar</a>
            <a href="#testimonials">Depoimentos</a>
            <a href="#faq">FAQ</a>
        </div>
        <nav class="auth-links">
            <a href="/login">Entrar</a>
            <a href="/registro" class="register">Registrar</a>
        </nav>
    </header>

    <section class="banner">
        <div class="banner-content">
            <h1>ATLETA DE QUESTÕES: A PLATAFORMA QUE TRANSFORMA OS SEUS ESTUDOS EM RESULTADOS!</h1>
            <p class="banner-text">
                Você está preparado para o ENEM? Então você precisa mais do que conteúdo: precisa de treino inteligente, estratégia e foco!
            </p>
            <p class="banner-text">
            Com o Atleta de Questões, você acessa várias questões de provas anteriores, simula provas e acompanha sua evolução com dados e desempenho.
            </p>
            <p class="banner-text">
                Chegou a hora de treinar como um verdadeiro atleta! Faça seu cadastro agora e dê o primeiro passo rumo à aprovação.
            </p>
            <a href="/registro" class="btn-register">Registrar</a>
        </div>
        <div class="banner-images">
            <img src="/images/site/graduate.png" alt="Student" class="image-student">
        </div>
    </section>

    <section id="why-use" class="why-use">
        <h2 class="section-title">Por que usar o Atleta de Questões?</h2>
        <div class="cards-container">
            <div class="card">
                <h3 class="card-title">Banco de Questões Atualizado</h3>
                <p class="card-text">Acesse uma vasta coleção de questões de ENEM</p>
            </div>

            <div class="card">
                <h3 class="card-title">Filtros Inteligentes</h3>
                <p class="card-text">Pesquise por ano, área do conhecimento e assunto para focar nos seus pontos de melhoria </p>
            </div>

            <div class="card">
                <h3 class="card-title">Simulados Personalizados</h3>
                <p class="card-text">Monte simulados adaptados ao seu estilo de estudo</p>
            </div>

            <div class="card">
                <h3 class="card-title">Treino como um campeão</h3>
                <p class="card-text">Resolve questões e acompanhe seu progresso para melhorar sua performance a cada dia</p>
            </div>

            <div class="card">
                <h3 class="card-title">Histórico de Questões Resolvidas</h3>
                <p class="card-text">Acesse e revise as questões que já respondeu para reforçar seu aprendizado</p>
            </div>

            <div class="card">
                <h3 class="card-title">Ranking</h3>
                <p class="card-text">Veja a sua posição e os melhores colocados para a sua avaliação de desempenho</p>
            </div>
        </div>
    </section>

    <section id="testimonials" class="testimonials">
        <h2 class="section-title">O que dizem os nossos usuários</h2>
        <div class="cards-container">
            
            <div class="testimonial-card">
                <div class="testimonial-image">
                    <img src="/images/site/testimonial1.jpg" alt="Lucas Silva">
                </div>
                <div class="testimonial-content">
                    <h3 class="testimonial-name">Lucas Silva</h3>
                    <p class="testimonial-text">
                        O Atleta de Questões foi essencial na minha preparação para o ENEM! A plataforma é super organizada e me ajudou a identificar meus pontos fracos em cada matéria. Com os simulados e as questões comentadas, pude entender exatamente onde precisava melhorar. Além disso, a variedade de questões de ENEM anteriores me deu uma visão real do que esperar no dia da prova. Recomendo demais! 
                    </p>
                </div>
            </div>

            <div class="testimonial-card">
                <div class="testimonial-image">
                    <img src="/images/site/testimonial2.jpeg" alt="Pedro Alvez">
                </div>
                <div class="testimonial-content">
                    <h3 class="testimonial-name">Pedro Alvez</h3>
                    <p class="testimonial-text">
                        Eu sempre tive dificuldade em manter uma rotina de estudos, mas o Atleta de Questões mudou isso. A forma como as questões são separadas por nível de dificuldade e assunto me permitiu estudar de maneira direcionada e eficiente. Os rankings e a competição saudável com outros usuários também me motivaram a estudar mais. Graças a essa plataforma, me senti muito mais confiante para encarar o vestibular!
                    </p>
                </div>

            </div>
        </div>
    </section>

    <section class="faq" id="faq">
        <h2 class="section-title">Perguntas Frequentes</h2>
        <div class="faq-container">

            <div class="faq-item">
                <div class="faq-question">
                    <p class="faq-text">O que é o Atleta de Questões?</p>
                    <span class="arrow">&#8595;</span>
                </div>
                <div class="faq-answer">
                    <p>O Atleta de Questões é uma plataforma de estudos focada na preparação para o ENEM. Ela oferece recursos como simulados, acompanhamento de desempenho e muito mais — tudo pensado para ajudar os estudantes a alcançarem a aprovação.</p>
                </div>
                <div class="divider"></div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <p class="faq-text">O que está incluso na plataforma?</p>
                    <span class="arrow">&#8595;</span>
                </div>
                <div class="faq-answer">
                    <p>Você terá acesso ilimitado a buscas de questões, simulados personalizados, acompanhamento de desempenho, histórico de questões resolvidas e um ranking para comparar seu progresso com outros estudantes.</p>
                </div>
                <div class="divider"></div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <p class="faq-text">Como posso acessar a plataforma Atleta de Questões?</p>
                    <span class="arrow">&#8595;</span>
                </div>
                <div class="faq-answer">
                    <p>É simples! Basta fazer seu cadastro e realizar o login. Assim, você já poderá começar a explorar os conteúdos e recursos disponíveis.</p>
                </div>
                <div class="divider"></div>
            </div>

        </div>

    </section>

    <footer class="footer">
        <div class="footer-signature">
            <p>&#169; 2025 Atleta de Questões. Todos os direitos reservados.</p>
        </div>
    </footer>
`;

  element.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  element.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      // Fecha todas as outras respostas
      element.querySelectorAll(".faq-item").forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Alterna a resposta atual
      item.classList.toggle("active");
    });
  });

  const menuToggle = element.querySelector(".menu-toggle");
  const dropdownMenu = element.querySelector(".dropdown-menu");

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    if (dropdownMenu.classList.contains("show")) {
      dropdownMenu.classList.remove("show");
    }
  });

  dropdownMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  return element;
}

export default HomePage;
