const countries = {
    "Alankomaiden": "Amsterdam",
    "Albanian": "Tirana",
    "Andorran": "Andorra la Vella",
    "Belgian": "Bryssel",
    "Bosnia ja Hertsegovinan": "Sarajevo",
    "Bulgarian": "Sofia",
    "Espanjan": "Madrid",
    "Irlannin": "Dublin",
    "Islannin": "Reykjavik",
    "Italian": "Rooma",
    "Itävallan": "Wien",
    "Kreikan": "Ateena",
    "Kroatian": "Zagreb",
    "Kosovon": "Pristina",
    "Latvian": "Riika",
    "Liechtensteinin": "Vaduz",
    "Liettuan": "Vilna",
    "Luxemburgin": "Luxemburg",
    "Maltan": "Valletta",
    "Moldovan": "Chișinău",
    "Monacon": "Monaco",
    "Montenegron": "Podgorica",
    "Norjan": "Oslo",
    "Pohjois-Makedonian": "Skopje",
    "Portugalin": "Lissabon",
    "Puolan": "Varsova",
    "Ranskan": "Pariisi",
    "Romanian": "Bukarest",
    "Ruotsin": "Tukholma",
    "Saksan": "Berliini",
    "San Marinon": "San Marino",
    "Serbian": "Belgrad",
    "Slovakian": "Bratislava",
    "Slovenian": "Ljubljana",
    "Suomen": "Helsinki",
    "Sveitsin": "Bern",
    "Tanskan": "Kööpenhamina",
    "Tšekin": "Praha",
    "Ukrainan": "Kiova",
    "Unkarin": "Budapest",
    "Vatikaanin": "Vatikaani",
    "Venäjän": "Moskova",
    "Viron": "Tallinna"
};

function getRandomCountries(list, count) {
    const shuffled = [...list].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

let countryList = getRandomCountries(Object.keys(countries), 10);
let remainingCountries = [...countryList];
let currentCountry = "";
let correctAnswers = 0;

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-btn");
    const quizSection = document.getElementById("quiz-section");
    const startScreen = document.getElementById("start-screen");
    const checkBtn = document.getElementById("check-btn");

    const quizBox = document.querySelector('.quiz-box');
    if (quizBox) {
        setTimeout(() => {
            quizBox.classList.add('show');
        }, 100);
    }

    startBtn.addEventListener("click", () => {
        startScreen.style.display = "none";
        quizSection.style.display = "block";
        newQuestion();
    });

    checkBtn.addEventListener("click", checkAnswer);
});

function newQuestion() {
    const answerInput = document.getElementById("answer");
    const checkBtn = document.getElementById("check-btn");

    if (remainingCountries.length === 0) {
        document.getElementById("question").textContent = "Vastasit kaikkiin oikein!";
        answerInput.style.display = "none";
        checkBtn.style.display = "none";
        document.getElementById("feedback").textContent = "Peli päättyi!";
        setTimeout(() => {
            window.location = "../pages/overview.html";
        }, 1500);
        return;
    }

    currentCountry = remainingCountries[Math.floor(Math.random() * remainingCountries.length)];
    document.getElementById("question").textContent = `Mikä on ${currentCountry} pääkaupunki?`;
    answerInput.value = "";
    answerInput.style.display = "inline";
    checkBtn.style.display = "inline";
    document.getElementById("feedback").textContent = "";
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = countries[currentCountry];

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById("feedback").textContent = "Oikein!";
        remainingCountries = remainingCountries.filter(c => c !== currentCountry);
        correctAnswers++;

        // save right answers
        localStorage.setItem("europeGameScore", correctAnswers.toString());

        setTimeout(newQuestion, 1000);
    } else {
        document.getElementById("feedback").textContent = "Väärin, yritä uudelleen!";
    }
}
