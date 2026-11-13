// Atelier — pagina servizio.html?id=...
// Legge l'id dall'URL, trova il servizio in dati.js e costruisce la pagina con el() (niente innerHTML).

const pagina = document.getElementById("pagina-servizio");
const servizio = trovaServizio(new URLSearchParams(location.search).get("id"));

// link ai servizi nel footer
document.getElementById("footer-servizi").replaceChildren(...servizi.map((s) =>
    el("li", {}, el("a", { class: "link-footer text-decoration-none", href: linkServizio(s.id) }, s.titolo))));

// sezione con contenitore e titolo centrato, usata più volte
const sezione = (classi, titolo, ...contenuto) =>
    el("section", { class: `py-5 ${classi}`.trim() },
        el("div", { class: "container" },
            titolo && el("h2", { class: "fw-bold text-center mb-4" }, titolo),
            contenuto));


// --- blocchi della pagina ---

const intestazione = (s) =>
    el("section", { class: "servizio-hero bg-primary text-white d-flex align-items-center text-center" },
        el("div", { class: "container py-5" },
            icona(s.icona, "display-4"),
            el("h1", { class: "fw-bold mt-2" }, s.titolo),
            el("p", { class: "lead mb-0 mx-auto testo-stretto" }, s.intro)));

const approccio = (s) =>
    sezione("", null,
        el("nav", { "aria-label": "breadcrumb" },
            el("ol", { class: "breadcrumb" },
                el("li", { class: "breadcrumb-item" }, el("a", { class: "text-primary", href: "index.html#servizi" }, "Servizi")),
                el("li", { class: "breadcrumb-item active", "aria-current": "page" }, s.titolo))),
        el("div", { class: "row g-5" },
            el("div", { class: "col-12 col-lg-6" },
                el("h2", { class: "fw-bold h3 mb-3" }, "Come lavoriamo con te"),
                el("ul", { class: "list-unstyled" }, s.approccio.map((punto) =>
                    el("li", { class: "d-flex gap-2 mb-3" },
                        icona("bi-check2-circle", "text-primary fs-5"),
                        el("span", {}, punto))))),
            el("div", { class: "col-12 col-lg-6" },
                el("h2", { class: "fw-bold h3 mb-3" }, "Le fasi del progetto"),
                el("ol", { class: "list-unstyled" }, s.fasi.map((fase, i) =>
                    el("li", { class: "d-flex gap-3 mb-4" },
                        el("span", { class: "fase-numero", "aria-hidden": "true" }, i + 1),
                        el("div", {},
                            el("h3", { class: "h6 fw-bold mb-1" }, fase.titolo),
                            el("p", { class: "text-secondary mb-0" }, fase.testo))))))));

// accordion Bootstrap: la prima domanda è aperta
const faq = (s) =>
    sezione("bg-body-tertiary", "Domande frequenti",
        el("div", { class: "accordion col-12 col-lg-8 mx-auto", id: "faq" }, s.faq.map((voce, i) =>
            el("div", { class: "accordion-item" },
                el("h3", { class: "accordion-header" },
                    el("button", {
                        class: i === 0 ? "accordion-button" : "accordion-button collapsed",
                        type: "button",
                        "data-bs-toggle": "collapse",
                        "data-bs-target": `#faq-${i}`,
                        "aria-expanded": String(i === 0), // stringa: false da solo verrebbe saltato
                        "aria-controls": `faq-${i}`
                    }, voce.domanda)),
                el("div", { id: `faq-${i}`, class: i === 0 ? "accordion-collapse collapse show" : "accordion-collapse collapse", "data-bs-parent": "#faq" },
                    el("div", { class: "accordion-body" }, voce.risposta))))));

function recensioniServizio(s) {
    const scelte = recensioni.filter((r) => r.servizio === s.id);
    if (scelte.length === 0) return null;

    return sezione("", "Chi l'ha già scelto",
        el("div", { class: "row g-4" }, scelte.map((r) =>
            el("div", { class: "col-12 col-md-6" },
                el("article", { class: "card card-elevata h-100 p-4" },
                    testataRecensione(r),
                    el("p", { class: "mb-3" }, r.testo),
                    conCalendario(formattaData(r.data), "mt-auto"))))));
}

// call to action: porta al form con il tipo già selezionato
const invito = (s) =>
    sezione("bg-primary text-white text-center", null,
        el("h2", { class: "fw-bold" }, "Parliamo del tuo progetto"),
        el("p", { class: "mb-4" }, "Il primo colloquio è gratuito."),
        el("a", { href: `index.html?tipo=${encodeURIComponent(s.id)}#contatti`, class: "btn btn-outline-light btn-lg" }, "Richiedi un preventivo"));


// --- render ---

if (servizio) {
    document.title = `${servizio.titolo} — Atelier`;
    pagina.replaceChildren(
        intestazione(servizio),
        approccio(servizio),
        faq(servizio),
        recensioniServizio(servizio) ?? "",
        invito(servizio));
} else {
    // id mancante o sbagliato
    pagina.replaceChildren(
        el("section", { class: "container py-5 text-center" },
            el("h1", { class: "fw-bold" }, "Servizio non trovato"),
            el("p", { class: "text-secondary" }, "Il servizio che cerchi non esiste. Scegli uno di questi:"),
            el("div", { class: "d-flex flex-wrap justify-content-center gap-2" }, servizi.map((s) =>
                el("a", { class: "btn btn-outline-primary", href: linkServizio(s.id) }, s.titolo)))));
}
