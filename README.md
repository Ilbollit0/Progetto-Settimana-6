# Atelier — Studio di architettura

Week Project della **Settimana VI**: il sito one-page di *Atelier*, uno studio di architettura fittizio, costruito con **Bootstrap 5.3**, **CSS** e **JavaScript** senza framework.

Il sito risponde alle quattro domande di un sito aziendale: **chi sei** (hero), **cosa offri** (servizi), **alcuni lavori** (portfolio filtrabile) e **come ti contattano** (form). Poi aggiunge una pagina di dettaglio per ogni servizio e un carousel di recensioni.

## Come si avvia

Non serve installare niente: basta aprire `index.html` nel browser. Bootstrap e Bootstrap Icons arrivano da CDN, le foto da Unsplash.

```
├── index.html          home one-page
├── servizio.html       pagina dettaglio, generata da JS (servizio.html?id=interior)
└── assets/
    ├── css/style.css   tema: colori brand, card, carousel, tema scuro
    └── js/
        ├── dati.js     contenuti: servizi, lavori, recensioni
        ├── comune.js   utility + navbar + tema chiaro/scuro (tutte le pagine)
        ├── script.js   home: servizi, filtro lavori, carousel, form
        └── servizio.js pagina servizio
```

I contenuti stanno tutti in **`dati.js`**. Le pagine li trasformano in elementi HTML con JavaScript, usando le DOM API (`createElement`, `replaceChildren`) e **mai `innerHTML`** (vedi sotto). Per aggiungere un lavoro, una recensione o una FAQ basta aggiungere un oggetto all'array, senza toccare l'HTML.

## Cosa fa il sito

| Sezione | Cosa succede |
|---|---|
| **Navbar** | Sticky, con hamburger sotto i 768px. Il menu mobile si chiude da solo dopo il click su un link. Ha anche il bottone 🌙/☀️ per il tema. |
| **Hero** `#studio` | Alta l'80% dello schermo, contenuto centrato con le utility flex, CTA verso il form. |
| **Servizi** `#servizi` | 3 card, una sotto l'altra su mobile e affiancate da tablet in su. Ogni card apre la sua **pagina di dettaglio**. |
| **Lavori** `#lavori` | 9 progetti (foto, titolo, anno, categoria) con filtri **Tutti / Interni / Esterni / Palazzi** e contatore. Il click su una card apre un **modal** con la foto grande e la descrizione. |
| **Recensioni** `#recensioni` | **Carousel** che scorre da solo. Passando col mouse si ferma e la card puntata si solleva. Il click apre la recensione completa: voto, data, servizio ricevuto. |
| **Contatti** `#contatti` | Form con validazione JS: errore su ogni campo, `alert-danger` con l'elenco degli errori, `alert-success` quando è tutto ok. |
| **Pagina servizio** | Come lo studio lavora con il cliente, le fasi del progetto, le **FAQ** (accordion), le recensioni di quel servizio e una CTA che apre il form con il tipo di progetto già selezionato. |
| **Tema scuro** | Il bottone in navbar passa da tema chiaro a scuro e viceversa. La scelta resta salvata anche cambiando pagina. |

## Rispetto alla traccia

### Versione Base: fatta
Navbar `navbar-expand-md` sticky, hero `min-height: 80vh`, 3 card dei servizi `col-12 col-md-4`, form nel contenitore `col-12 col-md-8 col-lg-6 mx-auto`, footer a 3 colonne con `<hr>` e copyright. I colori del brand sovrascrivono `.btn-primary`, `.bg-primary` e `.text-primary`.

### Versione Intermedia: fatta
- Sezione `#lavori` con card (immagine, titolo, anno, categoria).
- 4 bottoni filtro con **`filter` sull'array** + **re-render** + **event delegation**. Al posto di `innerHTML` uso `replaceChildren()` (vedi "Scelte diverse dalla traccia").
- Toggle del tema in navbar con `classList.toggle("dark")` e blocco CSS `body.dark`. Transizioni al passaggio del mouse da 250ms.

### Versione Avanzata: fatta (tranne la parte SASS)
- **Modal dei dettagli lavoro** al click su una card.
- **Validazione del form**: l'email deve contenere `@` (e un dominio), il messaggio almeno **20 caratteri**, poi `alert-danger` o `alert-success`.

### Scelte diverse dalla traccia
- **CSS invece di SASS.** È stata una scelta precisa. Ogni strumento SASS ha il suo equivalente in CSS:
  | SASS (traccia) | Qui |
  |---|---|
  | `$brand-primary`, `$radius-base` | custom property `--brand-primary`, `--radius-base` in `:root` |
  | nesting | **nesting nativo** CSS (`&:hover`, selettori annidati) |
  | mixin `card-elevata` | selettore condiviso `.card-elevata, .recensione-card` + variabile `--lift` per cambiare l'altezza del sollevamento |
  | mixin `solo-su($bp)` | media query mobile-first scritte dentro il selettore annidato |
  | partial `@use` | il JS è diviso in 4 file con un compito ciascuno |
