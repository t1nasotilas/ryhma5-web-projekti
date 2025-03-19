const continents = document.querySelectorAll(".continent");
        const dropzones = document.querySelectorAll(".dropzone");

        continents.forEach(continent => {
            continent.addEventListener("dragstart", (event) => {
                event.dataTransfer.setData("text", event.target.id);
            });
        });

        dropzones.forEach(zone => {
            zone.addEventListener("dragover", (event) => {
                event.preventDefault();
            });

            zone.addEventListener("drop", (event) => {
                event.preventDefault();
                const draggedId = event.dataTransfer.getData("text");
                const draggedElement = document.getElementById(draggedId);
                
                if (draggedId.replace("drag-", "") === zone.id) {
                    zone.innerText = draggedElement.innerText;
                    draggedElement.style.display = "none"; // Hide correct answer
                } else {
                    alert("Wrong placement! Try again.");
                }
            });
        });