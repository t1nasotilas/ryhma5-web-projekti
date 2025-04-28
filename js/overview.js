document.addEventListener("DOMContentLoaded", () => {
    const games = [
        { key: "asiaGameScore", name: "Aasia", max: 5 },
        { key: "africaGameScore", name: "Afrikka", max: 10 },
        { key: "southAmericaGameScore", name: "Etelä-Amerikka", max: 6 },
        { key: "europeGameScore", name: "Eurooppa", max: 10 },
        { key: "continentGameScore", name: "Maanosat", max: 7 },
        { key: "northAmericaGameScore", name: "Pohjois-Amerikka", max: 10 }
    ];

    const boxElements = document.querySelectorAll(".box");
    let totalScore = 0;
    let totalMax = 0;

    games.forEach((game, index) => {
        const score = parseInt(localStorage.getItem(game.key)) || 0;
        totalScore += score;
        totalMax += game.max;

        const box = boxElements[index]; // index +1 koska 0 on yhteenvetolaatikko
        if (box) {
            box.innerHTML = `
                <h2>${game.name}</h2>
                <p>Pisteet: ${score} / ${game.max}</p>
            `;
        }
    });

    // Yhteenvetolaatikkoon yhteispisteet
    const summaryBox = document.querySelector(".summary-box");
    summaryBox.innerHTML = `
        <h1>YHTEENVETO</h1>
        <p class="summary-description"> Kaikkien suorittamisien pelien pisteet </p>
        <p class="summary-description"> Laatikkoa painamalla pääset peliin </p>
        <p class="total-score">Yhteispisteet: ${totalScore} / ${totalMax}</p>
    `;
});

// This function redirects the user to the game when they click on the box
document.addEventListener("DOMContentLoaded", () => {
    const boxes = document.querySelectorAll(".box");

    const links = [
        /*ODOTTAA SANTERIN PELIÄ!!!*/
        "../pages/africa.html",
        "../pages/continentgame.html",
        "../pages/europegame.html",
        "../pages/ea.html",
        "../n-americagame.html",        
    ];

    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            const link = links[index];
            if (link) {
                window.location.href = link;
            }
        });
    });
});

