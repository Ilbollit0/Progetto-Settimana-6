// Atelier — Week Project Settimana VI

// Su mobile chiude il menu hamburger dopo il click su un link
const menu = document.getElementById("menu");

menu.addEventListener("click", function (event) {
    if (event.target.closest(".nav-link") && menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
});
