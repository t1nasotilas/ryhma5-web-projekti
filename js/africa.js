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
    { name: "Zimbabve", flag: "zimbabwe.png" }

];

//gameData holds all the information about the cards in the game//
//flippedCards keeps track of the cards the player has played during the game//
//score keeps a track of the score during the game, which starts from 0//
let gameData = [];
let flippedCards = [];
let score = 0;

//The shuffle function performs a randomized suffle on the elements of the array//
//Let's use Fisher-Yates shuffle for the most randomized results//
function shuffle(array) {
for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
}
return array;
}

//Picks 12 countries from shuffled the array//
//Makes sure that each country appears twice for matching//
function initializeGame() {
const selectedCountries = shuffle(countries).slice(0, 6); // Changed from 20 to 6
gameData = shuffle([...selectedCountries, ...selectedCountries].map((item, index) => ({
    id: index,
    value: index % 2 === 0 ? item.name : item.flag,
    matched: false
})));

// Get the game board container
const gameBoard = document.getElementById("gameBoard");
gameBoard.innerHTML = "";

// Create and append cards to the game board
gameData.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.id = item.id;

    const front = document.createElement("div");
    front.classList.add("front");
    front.innerHTML = "?";

// Show image if value is a flag, else show country name
    const back = document.createElement("div");
    back.classList.add("back");
    back.innerHTML = item.value.includes(".png") ? `<img src="${item.value}" width="80">` : item.value;

// Assemble the card and attach flip handler
    card.appendChild(front);
    card.appendChild(back);
    card.addEventListener("click", () => flipCard(card, item));

// Add card to the game board
    gameBoard.appendChild(card);
});
}

initializeGame();