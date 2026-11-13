// Atelier — home page (servizi, lavori, recensioni, form)
// Dati da dati.js; helper (el, icona, stelle, trovaPerId...) da comune.js.
// Nessun innerHTML: gli elementi si creano con el() e si sostituiscono con replaceChildren().


// === Servizi: card che portano a servizio.html?id=... ===
document.getElementById("griglia-servizi").replaceChildren(...servizi.map((servizio) =>
    el("div", { class: "col-12 col-md-4" },
        el("article", { class: "card card-elevata card-servizio h-100 text-center p-4" },
            icona(servizio.icona, "fs-1 text-primary mb-2"),
            el("h3", { class: "h5 fw-bold" }, servizio.titolo),
            el("p", { class: "text-secondary" }, servizio.breve),
            el("a", { href: linkServizio(servizio.id), class: "stretched-link fw-semibold text-decoration-none mt-auto vai" },
                "Scopri come lavoriamo ", icona("bi-arrow-right"))))));


// === Lavori: filter sull'array + re-render ===
const grigliaLavori = document.getElementById("griglia-lavori");
const filtri = document.getElementById("filtri");
const conteggioLavori = document.getElementById("conteggio-lavori");

const cardLavoro = (lavoro) =>
    el("div", { class: "col-12 col-sm-6 col-lg-4" },
        el("article", {
            class: "card card-elevata lavoro-card h-100 overflow-hidden",
            tabindex: "0",
            role: "button",
            "aria-label": `Dettagli: ${lavoro.titolo}`,
            dataset: { id: lavoro.id }
        },
            el("img", {
                src: fotoUrl(lavoro.foto, 600),
                srcset: [400, 600, 800].map((w) => `${fotoUrl(lavoro.foto, w)} ${w}w`).join(", "),
                sizes: "(min-width: 992px) 360px, (min-width: 576px) 50vw, 100vw",
                width: "600",
                height: "450",
                class: "card-img-top",
                alt: lavoro.titolo,
                loading: "lazy",
                decoding: "async"
            }),
            el("div", { class: "card-body" },
                el("div", { class: "d-flex justify-content-between align-items-center mb-2" },
                    el("span", { class: "badge bg-primary" }, categorie[lavoro.categoria]),
                    el("small", { class: "text-secondary" }, lavoro.anno)),
                el("h3", { class: "h6 fw-bold mb-0" }, lavoro.titolo))));

function renderLavori(filtro) {
    const daMostrare = lavori.filter((lavoro) => filtro === "tutti" || lavoro.categoria === filtro);
    grigliaLavori.replaceChildren(...daMostrare.map(cardLavoro));
    conteggioLavori.textContent = `${daMostrare.length} ${daMostrare.length === 1 ? "progetto" : "progetti"}`;
}

// event delegation: un solo listener per tutti i bottoni filtro
filtri.addEventListener("click", (event) => {
    const bottone = event.target.closest("[data-filtro]");
    if (!bottone) return;

    for (const b of filtri.querySelectorAll("[data-filtro]")) {
        b.classList.toggle("active", b === bottone);
        b.setAttribute("aria-pressed", b === bottone);
    }
    renderLavori(bottone.dataset.filtro);
});

renderLavori("tutti");


// === Modal: un helper per riempire titolo + corpo e aprirlo ===
function creaModal(id) {
    const elemento = document.getElementById(id);
    const istanza = new bootstrap.Modal(elemento);
    return {
        elemento,
        apri(titolo, ...contenuto) {
            elemento.querySelector(".modal-title").textContent = titolo;
            elemento.querySelector(".modal-body").replaceChildren(...contenuto);
            istanza.show();
        }
    };
}

const modalLavoro = creaModal("modal-lavoro");
const modalRecensione = creaModal("modal-recensione");


