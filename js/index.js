document.addEventListener("DOMContentLoaded", () => {

// displaytext for nav-bar
const placeholder_p = document.querySelector("nav p");
const menuLinks = document.querySelectorAll(".off-screen-menu a");
let currentPage = window.location.pathname.split("/").pop();

if (currentPage === "" || currentPage === "index") {
    currentPage = "index.html"; // recognizes index.html correctly
}

menuLinks.forEach(link => {

    let linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
        link.classList.add("active");
        placeholder_p.textContent = link.textContent;
    }  
});

// hamburger-menu
const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

if (hamMenu && offScreenMenu) {
  hamMenu.addEventListener("click", () => {
      hamMenu.classList.toggle("active");
      offScreenMenu.classList.toggle("active");
  });
}


});
