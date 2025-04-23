//Country names and pictures of the flags stated here//
//I have listed all 54 African countries, but the game will only ask the player 20 per round//
const countries = [
    { name: "Algeria", flag: "algeria.png" },
    { name: "Angola", flag: "angola.png" },
    { name: "Benin", flag: "benin.png" },
    { name: "Botswana", flag: "botswana.png" },
    { name: "Burkina Faso", flag: "burkinafaso.png" },
    { name: "Burundi", flag: "burundi.png" },
    { name: "Djibouti", flag: "djibouti.png" },
    { name: "Egypti", flag: "egypt.png" },
    { name: "Eritrea", flag: "eritrea.png" },
    { name: "Eswatini", flag: "eswatini.png" },
    { name: "Etiopia", flag: "ethiopia.png" },
    { name: "Gabon", flag: "gabon.png" },
    { name: "Gambia", flag: "gambia.png" },
    { name: "Ghana", flag: "ghana.png" },
    { name: "Guinea", flag: "guinea.png" },
    { name: "Guinea-Bissau", flag: "guinea_bissau.png" },
    { name: "Kamerun", flag: "cameroon.png" },
    { name: "Kap Verde", flag: "cape_verde.png" },
    { name: "Kenia", flag: "kenya.png" },
    { name: "Komorit", flag: "comoros.png" },
    { name: "Kongon demokraattinen tasavalta", flag: "drcongo.png" },
    { name: "Kongon tasavalta", flag: "congo.png" },
    { name: "Lesotho", flag: "lesotho.png" },
    { name: "Liberia", flag: "liberia.png" },
    { name: "Libya", flag: "libya.png" },
    { name: "Madagaskar", flag: "madagascar.png" },
    { name: "Malawi", flag: "malawi.png" },
    { name: "Mali", flag: "mali.png" },
    { name: "Marokko", flag: "morocco.png" },
    { name: "Mauritania", flag: "mauritania.png" },
    { name: "Mauritius", flag: "mauritius.png" },
    { name: "Mosambik", flag: "mozambique.png" },
    { name: "Namibia", flag: "namibia.png" },
    { name: "Niger", flag: "niger.png" },
    { name: "Nigeria", flag: "nigeria.png" },
    { name: "Norsunluurannikko", flag: "ivorycoast.png" },
    { name: "Päiväntasaajan Guinea", flag: "equatorialguinea.png" },
    { name: "Ruanda", flag: "rwanda.png" },
    { name: "São Tomé ja Príncipe", flag: "saotomeandprincipe.png" },
    { name: "Senegal", flag: "senegal.png" },
    { name: "Seychellit", flag: "seychelles.png" },
    { name: "Sierra Leone", flag: "sierraleone.png" },
    { name: "Somalia", flag: "somalia.png" },
    { name: "Sudan", flag: "sudan.png" },
    { name: "Etelä-Afrikka", flag: "southafrica.png" },
    { name: "Etelä-Sudan", flag: "southsudan.png" },
    { name: "Swazimaa", flag: "swaziland.png" },
    { name: "Tansania", flag: "tanzania.png" },
    { name: "Tšad", flag: "chad.png" },
    { name: "Togo", flag: "togo.png" },
    { name: "Tunisia", flag: "tunisia.png" },
    { name: "Uganda", flag: "uganda.png" },
    { name: "Zambia", flag: "zambia.png" },
    { name: "Zimbabwe", flag: "zimbabwe.png" }
];

// Game variables
let gameData = [];
let flippedCards = [];
let lockBoard = false;

// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Initialize game
function initializeGame() {
  const selectedCountries = shuffle([...countries]).slice(0, 10); // Select 10 countries
  const cards = [];

  selectedCountries.forEach((country, index) => {
    cards.push({
      id: `${index}-name`,
      type: "name",
      value: country.name,
      matchId: index,
      matched: false
    });
    cards.push({
      id: `${index}-flag`,
      type: "flag",
      value: country.flag,
      matchId: index,
      matched: false
    });
  });

  gameData = shuffle(cards);
  renderGameBoard();
}

// Render the board
function renderGameBoard() {
  const gameBoard = document.getElementById("gameBoard");
  gameBoard.innerHTML = "";

  gameData.forEach((cardData) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = cardData.id;

    const inner = document.createElement("div");
    inner.classList.add("card-inner");

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");

    if (cardData.type === "flag") {
      back.innerHTML = `<img src="${cardData.value}" width="80" />`;
    } else {
      back.textContent = cardData.value;
    }

    inner.appendChild(front);
    inner.appendChild(back);
    card.appendChild(inner);

    card.addEventListener("click", () => flipCard(card, cardData));

    gameBoard.appendChild(card);
  });
}

// Flip logic
function flipCard(card, data) {
  if (lockBoard || data.matched || flippedCards.includes(card)) return;

  card.classList.add("flipped");
  flippedCards.push({ card, data });

  if (flippedCards.length === 2) {
    lockBoard = true;
    const [first, second] = flippedCards;

    if (first.data.matchId === second.data.matchId && first.data.type !== second.data.type) {
      first.data.matched = true;
      second.data.matched = true;

      // Keep cards flipped (showing back view)
      first.card.classList.add("match");
      second.card.classList.add("match");

      resetFlippedCards();
    } else {
      // Wrong guess, flash red and flip back
      first.card.classList.add("wrong");
      second.card.classList.add("wrong");

      setTimeout(() => {
        first.card.classList.remove("flipped", "wrong");
        second.card.classList.remove("flipped", "wrong");
        resetFlippedCards();
      }, 1000);
    }
  }
}

function resetFlippedCards() {
  flippedCards = [];
  lockBoard = false;
}

initializeGame();