// === Dettagli lavoro (click o Invio/Spazio sulla card) ===
suAttivazione(grigliaLavori, ".lavoro-card", (card) => {
    const lavoro = trovaPerId(lavori, Number(card.dataset.id));

    modalLavoro.apri(lavoro.titolo,
        el("img", {
            src: fotoUrl(lavoro.foto, 1200),
            width: "1200",
            height: "800",
            class: "img-fluid w-100 rounded mb-3 modal-lavoro-img",
            alt: lavoro.titolo
        }),
        el("div", { class: "d-flex gap-2 align-items-center mb-3" },
            el("span", { class: "badge bg-primary" }, categorie[lavoro.categoria]),
            conCalendario(lavoro.anno)),
        el("p", {}, lavoro.descrizione),
        el("a", { class: "small text-secondary", href: `https://unsplash.com/photos/${lavoro.fonte}`, target: "_blank", rel: "noopener" },
            "Foto: Unsplash"));
});


// === Recensioni: carousel Bootstrap ===
// Card per slide in base allo schermo: 3 desktop, 2 tablet, 1 mobile.
const carouselEl = document.getElementById("carousel-recensioni");
const slideRecensioni = document.getElementById("slide-recensioni");
const indicatoriRecensioni = document.getElementById("indicatori-recensioni");
const schermoLg = window.matchMedia("(min-width: 992px)");
const schermoMd = window.matchMedia("(min-width: 768px)");

const cardPerSlide = () => (schermoLg.matches ? 3 : schermoMd.matches ? 2 : 1);

const cardRecensione = (recensione) =>
    el("div", { class: "col d-flex" },
        el("article", {
            class: "recensione-card p-4",
            tabindex: "0",
            role: "button",
            "aria-label": `Leggi la recensione completa di ${recensione.nome}`,
            dataset: { id: recensione.id }
        },
            testataRecensione(recensione),
            el("span", { class: "badge bg-primary mb-3" }, trovaServizio(recensione.servizio).titolo),
            el("p", { class: "estratto mb-3" }, recensione.testo),
            conCalendario(formattaData(recensione.data))));

function renderRecensioni() {
    const perSlide = cardPerSlide();
    const gruppi = [];
    for (let i = 0; i < recensioni.length; i += perSlide) {
        gruppi.push(recensioni.slice(i, i + perSlide));
    }

    slideRecensioni.replaceChildren(...gruppi.map((gruppo, i) =>
        el("div", { class: i === 0 ? "carousel-item active" : "carousel-item" },
            el("div", { class: `row row-cols-${perSlide} g-4` }, gruppo.map(cardRecensione)))));

    indicatoriRecensioni.replaceChildren(...gruppi.map((gruppo, i) =>
        el("button", {
            type: "button",
            "data-bs-target": "#carousel-recensioni",
            "data-bs-slide-to": i,
            class: i === 0 ? "active" : null,
            "aria-current": i === 0 ? "true" : null,
            "aria-label": `Recensioni, gruppo ${i + 1}`
        })));

    // nuove slide = nuova istanza del carousel
    bootstrap.Carousel.getInstance(carouselEl)?.dispose();
    new bootstrap.Carousel(carouselEl, {
        interval: 5000,
        ride: "carousel", // parte da solo al caricamento
        pause: "hover"    // si ferma col mouse sopra
    });
}

renderRecensioni();
schermoLg.addEventListener("change", renderRecensioni);
schermoMd.addEventListener("change", renderRecensioni);

