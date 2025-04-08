document.addEventListener("DOMContentLoaded", () => {
    const games = [
        { key: "europeGameCompleted", element: "Game 1", name: "Eurooppavisa" }
        // add other games here
    ];

    games.forEach((game, index) => {
        const isCompleted = localStorage.getItem(game.key) === "true";
        const boxElement = document.querySelectorAll(".box")[index];

        if (isCompleted) {
            boxElement.classList.add("completed");
            boxElement.innerHTML = `<h3>${game.name}</h3><p> &#10003; Suoritettu</p>`;
        } else {
            boxElement.innerHTML = `<h3>${game.name}</h3><p> &#10007; Ei suoritettu</p>`;
        }
    });
});
