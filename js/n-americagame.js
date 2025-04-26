document.addEventListener("DOMContentLoaded", () => {

    fetch('../js/n-america.json')
      .then(response => response.json())
      .then(data => {
        const timeline = document.querySelector('.timeline');
        timeline.innerHTML = '<div class="vertical-line"></div>';

        // Kerää kaikki kysymykset ja sekoita
        const allQuestions = data.sections.flatMap(section => section.questions);
        const shuffledQuestions = shuffleArray(allQuestions).slice(0, 10);

        // Luo kysymyscontainerit
        shuffledQuestions.forEach((question) => {
          const container = document.createElement('div');
          container.className = 'container';
          
          container.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="content">
              <h2>${question.question}</h2>
              <p class="year-display">📅 Vuosi: ${question.year}</p>
              <div class="options-container">
                ${question.options.map(option => `
                  <div class="option" data-correct="${option === question.correctAnswer}">
                    ${option}
                  </div>
                `).join('')}
              </div>
              <div class="hidden-content explanation">
                <p>✅ Oikea vastaus: <strong>${question.correctAnswer}</strong></p>
                <p>📚 ${question.explanation}</p>
              </div>
            </div>
          `;

          // Lisää interaktio
          container.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
              const parentContent = this.closest('.content');
              const explanation = parentContent.querySelector('.explanation');
              const allOptions = parentContent.querySelectorAll('.option');
  
              allOptions.forEach(opt => opt.classList.remove('selected', 'correct', 'incorrect'));
              explanation.classList.remove('visible');
  
              if (this.dataset.correct === "true") {
                this.classList.add('correct', 'selected');
                explanation.classList.add('visible');
              } else {
                this.classList.add('incorrect', 'selected');
                allOptions.forEach(opt => {
                  if (opt.dataset.correct === "true") opt.classList.add('correct');
                });
              }
            });
          });

          timeline.appendChild(container);
        });

        // Animaatiot
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle('visible', entry.isIntersecting);
            });
        }, { threshold: 0.9, rootMargin: "50px 0px 175px 0px" });
  
        document.querySelectorAll('.container').forEach(container => observer.observe(container));
    });

    // Hamburger-menu
    const hamMenu = document.querySelector(".ham-menu");
    const offScreenMenu = document.querySelector(".off-screen-menu");
    if (hamMenu && offScreenMenu) {
      hamMenu.addEventListener("click", () => {
        hamMenu.classList.toggle("active");
        offScreenMenu.classList.toggle("active");
      });
    }
  
    // Aktiivisen sivun merkintä
    const currentPage = window.location.pathname.split("/").pop() || 'index.html';
    document.querySelectorAll(".off-screen-menu a").forEach(link => {
      if (link.getAttribute("href").includes(currentPage)) {
        link.classList.add("active");
        document.querySelector("nav p").textContent = link.textContent;
      }
    });

    // Apufunktio satunnaiselle sekoitukselle
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
});