// click (o Invio/Spazio) su una card -> recensione completa
suAttivazione(slideRecensioni, ".recensione-card", (card) => {
    const recensione = trovaPerId(recensioni, Number(card.dataset.id));
    const servizio = trovaServizio(recensione.servizio);

    modalRecensione.apri(recensione.nome,
        el("div", { class: "d-flex align-items-center gap-2 mb-3 fs-5" },
            stelle(recensione.voto),
            el("span", { class: "fw-semibold" }, `${recensione.voto}/5`)),
        el("dl", { class: "row small mb-3" },
            el("dt", { class: "col-5 col-sm-4" }, "Data"),
            el("dd", { class: "col-7 col-sm-8" }, formattaData(recensione.data)),
            el("dt", { class: "col-5 col-sm-4" }, "Servizio ricevuto"),
            el("dd", { class: "col-7 col-sm-8" },
                el("a", { href: linkServizio(servizio.id), class: "text-primary" }, servizio.titolo))),
        el("blockquote", { class: "mb-0" },
            icona("bi-quote", "fs-2 text-primary"),
            el("p", { class: "mb-0" }, recensione.testo)));
});

// mentre leggi la recensione il carousel resta fermo
modalRecensione.elemento.addEventListener("show.bs.modal", () => bootstrap.Carousel.getInstance(carouselEl).pause());
modalRecensione.elemento.addEventListener("hidden.bs.modal", () => bootstrap.Carousel.getInstance(carouselEl).cycle());


// === Form contatti: validazione JS ===
const form = document.getElementById("form-contatti");
const esito = document.getElementById("form-esito");
const campi = {
    nome: document.getElementById("nome"),
    email: document.getElementById("email"),
    tipo: document.getElementById("tipo"),
    messaggio: document.getElementById("messaggio")
};
const contatore = document.getElementById("contatore-messaggio");
const MIN_CARATTERI = 20;

// opzioni della select dagli stessi dati dei servizi (new Option = testo, valore)
campi.tipo.append(...servizi.map((s) => new Option(s.titolo, s.id)));

// arrivando da servizio.html il tipo è già selezionato (index.html?tipo=interior#contatti)
const tipoDaUrl = new URLSearchParams(location.search).get("tipo");
if (trovaServizio(tipoDaUrl)) campi.tipo.value = tipoDaUrl;

function aggiornaContatore() {
    const lunghezza = campi.messaggio.value.trim().length;
    contatore.textContent = `${lunghezza}/${MIN_CARATTERI} caratteri minimi`;
    contatore.classList.toggle("text-success", lunghezza >= MIN_CARATTERI);
}
campi.messaggio.addEventListener("input", aggiornaContatore);
aggiornaContatore();

// ogni regola: campo, test e messaggio d'errore
const regole = [
    { campo: campi.nome, valido: (v) => v !== "", errore: "Inserisci il tuo nome." },
    { campo: campi.email, valido: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), errore: "L'email deve contenere una @ e un dominio (es. nome@esempio.it)." },
    { campo: campi.tipo, valido: (v) => v !== "", errore: "Scegli un tipo di progetto." },
    { campo: campi.messaggio, valido: (v) => v.length >= MIN_CARATTERI, errore: `Il messaggio deve avere almeno ${MIN_CARATTERI} caratteri.` }
];

function mostraEsito(tipo, ...contenuto) {
    esito.className = `alert alert-${tipo} mt-3`;
    esito.replaceChildren(...contenuto);
}

form.addEventListener("submit", (event) => {
    event.preventDefault(); // niente backend: la pagina non si ricarica

    const errori = regole.filter((regola) => {
        const ok = regola.valido(regola.campo.value.trim());
        regola.campo.classList.toggle("is-invalid", !ok);
        regola.campo.classList.toggle("is-valid", ok);
        return !ok;
    });

    if (errori.length > 0) {
        mostraEsito("danger",
            el("strong", {}, "Controlla il form:"),
            el("ul", { class: "mb-0 mt-1" }, errori.map((e) => el("li", {}, e.errore))));
        errori[0].campo.focus();
        return;
    }

    // il nome lo scrive l'utente: finisce in un nodo di testo, quindi non può diventare HTML
    mostraEsito("success", `Grazie ${campi.nome.value.trim()}! Il messaggio è stato inviato, ti rispondiamo entro 48 ore.`);
    form.reset();
    for (const regola of regole) regola.campo.classList.remove("is-valid");
    aggiornaContatore();
});
