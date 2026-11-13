// Atelier — codice comune a tutte le pagine (helper DOM, navbar, tema)


// === Creare elementi in modo sicuro (niente innerHTML) ===
// el("a", { href: "#", class: "btn" }, "testo", altroNodo)
// Le stringhe diventano SEMPRE nodi di testo: anche se contenessero "<script>"
// verrebbero mostrate come testo, mai eseguite come HTML.
function el(tag, attributi = {}, ...figli) {
    const nodo = document.createElement(tag);

    for (const [nome, valore] of Object.entries(attributi)) {
        if (valore === null || valore === undefined || valore === false) continue;
        if (nome === "class") nodo.className = valore;
        else if (nome === "dataset") Object.assign(nodo.dataset, valore);
        else nodo.setAttribute(nome, valore);
    }

    for (const figlio of figli.flat()) {
        if (figlio === null || figlio === undefined || figlio === false) continue;
        nodo.append(figlio instanceof Node ? figlio : String(figlio));
    }
    return nodo;
}

const icona = (nome, classi = "") => el("i", { class: `bi ${nome} ${classi}`.trim(), "aria-hidden": "true" });


// === Utility sui dati ===

const trovaPerId = (lista, id) => lista.find((elemento) => elemento.id === id);
const trovaServizio = (id) => trovaPerId(servizi, id);
const linkServizio = (id) => `servizio.html?id=${encodeURIComponent(id)}`;

// URL Unsplash ridimensionato dal loro CDN: il browser scarica solo i pixel che servono
const fotoUrl = (foto, larghezza) =>
    `https://images.unsplash.com/photo-${foto}?w=${larghezza}&q=75&fm=jpg&fit=crop`;

// "2025-09-14" -> "14 settembre 2025"
const formatoData = new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "long", year: "numeric" });
const formattaData = (iso) => formatoData.format(new Date(`${iso}T00:00:00`));


// === Pezzi di interfaccia riusati ===

// 4 -> ★★★★☆
const stelle = (voto) =>
    el("span", { class: "stelle text-nowrap", role: "img", "aria-label": `Valutazione ${voto} su 5` },
        [1, 2, 3, 4, 5].map((i) => icona(i <= voto ? "bi-star-fill" : "bi-star")));

// riga "nome + stelle" delle card recensione
const testataRecensione = (recensione) =>
    el("div", { class: "d-flex justify-content-between align-items-start gap-2 mb-2" },
        el("strong", {}, recensione.nome),
        stelle(recensione.voto));

// testo piccolo con l'icona del calendario (date e anni)
const conCalendario = (testo, classi = "") =>
    el("small", { class: `text-secondary ${classi}`.trim() }, icona("bi-calendar3", "me-1"), testo);

// apre un elemento sia col click sia con Invio/Spazio (card con role="button")
function suAttivazione(contenitore, selettore, azione) {
    contenitore.addEventListener("click", (event) => {
        const elemento = event.target.closest(selettore);
        if (elemento) azione(elemento);
    });
    contenitore.addEventListener("keydown", (event) => {
        const elemento = event.target.closest(selettore);
        if (elemento && (event.key === "Enter" || event.key === " ")) {
            event.preventDefault();
            azione(elemento);
        }
    });
}


// === Menu mobile: si chiude dopo il click su un link ===
const menu = document.getElementById("menu");

menu.addEventListener("click", (event) => {
    if (event.target.closest(".nav-link") && menu.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
});


// === Tema chiaro / scuro ===
// .dark sul body attiva i colori scuri del nostro CSS;
// data-bs-theme="dark" su <html> fa scurire anche i componenti Bootstrap (form, modal, accordion).
const bottoneTema = document.getElementById("toggle-tema");

function applicaTema(scuro) {
    document.body.classList.toggle("dark", scuro);
    document.documentElement.dataset.bsTheme = scuro ? "dark" : "light";

    bottoneTema.replaceChildren(icona(scuro ? "bi-sun" : "bi-moon-stars"));
    bottoneTema.setAttribute("aria-label", scuro ? "Passa al tema chiaro" : "Passa al tema scuro");
    bottoneTema.setAttribute("aria-pressed", scuro);
}

// la scelta resta salvata tra una pagina e l'altra; in navigazione privata
// lo storage può non esserci, quindi try/catch e il tema vale solo per la visita
function temaSalvato() {
    try {
        return localStorage.getItem("atelier-tema") === "scuro";
    } catch {
        return false;
    }
}

applicaTema(temaSalvato());

bottoneTema.addEventListener("click", () => {
    const scuro = !document.body.classList.contains("dark");
    applicaTema(scuro);
    try {
        localStorage.setItem("atelier-tema", scuro ? "scuro" : "chiaro");
    } catch {
        // storage non disponibile: nessun problema
    }
});
