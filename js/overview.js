document.addEventListener("DOMContentLoaded", () => {
    const games = [
        { key: "europeGameScore", name: "Eurooppavisa", max: 6 },
        { key: "continentGameScore", name: "Maanosapeli", max: 7 },
        { key: "southAmericaGameScore", name: "Etelä-Amerikka", max: 6}
        // add other games here
    ];

    const boxElements = document.querySelectorAll(".box");
    let totalScore = 0;
    let totalMax = 0;

    games.forEach((game, index) => {
        const score = parseInt(localStorage.getItem(game.key)) || 0;
        totalScore += score;
        totalMax += game.max;

        const box = boxElements[index + 1]; // index +1 koska 0 on yhteenvetolaatikko
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
        <p class="summary-description"> Kaikki suorittamasi pelit: </p>
        <p class="total-score">Yhteispisteet: ${totalScore} / ${totalMax}</p>
    `;
});

