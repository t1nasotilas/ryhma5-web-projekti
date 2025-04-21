document.addEventListener("DOMContentLoaded", () => {
    const games = [
        { key: "asiaGameScore", name: "Aasia", max: 6 },
        { key: "africaGameScore", name: "Afrikkavisa", max: 6 },
        { key: "europeGameScore", name: "Eurooppavisa", max: 6 },
        { key: "continentGameScore", name: "Maanosapeli", max: 7 },
        { key: "southAmericaGameScore", name: "Etelä-Amerikka", max: 6 },
        { key: "northAmericaGameScore", name: "Pohjois-Amerikka", max: 6 }
        // add other games here
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
                <h3>${game.name}</h3>
                <p>Pisteet: ${score} / ${game.max}</p>
            `;
        }
    });

    // Yhteenvetolaatikkoon yhteispisteet
    const summaryBox = document.querySelector(".summary-box");
    summaryBox.innerHTML = `
        <h1>Yhteenveto</h1>
        <p class="summary-description"> Kaikkien suorittamisien pelien pisteet </p>
        <p class="total-score">Yhteispisteet: ${totalScore} / ${totalMax}</p>
    `;
});

