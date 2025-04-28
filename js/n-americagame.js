// Koodi on pääsääntöisesti rakennettu W3schools:n ja DeepSeekin avulla.

document.addEventListener("DOMContentLoaded", () => {
  //pisteenlasku ja localstorage
  const storageKey = "northAmericaGameScore";
  const MAX_SCORE = 10;
  let bestScore = parseInt(localStorage.getItem(storageKey), 10) || 0;
  const scoreDisplay = document.getElementById("score-display");
  let sessionScore = 0;
  let answeredCount = 0;
  let allQuestions = [];

  // Hakee kysymykset tietokannasta
  fetch('../js/n-america.json')
    .then(response => response.json())
    .then(data => {
      allQuestions = data.sections.flatMap(section => section.questions);
      initSession(true); 
  });

  // JavaScript Array Sort https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_sort_random2
  // apufunktio sekoittaa kaikki alkiot satunnaisessa järjestyksessä
  function Random(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Alustusfunktio
  function initSession() {
    // nollaa pistelaskun ja päivittää pelin
    sessionScore = 0;
    answeredCount = 0;
    updateDisplay();
    observer.disconnect();

    const timeline = document.querySelector('.timeline');
    timeline.innerHTML = '<div class="vertical-line"></div>';

    // valitsee tietokannasta satunnaisesti 10 kysymystä Random-funktion avulla
    const shuffledQuestions = Random([...allQuestions]).slice(0, 10);
    
    //luo kysymyksille elementit aikajanalle
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

      //tapahtumakuuntelijat vaihtoehdoille
      container.querySelectorAll('.option').forEach(el => {
        el.addEventListener('click', () => {
          const opts = container.querySelectorAll('.option');
          const exp = container.querySelector('.explanation');
          
          // Estää uudet klikkaukset
          opts.forEach(o => o.style.pointerEvents = 'none');
          //laskee vastausten määrää
          answeredCount++;

        // Tarkistaa vastauksen Oikein/Väärin, oikein tarkistaa vielä onko session pistemäärä parempi kuin aikaisemmin, jos on lisää pisteet localstorageen
          if (el.dataset.correct === 'true') {
            sessionScore = Math.min(sessionScore + 1, MAX_SCORE);
            el.classList.add('correct', 'selected');
            if (sessionScore > bestScore) {
              bestScore = sessionScore;
              localStorage.setItem(storageKey, bestScore);
            }
          } else {
            el.classList.add('incorrect', 'selected');
            opts.forEach(o => { 
              if (o.dataset.correct === 'true') o.classList.add('correct');
            });
          }
          
          updateDisplay();
          exp.classList.add('visible');
        });
      });

    document.querySelector('.timeline').appendChild(container);
  });

  document.querySelectorAll('.container').forEach(container => {
    observer.observe(container);
  });
    // vie käyttäjän sivun alkuun jos aloita alusta-nappia painetaan
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

  // container tulee näkyviin/poistuu tietyissä kohdissa scrollatessa
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        entry.target.classList.toggle('visible', entry.isIntersecting);
      });
    }, {threshold: 0.25, rootMargin: "-1% 0px -50px 0px" });

  // luo piste-tekstin
  function updateDisplay() {
    scoreDisplay.textContent = `Pisteet: ${sessionScore}/10`;
  }

  // restart-nappi
  document.getElementById('restart-btn').addEventListener('click', () => {
    initSession();
  });
  //nappi etusivulle
  document.getElementById('homepage-btn').addEventListener('click', function() {
    window.location.href = '../index.html';
  });

  // Hamburger-menu /yhteinen 
  const hamMenu = document.querySelector(".ham-menu");
  const offScreenMenu = document.querySelector(".off-screen-menu");
  if (hamMenu && offScreenMenu) {
    hamMenu.addEventListener("click", () => {
      hamMenu.classList.toggle("active");
      offScreenMenu.classList.toggle("active");
    });
  }

  // Aktiivinen sivu /yhteinen
  const currentPage = window.location.pathname.split("/").pop() || 'index.html';
  document.querySelectorAll(".off-screen-menu a").forEach(link => {
    if (link.getAttribute("href").includes(currentPage)) {
      link.classList.add("active");
      document.querySelector("nav p").textContent = link.textContent;
    }
  });
});
//tarkkailee skrollausta ja poistaa navin tekstin näkyvistä, kun threshold osuu
let lastScroll = 0;
const nav = document.querySelector('nav');
const scrollThreshold = 30; 

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > scrollThreshold) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
  
  lastScroll = currentScroll;
});