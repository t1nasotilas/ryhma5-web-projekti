const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchCounter = 0;
let clickCounter = 0;
let score = 5;

const matchCounterElement = document.getElementById("match-counter");
const clickCounterElement = document.getElementById("click-counter");
const scoreElement = document.getElementById("final-score");

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  // Lasketaan klikkaus
  clickCounter++;
  if (clickCounterElement) {
    clickCounterElement.textContent = clickCounter;
  }

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matchCounter++;
  matchCounterElement.textContent = matchCounter;

  if (matchCounter === 6) {
    calculateScore();
    setTimeout(() => {
      document.querySelector(".memory-game").style.display = "none";
      document.getElementById("game-over").style.display = "flex";
      if (scoreElement) {
        scoreElement.textContent = score + " / 5 pistettä";
      }
    }, 500);
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
  }, 500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function restartGame() {
  location.reload();
}

function goToHomePage() {
  window.location.href = "index.html";
}

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

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));

function startGame() {
  document.getElementById("welcome-screen").style.display = "none";
  document.querySelector(".game-container").style.display = "flex";
}