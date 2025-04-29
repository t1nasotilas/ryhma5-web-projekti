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
        "../pages/MemorygameAsia.html",
        "../pages/africa.html",
        "../pages/ea.html",
        "../pages/europegame.html",
        "../pages/continentgame.html",
        "../pages/n-americagame.html",        
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

// Reset point totals for all games
document.addEventListener("DOMContentLoaded", () => {
    const resetButton = document.getElementById("reset-scores");
    if (resetButton){
        resetButton.addEventListener("click", () => {
            const games = [
                "asiaGameScore",
                "africaGameScore",
                "southAmericaGameScore",
                "europeGameScore",
                "continentGameScore",
                "northAmericaGameScore"
            ];

            games.forEach(game => {
                localStorage.removeItem(game);
            });

            window.location.reload(); 
        });
    }
        //tarkkailee skrollausta ja poistaa navin tekstin näkyvistä, kun skrollataan alaspäin
        let lastScroll = 0;
        const nav = document.querySelector('nav');
        const scrollThreshold = 15; 
    
        window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
    
        if (currentScroll > scrollThreshold) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
      lastScroll = currentScroll;
    });
});
