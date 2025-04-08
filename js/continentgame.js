document.addEventListener("DOMContentLoaded", () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const continents = document.querySelectorAll(".continent");
    const dropzones = document.querySelectorAll(".dropzone");
    const submitBtn = document.getElementById("submit-btn")
    const btn = document.getElementById("fullscreen-btn");
    const wrapper = document.querySelector(".wrapper");

    if (wrapper) wrapper.style.display = "none";

    if (btn) {
        btn.style.display = "block";

        btn.addEventListener("click", () => {
            // Only attempt fullscreen + orientation lock on mobile
            if (isMobile) {
                const elem = document.documentElement;

                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                }

                if (screen.orientation && screen.orientation.lock) {
                    screen.orientation.lock("landscape").catch(err => {
                        console.warn("Orientation lock failed:", err);
                    });
                }
            }

    const launcher = document.querySelector(".game-launcher");

    if (launcher) launcher.style.display = "none";
    if (wrapper) wrapper.style.display = "block";
    btn.style.display = "none";
        });
    }

    // Desktop: Drag and Drop
    continents.forEach(continent => {
        continent.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.id);
        });
    });

    dropzones.forEach(zone => {
        zone.addEventListener("drop", (event) => {
            event.preventDefault();
            const draggedId = event.dataTransfer.getData("text");
            const draggedElement = document.getElementById(draggedId);
        
            if (draggedElement) {
                // ✅ Return previously placed item, if any
                const previousId = zone.dataset.continent;
                if (previousId) {
                    const previousElement = document.getElementById(`drag-${previousId}`);
                    if (previousElement) previousElement.style.display = "block";
                }
        
                // ✅ Place new one
                zone.textContent = draggedElement.textContent;
                draggedElement.style.display = "none";
        
                // ✅ Update dataset + placements
                zone.dataset.continent = draggedId.replace("drag-", "");
                placements[zone.id] = draggedId.replace("drag-", "");
            }
        });
    });

        // Store current placements
        const placements = {};

        // Accept drops without immediate validation
        dropzones.forEach(zone => {
            zone.addEventListener("dragover", event => event.preventDefault());
    
            zone.addEventListener("drop", event => {
                event.preventDefault();
                const draggedId = event.dataTransfer.getData("text");
                const draggedElement = document.getElementById(draggedId);
    
                if (draggedElement) {
                    zone.textContent = draggedElement.textContent;
                    draggedElement.style.display = "none";
    
                    // Track placement
                    placements[zone.id] = draggedId.replace("drag-", "");
                }
            });
        });

        const resultOverlay = document.querySelector(".result-overlay");
        const finalScoreText = document.getElementById("final-score-text");
        const saveScoreBtn = document.getElementById("save-btn");
        const tryAgainBtn = document.getElementById("retry-btn");
    
        // On submit: check all placements
        submitBtn.addEventListener("click", () => {
            let correct = 0;
        
            for (const zone of dropzones) {
                const placed = placements[zone.id];
                if (placed === zone.id) {
                    correct++;
                    zone.style.backgroundColor = "#1eb00b";
                } else {
                    zone.style.backgroundColor = "#ad371a";
                }
            }
        
                // Update scoreboard and show overlay
        document.getElementById("score").textContent = correct;
        finalScoreText.textContent = `Sait ${correct} / ${dropzones.length} oikein!`;
        resultOverlay.style.display = "flex";

        // Save score button
        saveScoreBtn.onclick = () => {
            localStorage.setItem("continentGameScore", correct);
            window.location='../pages/overview.html';
        };

        // Try again button
        tryAgainBtn.onclick = () => {
            window.location.reload();
        };
    });

    // Mobile: Touch support
    if (isMobile) {
    continents.forEach(continent => {
        continent.addEventListener("touchstart", (event) => {
            event.preventDefault();

            const touch = event.touches[0];
            const clone = continent.cloneNode(true);
            clone.id = "clone-" + continent.id;
            clone.classList.add("mobile-drag");
            clone.style.position = "absolute";
            clone.style.left = `${touch.pageX - clone.offsetWidth / 2}px`;
            clone.style.top = `${touch.pageY - clone.offsetHeight / 2}px`;
            clone.style.zIndex = "1000";
            document.body.appendChild(clone);

            continent.classList.add("dragging");
        }, { passive: false });

        continent.addEventListener("touchmove", (event) => {
            const touch = event.touches[0];
            const clone = document.getElementById("clone-" + continent.id);

            if (clone) {
                clone.style.left = `${touch.pageX - clone.offsetWidth / 2}px`;
                clone.style.top = `${touch.pageY - clone.offsetHeight / 2}px`;
            }
        }, { passive: false });

        continent.addEventListener("touchend", (event) => {
            const clone = document.getElementById("clone-" + continent.id);
            const touch = event.changedTouches[0];
            const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

            if (clone) clone.remove();

            if (dropTarget && dropTarget.classList.contains("dropzone")) {
                const dropId = dropTarget.id;
                const dragId = continent.id.replace("drag-", "");

                // Return previous item if needed
                const previousId = dropTarget.dataset.continent;
                if (previousId) {
                    const prevElem = document.getElementById("drag-" + previousId);
                    if (prevElem) prevElem.style.display = "block";
                }

                dropTarget.innerText = continent.innerText;
                continent.style.display = "none";

                dropTarget.dataset.continent = dragId;
                placements[dropId] = dragId;
            }

            continent.classList.remove("dragging");
        });
    });

    document.body.classList.add("mobile");
}
});