- **Bootstrap Icons invece di Font Awesome**: è della stessa famiglia di Bootstrap ed è un solo CDN leggero.
- **Niente `innerHTML`.** La traccia lo suggerisce per il re-render, ma `innerHTML` interpreta le stringhe come codice HTML: se un dato contenesse `<img src=x onerror="...">` il browser eseguirebbe lo script (attacco **XSS**). Tutti gli elementi si creano invece con un piccolo helper `el()` in `comune.js`: le stringhe diventano sempre **nodi di testo**. È verificato: scrivendo HTML malevolo nel campo Nome, il messaggio lo mostra come testo e non esegue niente.
- **9 lavori invece di 6**, così ogni filtro mostra più di un risultato.

### Extra non richiesti dalla traccia
- **Pagina di dettaglio per ogni servizio** (`servizio.html?id=...`), generata interamente da JS: approccio con il cliente, fasi numerate, FAQ in accordion, recensioni filtrate per servizio. Se l'id non esiste mostra "Servizio non trovato".
- **Carousel di recensioni responsive**: 3 card per slide su desktop, 2 su tablet, 1 su mobile. Si ricostruisce da solo quando lo schermo cambia breakpoint, e resta fermo mentre leggi una recensione nel modal.
- **CTA "Richiedi un preventivo"** che porta al form con il servizio già selezionato (`index.html?tipo=interior#contatti`).
- **Tema salvato in `localStorage`**. Oltre a `.dark`, il JS imposta `data-bs-theme="dark"`, così Bootstrap scurisce da solo form, modal e accordion.
- **Contatore dei caratteri** del messaggio ed errori mostrati sotto ogni campo.
- **Foto reali** da Unsplash con `srcset`: su mobile il browser scarica la versione da 400px invece di quella da 800px.
- **Accessibilità**: card dei lavori apribili da tastiera (Invio/Spazio), `aria-pressed` sui filtri, `aria-live` sul conteggio dei progetti, focus visibile, `prefers-reduced-motion` per chi preferisce meno animazioni.
- `scroll-margin-top`: le ancore non finiscono sotto la navbar sticky.

## Snippet interessanti

**Creare elementi senza `innerHTML`: l'helper `el()`**
```js
function el(tag, attributi = {}, ...figli) {
    const nodo = document.createElement(tag);
    // ...attributi con setAttribute / dataset...
    for (const figlio of figli.flat()) {
        nodo.append(figlio instanceof Node ? figlio : String(figlio)); // stringa = testo, mai HTML
    }
    return nodo;
}

el("a", { href: "#contatti", class: "btn btn-primary" }, "Inizia un progetto");
```

**Filtro dei lavori: `filter` + re-render + event delegation**
```js
function renderLavori(filtro) {
    const daMostrare = lavori.filter((lavoro) => filtro === "tutti" || lavoro.categoria === filtro);
    grigliaLavori.replaceChildren(...daMostrare.map(cardLavoro));
}

// un solo listener sul contenitore, non uno per bottone
filtri.addEventListener("click", (event) => {
    const bottone = event.target.closest("[data-filtro]");
    if (!bottone) return;
    renderLavori(bottone.dataset.filtro);
});
```

**Pagina servizio generata dall'URL**
```js
const servizio = trovaServizio(new URLSearchParams(location.search).get("id"));

if (servizio) {
    pagina.replaceChildren(
        intestazione(servizio),
        approccio(servizio),
        faq(servizio),
        recensioniServizio(servizio) ?? "",
        invito(servizio));
}
```

**Carousel che cambia il numero di card con lo schermo**
```js
const cardPerSlide = () => (schermoLg.matches ? 3 : schermoMd.matches ? 2 : 1);

bootstrap.Carousel.getInstance(carouselEl)?.dispose();
new bootstrap.Carousel(carouselEl, {
    interval: 5000,
    ride: "carousel", // parte da solo al caricamento
    pause: "hover"    // si ferma col mouse sopra
});
```

**Validazione con un array di regole**
```js
const regole = [
    { campo: campi.email, valido: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), errore: "L'email deve contenere una @..." },
    { campo: campi.messaggio, valido: (v) => v.length >= MIN_CARATTERI, errore: "Almeno 20 caratteri." }
];

const errori = regole.filter((regola) => !regola.valido(regola.campo.value.trim()));
```

**Card che si solleva: una regola sola, altezza diversa con una variabile**
```css
.card-elevata,
.recensione-card {
    transition: transform var(--transition-base), box-shadow var(--transition-base);

    &:hover {
        transform: translateY(var(--lift, -4px));
    }
}

.recensione-card {
    --lift: -8px; /* le recensioni si alzano di più */
}
```

**Tema scuro: classe nostra + color mode di Bootstrap**
```js
function applicaTema(scuro) {
    document.body.classList.toggle("dark", scuro);                       // i nostri colori
    document.documentElement.dataset.bsTheme = scuro ? "dark" : "light"; // i componenti Bootstrap
}
```

## Crediti

- Foto: [Unsplash](https://unsplash.com). Ogni card linka la pagina originale della foto. Sono state usate solo foto con licenza Unsplash gratuita, niente Unsplash+.
- [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/) e [Bootstrap Icons](https://icons.getbootstrap.com/).
- Atelier, i suoi lavori e le recensioni sono **contenuti dimostrativi**. Le FAQ sui titoli edilizi (CILA, SCIA, permesso di costruire) seguono la classificazione del DPR 380/2001, ma sono solo indicative.
