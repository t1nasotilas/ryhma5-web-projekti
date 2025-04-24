const countries = {
    "Ruotsi": "Tukholma",
    "Norja": "Oslo",
    "Tanska": "Kööpenhamina",
    "Saksa": "Berliini",
    "Ranska": "Pariisi",
    "Viro": "Tallinna"
};

let countryList = Object.keys(countries);
let remainingCountries = [...countryList];
let currentCountry = "";

function newQuestion() {
    if (remainingCountries.length === 0) {
        document.getElementById("question").textContent = "Vastasit kaikkiin oikein!";
        document.getElementById("answer").style.display = "none";
        document.getElementById("feedback").textContent = "Peli päättyi!";
        return;
    }
    
    currentCountry = remainingCountries[Math.floor(Math.random() * remainingCountries.length)];
    document.getElementById("question").textContent = `Mikä on ${currentCountry}n pääkaupunki?`;
    document.getElementById("answer").value = "";
    document.getElementById("feedback").textContent = "";
}

function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim();
    const correctAnswer = countries[currentCountry];
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        document.getElementById("feedback").textContent = "Oikein!";
        remainingCountries = remainingCountries.filter(country => country !== currentCountry);
        setTimeout(newQuestion, 1000);
    } else {
        document.getElementById("feedback").textContent = "Väärin, yritä uudelleen!";
    }
}

window.onload = newQuestion;
