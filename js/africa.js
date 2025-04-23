//Country names and pictures of the flags stated here//
//I have listed all 54 African countries, but the game will only ask the player 20 per round//
const countries = [
    { name: "Algeria", flag: "../images/flags/algeria-flag-medium.png" },
    { name: "Angola", flag: "../images/flags/angola-flag-medium.png" },
    { name: "Benin", flag: "../images/flags/benin-flag-medium.png" },
    { name: "Botswana", flag: "../images/flags/botswana-flag-medium.png" },
    { name: "Burkina Faso", flag: "../images/flags/burkina-faso-flag-medium.png" },
    { name: "Burundi", flag: "../images/flags/burundi-flag-medium.png" },
    { name: "Djibouti", flag: "../images/flags/djibouti-flag-medium.png" },
    { name: "Egypti", flag: "../images/flags/egypt-flag-medium.png" },
    { name: "Eritrea", flag: "../images/flags/eritrea-flag-medium.png" },
    { name: "Eswatini", flag: "../images/flags/swaziland-flag-medium.png" },
    { name: "Etiopia", flag: "../images/flags/ethiopia-flag-medium.png" },
    { name: "Gabon", flag: "../images/flags/gabon-flag-medium.png" },
    { name: "Gambia", flag: "../images/flags/gambia-flag-medium.png" },
    { name: "Ghana", flag: "../images/flags/ghana-flag-medium.png" },
    { name: "Guinea", flag: "../images/flags/guinea-flag-medium.png" },
    { name: "Guinea-Bissau", flag: "../images/flags/guinea-bissau-flag-medium.png" },
    { name: "Kamerun", flag: "../images/flags/cameroon-flag-medium.png" },
    { name: "Kap Verde", flag: "../images/flags/cape-verde-flag-medium.png" },
    { name: "Kenia", flag: "../images/flags/kenya-flag-medium.png" },
    { name: "Komorit", flag: "../images/flags/comoros-flag-medium.png" },
    { name: "Kongon demokraattinen tasavalta", flag: "../images/flags/congo-democratic-republic-of-the-flag-medium.png" },
    { name: "Kongon tasavalta", flag: "../images/flags/congo-republic-of-the-flag-medium.png" },
    { name: "Lesotho", flag: "../images/flags/lesotho-flag-medium.png" },
    { name: "Liberia", flag: "../images/flags/liberia-flag-medium.png" },
    { name: "Libya", flag: "../images/flags/libya-flag-medium.png" },
    { name: "Madagaskar", flag: "../images/flags/madagascar-flag-medium.png" },
    { name: "Malawi", flag: "../images/flags/malawi-flag-medium.png" },
    { name: "Mali", flag: "../images/flags/mali-flag-medium.png" },
    { name: "Marokko", flag: "../images/flags/morocco-flag-medium.png" },
    { name: "Mauritania", flag: "../images/flags/mauritania-flag-medium.png" },
    { name: "Mauritius", flag: "../images/flags/mauritius-flag-medium.png" },
    { name: "Mosambik", flag: "../images/flags/mozambique-flag-medium.png" },
    { name: "Namibia", flag: "../images/flags/namibia-flag-medium.png" },
    { name: "Niger", flag: "../images/flags/niger-flag-medium.png" },
    { name: "Nigeria", flag: "../images/flags/nigeria-flag-medium.png" },
    { name: "Norsunluurannikko", flag: "../images/flags/cote-d-ivoire-flag-medium.png" },
    { name: "Päiväntasaajan Guinea", flag: "../images/flags/equatorial-guinea-flag-medium.png" },
    { name: "Ruanda", flag: "../images/flags/rwanda-flag-medium.png" },
    { name: "São Tomé ja Príncipe", flag: "../images/flags/sao-tome-and-principe-flag-medium.png" },
    { name: "Senegal", flag: "../images/flags/senegal-flag-medium.png" },
    { name: "Seychellit", flag: "../images/flags/seychelles-flag-medium.png" },
    { name: "Sierra Leone", flag: "../images/flags/sierra-leone-flag-medium.png" },
    { name: "Somalia", flag: "../images/flags/somalia-flag-medium.png" },
    { name: "Sudan", flag: "../images/flags/sudan-flag-medium.png" },
    { name: "Etelä-Afrikka", flag: "../images/flags/south-africa-flag-medium.png" },
    { name: "Etelä-Sudan", flag: "../images/flags/south-sudan-flag-medium.png" },
    { name: "Swazimaa", flag: "../images/flags/swaziland-flag-medium.png" },
    { name: "Tansania", flag: "../images/flags/tanzania-flag-medium.png" },
    { name: "Tšad", flag: "../images/flags/chad-flag-medium.png" },
    { name: "Togo", flag: "../images/flags/togo-flag-medium.png" },
    { name: "Tunisia", flag: "../images/flags/tunisia-flag-medium.png" },
    { name: "Uganda", flag: "../images/flags/uganda-flag-medium.png" },
    { name: "Zambia", flag: "../images/flags/zambia-flag-medium.png" },
    { name: "Zimbabwe", flag: "../images/flags/zimbabwe-flag-medium.png" }
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
