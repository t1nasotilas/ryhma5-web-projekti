document.addEventListener("DOMContentLoaded", () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const continents = document.querySelectorAll(".continent");
    const dropzones = document.querySelectorAll(".dropzone");
    const btn = document.getElementById("fullscreen-btn");

    if (isMobile && btn) {
        btn.style.display = "block";

        const enterFullscreen = () => {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }

            // Try to lock orientation
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock("landscape").catch(err => {
                    console.warn("Orientation lock failed:", err);
                });
            }

            btn.style.display = "none";
        };

        document.body.addEventListener("click", enterFullscreen, { once: true });
        document.body.addEventListener("touchstart", enterFullscreen, { once: true });
    }

    // Desktop: Drag and Drop
    continents.forEach(continent => {
        continent.addEventListener("dragstart", (event) => {
            event.dataTransfer.setData("text", event.target.id);
        });
    });

    dropzones.forEach(zone => {
        zone.addEventListener("dragover", (event) => event.preventDefault());

        zone.addEventListener("drop", (event) => {
            event.preventDefault();
            const draggedId = event.dataTransfer.getData("text");
            const draggedElement = document.getElementById(draggedId);

            if (draggedId.replace("drag-", "") === zone.id) {
                zone.innerText = draggedElement.innerText;
                draggedElement.style.display = "none";
            } else {
                alert("Wrong placement! Try again.");
            }
        });
    });

    // Mobile: Touch support
    if (isMobile) {
        continents.forEach(continent => {
            continent.addEventListener("touchstart", (event) => {
                event.target.classList.add("dragging");
                event.preventDefault();
            }, { passive: false });

            continent.addEventListener("touchmove", (event) => {
                const touch = event.touches[0];
                const dragging = document.querySelector(".dragging");

                if (dragging) {
                    dragging.style.position = "absolute";
                    dragging.style.left = `${touch.pageX - dragging.offsetWidth / 2}px`;
                    dragging.style.top = `${touch.pageY - dragging.offsetHeight / 2}px`;
                }
            }, { passive: false });

            continent.addEventListener("touchend", (event) => {
                const dragging = document.querySelector(".dragging");
                if (!dragging) return;

                dragging.classList.remove("dragging");

                const touch = event.changedTouches[0];
                const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);

                if (dropTarget && dropTarget.classList.contains("dropzone")) {
                    const dropId = dropTarget.id;
                    const dragId = dragging.id.replace("drag-", "");

                    if (dropId === dragId) {
                        dropTarget.innerText = dragging.innerText;
                        dragging.style.display = "none";
                    } else {
                        alert("Wrong placement! Try again.");
                    }
                }
            });
        });

        document.body.classList.add("mobile");


    }
});
