document.addEventListener("DOMContentLoaded", () => {
  let lastScroll = 0;
  const nav = document.querySelector('nav');
  const scrollThreshold = 0; 

  window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > scrollThreshold) {
    nav.classList.add('nav-scrolled');
  } else {
    nav.classList.remove('nav-scrolled');
  }
  lastScroll = currentScroll;
  });
  
  // displaytext for nav-bar
  const placeholder_p = document.querySelector("nav p");
  const menuLinks = document.querySelectorAll(".off-screen-menu a");
  let currentPage = window.location.pathname.split("/").pop();
  
  if (currentPage === "" || currentPage === "index") {
      currentPage = "index.html"; // recognizes index.html correctly
  }
  
  menuLinks.forEach(link => {
  
      let linkPage = link.getAttribute("href").split("/").pop();
  
      if (linkPage === currentPage) {
          link.classList.add("active");
          placeholder_p.textContent = link.textContent;
      }  
  });
  
  // hamburger-menu
  const hamMenu = document.querySelector(".ham-menu");
  const offScreenMenu = document.querySelector(".off-screen-menu");
  
  if (hamMenu && offScreenMenu) {
    hamMenu.addEventListener("click", () => {
        hamMenu.classList.toggle("active");
        offScreenMenu.classList.toggle("active");
    });
  }
  
  
  });
 
// Valitaan kaikki muistipelikortit DOMista
const cards = document.querySelectorAll('.memory-card');

// Pelin tilan seurantaan tarvittavat muuttujat
let hasFlippedCard = false;   // Onko jo ensimmäistä korttia käännetty?
let lockBoard = false;        // Estetään korttien kääntö väliaikaisesti, esim. odottaessa unflip
let firstCard, secondCard;    // Ensimmäinen ja toinen käännetty kortti
let matchCounter = 0;         // Laskuri löydetyille pareille
let clickCounter = 0;         // Laskuri klikkauksille
let score = 5;                // Pelaajan pistemäärä oletuksena maksimipisteet

// Viittaukset DOM-elementteihin, joihin päivitetään tilastot
const matchCounterElement = document.getElementById("match-counter");
const clickCounterElement = document.getElementById("click-counter");
// HUOM: HTML:ssa id="score", mutta tätä haetaan id="final-score" – varmista, että ne kohtaavat!
const scoreElement = document.getElementById("score");

/**
 * Kortin kääntö- ja klikkauskäsittelijä
 */
function flipCard() {
  // Jos taulukko on lukittu (esim. animaation ajaksi), ei sallita kääntöä
  if (lockBoard) return;
  // Estetään samaa korttia kääntämästä kahdesti peräkkäin
  if (this === firstCard) return;

  // Päivitetään klikkauslaskuria
  clickCounter++;
  if (clickCounterElement) {
    clickCounterElement.textContent = clickCounter;
  }

  // Käännetään kortti lisäämällä CSS-luokka
  this.classList.add('flip');

  // Jos ensimmäistä korttia ei vielä ole käännetty, asetetaan tämä kortti ensimmäiseksi
  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  // Muuten käännetään toinen kortti ja tarkistetaan osuma
  secondCard = this;
  checkForMatch();
}

/**
 * Tarkistaa, ovatko käännetyt kortit samaa paria
 */
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

/**
 * Jos pari löytyy, poistetaan korttien klikkauskuuntelijat ja päivitetään laskurit
 */
function disableCards() {
  // Estetään korttien uudelleen kääntö
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  // Lisätään yksi löydetty pari
  matchCounter++;
  matchCounterElement.textContent = matchCounter;

  // Jos kaikki parit löydetty, lopetetaan peli ja näytetään tulokset
  if (matchCounter === 6) {
    calculateScore();
    setTimeout(() => {
      // Piilotetaan peliruudukko ja näytetään loppunäyttö
      document.querySelector(".memory-game").style.display = "none";
      document.getElementById("game-over").style.display = "flex";
      if (scoreElement) {
        scoreElement.textContent = score + " / 5 pistettä";
      }
    }, 500);
  }

  // Valmistellaan seuraavaa käännön sarjaa
  resetBoard();
}

/**
 * Jos pari ei täsmää, käännetään ne takaisin
 */
function unflipCards() {
  // Lukitaan taulukko, jotta muita käännönyrityksiä ei voi tehdä
  lockBoard = true;

  setTimeout(() => {
    // Poistetaan käännös-luokka, jolloin kortit pyörähtävät takaisin
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    // Nollataan tilamuuttujat
    resetBoard();
  }, 500);
}

/**
 * Nollaa pelilaudan tilamuuttujat seuraavaa vuoroa varten
 */
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

/**
 * Lataa sivun uudelleen pelin uudelleenkäynnistämiseksi
 */
function restartGame() {
  location.reload();
}

/**
 * Ohjaa pelaajan takaisin etusivulle (index.html)
 */
function goToHomePage() {
  window.location.href = "../pages/overview.html";
}

/**
 * Laskee lopullisen pistemäärän klikkausten perusteella
 */

localStorage.setItem("asiaGameScore",score);

function calculateScore() {
  if (clickCounter <= 24) {
    score = 5;
  } else if (clickCounter <= 26) {
    score = 4;
  } else if (clickCounter <= 28) {
    score = 3;
  } else if (clickCounter <= 32) {
    score = 2;
  } else {
    score = 1;
  }
}

/**
 * Sekoittaa kortit aloitettaessa
 * IIFE (Immediately Invoked Function Expression) suorittaa sekoituksen heti
 */
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// Lisätään tapahtumankuuntelijat kaikkiin kortteihin käännön aktivoimiseksi
cards.forEach(card => card.addEventListener('click', flipCard));

/**
 * Poistaa tervetulo- (welcome) -näytön ja näyttää pelilaatikon
 * Kutsutaan "Aloita peli" -napista
 */
function startGame() {
  document.getElementById("welcome-screen").style.display = "none";
  document.querySelector(".game-container").style.display = "flex";
}
