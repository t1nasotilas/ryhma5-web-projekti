document.addEventListener("DOMContentLoaded", () => {
    const games = [
        { key: "europeGameScore", name: "Eurooppavisa", max: 6 },
        { key: "continentGameScore", name: "Maanosapeli", max: 7 }
        // add other games here
    ];

    const boxElements = document.querySelectorAll(".box");

    games.forEach((game, index) => {
        const score = localStorage.getItem(game.key);
        const displayScore = score !== null ? score : 0;

        const box = boxElements[index];
        if (box) {
            box.innerHTML = `
                <h3>${game.name}</h3>
                <p>Pisteet: ${displayScore} / ${game.max}</p>
            `;
        }
    });
});
