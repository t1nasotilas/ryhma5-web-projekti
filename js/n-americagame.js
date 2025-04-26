document.addEventListener("DOMContentLoaded", () => {


  const storageKey = "northAmericaGameScore";
  let score = parseInt(localStorage.getItem(storageKey), 10) || 0;
  
  fetch('../js/n-america.json')
    .then(response => response.json())
    .then(data => {
      const timeline = document.querySelector('.timeline');
      timeline.innerHTML = '<div class="vertical-line"></div>';

      // Kerää kaikki kysymykset tietokannasta ja valitsee sieltä 10 randomin avulla
      const allQuestions = data.sections.flatMap(section => section.questions);
      const shuffledQuestions = shuffleArray(allQuestions).slice(0, 10);

      // JavaScript Array Sort https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_sort_random2
      // sekoittaa kaikki alkiot satunnaisessa järjestyksessä
      function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
      }

      // Luo elementit aikajanalle
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
        //
        // Lisää tapahtumakuuntelija
        container.querySelectorAll('.option').forEach(el => {
          el.addEventListener('click', () => {
            const opts = container.querySelectorAll('.option');
            const exp = container.querySelector('.explanation');
            opts.forEach(o => o.style.pointerEvents = 'none');
            opts.forEach(o => o.classList.remove('selected','correct','incorrect'));
            exp.classList.remove('visible');

            if (el.dataset.correct === 'true') {
              el.classList.add('correct','selected');
              score++;
            } else {
              el.classList.add('incorrect','selected');
              opts.forEach(o => { if (o.dataset.correct==='true') o.classList.add('correct'); });
            }
            //tallentaa aina pisteet localstorageen
            localStorage.setItem(storageKey, score);
            exp.classList.add('visible');
          });
        });

        timeline.appendChild(container);
      });

  // Animaatiot
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.classList.toggle('visible', entry.isIntersecting);
    });},
      {threshold: 0.7, rootMargin: "50px 0px 175px 0px" });
  
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
});