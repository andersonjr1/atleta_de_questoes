function HomePage() {
  const element = document.createElement("div");

  element.innerHTML = `
    <header class="header">
        <nav class="nav-links">
            <a href="#questions">Questões</a>
            <a href="#why-use">Por que usar</a>
            <a href="#testimonials">Depoimentos</a>
            <a href="#plans">Planos</a>
            <a href="#faq">FAQ</a>
        </nav>
        <nav class="auth-links">
            <a href="/login">Entrar</a>
            <a href="/registro" class="register">Registrar</a>
        </nav>
    </header>

    <section class="banner">
        <div class="banner-content">
            <h1>Atleta de Questões: O melhor banco de questões para a sua aprovação!</h1>
            <p class="banner-text">
                A jornada para a aprovação no vestibular exige preparo, estratégia e muita prática. O Atleta de Questões é a plataforma ideal para quem quer treinar resolvendo questões de vestibulares passados, aprimorar seu desempenho e chegar mais confiante na prova!
            </p>
            <p class="banner-text">
                Não perca tempo e faça o registro na nossa plataforma e torne-se um verdadeiro campeão.
            </p>
            <a href="/registro" class="btn-register">Registrar</a>
        </div>
        <div class="banner-images">
            <img src="/images/site/runner.png" alt="Runner" class="image-runner">
            <img src="/images/site/graduate.png" alt="Student" class="image-student">
        </div>
    </section>

    <section id="why-use" class="why-use">
        <h2 class="section-title">Por que usar o Atleta de Questões?</h2>
        <div class="cards-container">
            <div class="card">
                <h3 class="card-title">Banco de Questões Atualizado</h3>
                <p class="card-text">Acesse uma vasta coleção de questões de vestibulares</p>
            </div>

            <div class="card">
                <h3 class="card-title">Filtros Inteligentes</h3>
                <p class="card-text">Pesquise por vestibular, ano, área do conhecimento e assunto para focar nos seus pontos de melhoria </p>
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
                        O Atleta de Questões foi essencial na minha preparação para o vestibular! A plataforma é super organizada e me ajudou a identificar meus pontos fracos em cada matéria. Com os simulados e as questões comentadas, pude entender exatamente onde precisava melhorar. Além disso, a variedade de questões de vestibulares anteriores me deu uma visão real do que esperar no dia da prova. Recomendo demais! 
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

    <section class="plans" id="plans">
        <h2 class="section-title">Planos Disponíveis<#/h2>
        <div class="plans-container">

            <div class="plan-card">
                <h3 class="plan-title">GRÁTIS</h3>
                <p class="plan-price">R$0.00</p>
                <a href="/registro" class="btn-register">Registrar</a>
                <div class="divider"></div>
                <ul class="plan-features">
                    <li><i class="check-icon">✔</i> 2 buscas por dia</li>
                    <li><i class="check-icon">✔</i> 5 questões aleatórias por dia</li>
                    <li><i class="check-icon">✔</i> 1 simulado por dia</li>
                    <li style="visibility: hidden;">Espaço reservado</li>
                    <li style="visibility: hidden;">Espaço reservado</li>
                    <li style="visibility: hidden;">Espaço reservado</li>
                </ul>
            </div>

            <div class="plan-card">
                <h3 class="plan-title">MENSAL</h3>
                <p class="plan-price">R$19.99</p>
                <a href="/registro" class="btn-register">Registrar</a>
                <div class="divider"></div>
                <ul class="plan-features">
                    <li><i class="check-icon">✔</i> Buscas ilimitadas</li>
                    <li><i class="check-icon">✔</i> Questões aleatórias ilimitadas</li>
                    <li><i class="check-icon">✔</i> Simulados ilimitados</li>
                    <li><i class="check-icon">✔</i> Ver desempenho</li>
                    <li><i class="check-icon">✔</i> Ver histórico de questões</li>
                    <li><i class="check-icon">✔</i> Ver ranking</li>
                </ul>
            </div>

            <div class="plan-card">
                <h3 class="plan-title">ANUAL</h3>
                <p class="plan-price">R$199.99</p>
                <a href="/registro" class="btn-register">Registrar</a>
                <div class="divider"></div>
                <ul class="plan-features">
                    <li><i class="check-icon">✔</i> Buscas ilimitadas</li>
                    <li><i class="check-icon">✔</i> Questões aleatórias ilimitadas</li>
                    <li><i class="check-icon">✔</i> Simulados ilimitados</li>
                    <li><i class="check-icon">✔</i> Ver desempenho</li>
                    <li><i class="check-icon">✔</i> Ver histórico de questões</li>
                    <li><i class="check-icon">✔</i> Ver ranking</li>
                </ul>
            </div>

        </div>
    </section>

    <section class="faq" id="faq">
        <h2 class="section-title">Perguntas Frequentes</h2>
        <div class="faq-container">

            <div class="faq-item">
                <div class="faq-question">
                    <p class="faq-text">Esse campo vai ser para a pergunta 1</p>
                    <span class="arrow">&#8595;</span>
                </div>
                <div class="divider"></div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <p class="faq-text">Esse campo vai ser para a pergunta 2</p>
                    <span class="arrow">&#8595;</span>
                </div>
                <div class="divider"></div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <p class="faq-text">Esse campo vai ser para a pergunta 3</p>
                    <span class="arrow">&#8595;</span>
                </div>
                <div class="divider"></div>
            </div>

            <div class="faq-item">
                <div class="faq-question">
                    <p class="faq-text">Esse campo vai ser para a pergunta 4</p>
                    <span class="arrow">&#8595;</span>
                </div>
                <div class="divider"></div>
            </div>

        </div>

    </section>

    <footer class="footer">
        <nav class="footer-nav">
            <a href="#questions">Questões</a>
            <a href="tel: +55-11-99999-9999" class="contact">Entrar em contato &#9742;</a>
        </nav>
        <div class="footer-signature">
            <p>&#169; 2025 Atleta de Questões. Todos os direitos reservados.</p>
        </div>
    </footer>
`;
  return element;
}

export default HomePage;
