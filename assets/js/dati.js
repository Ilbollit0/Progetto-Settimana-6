// Atelier — dati del sito
// Tutti i contenuti stanno qui: le pagine li "stampano" in HTML con JavaScript.
// Lo studio è fittizio, quindi lavori e recensioni sono dimostrativi.


// === Servizi (card in home + pagina servizio.html?id=...) ===
const servizi = [
    {
        id: "residenziale",
        icona: "bi-house-door",
        titolo: "Progettazione residenziale",
        breve: "Case private, ville e ristrutturazioni domestiche, dal sopralluogo alla consegna delle chiavi.",
        intro: "Una casa nasce da come la vivrai. Prima di disegnare una linea ascoltiamo abitudini, ritmi e desideri di chi la abiterà.",
        approccio: [
            "Partiamo da un'intervista: chi vive la casa, come passa le giornate, cosa non funziona nello spazio attuale.",
            "Studiamo il lotto o l'immobile: orientamento, luce naturale, vincoli urbanistici del Comune.",
            "Ogni proposta arriva con piante, viste 3D e una stima dei costi, così decidi con tutti gli elementi in mano."
        ],
        fasi: [
            { titolo: "Sopralluogo e ascolto", testo: "Visitiamo il luogo con te e raccogliamo esigenze, budget e tempi." },
            { titolo: "Concept", testo: "Due o tre ipotesi di distribuzione degli spazi da confrontare insieme." },
            { titolo: "Progetto definitivo", testo: "Disegni tecnici, scelta dei materiali e pratiche edilizie necessarie." },
            { titolo: "Cantiere e consegna", testo: "Direzione lavori fino alla consegna delle chiavi." }
        ],
        faq: [
            { domanda: "Quanto dura la progettazione di una casa?", risposta: "Dipende dalla dimensione e dai permessi necessari: lo definiamo insieme dopo il sopralluogo e lo scriviamo nel preventivo, con le tappe principali." },
            { domanda: "Seguite anche le pratiche in Comune?", risposta: "Sì. Individuiamo il titolo edilizio corretto per il tuo intervento e lo prepariamo noi, firmato da un tecnico abilitato." },
            { domanda: "Posso cambiare idea durante il progetto?", risposta: "Certo, soprattutto nella fase di concept. Più avanti ogni modifica viene valutata insieme a te su costi e tempi prima di procedere." },
            { domanda: "Il primo incontro è a pagamento?", risposta: "Il primo colloquio conoscitivo è gratuito: ci serve per capire il progetto e prepararti un preventivo chiaro." }
        ]
    },
    {
        id: "interior",
        icona: "bi-lamp",
        titolo: "Interior design",
        breve: "Allestimenti d'interno per case e uffici, con materiali selezionati e arredo su misura.",
        intro: "Gli interni sono il luogo dove passi il tempo davvero. Li progettiamo partendo da te: il tuo modo di vivere, i tuoi oggetti, la tua luce.",
        approccio: [
            "Ogni cliente è diverso: c'è chi vuole uno stile preciso e chi ha solo una sensazione. In entrambi i casi partiamo da una moodboard costruita insieme.",
            "Rispettiamo quello che hai già: mobili, oggetti e ricordi da tenere entrano nel progetto, non vengono sostituiti per forza.",
            "Scegliamo materiali e finiture dal vivo, con campioni in studio, così vedi e tocchi prima di decidere.",
            "L'arredo su misura lo disegniamo noi e lo seguiamo con artigiani di fiducia fino al montaggio."
        ],
        fasi: [
            { titolo: "Incontro e moodboard", testo: "Raccogliamo gusti, riferimenti e il budget per gli arredi." },
            { titolo: "Layout e illuminazione", testo: "Disposizione degli arredi e progetto della luce, naturale e artificiale." },
            { titolo: "Materiali e su misura", testo: "Campioni, finiture, tessuti e disegni esecutivi degli arredi." },
            { titolo: "Allestimento", testo: "Coordiniamo forniture e montaggi fino all'ultimo dettaglio." }
        ],
        faq: [
            { domanda: "Lavorate anche su una sola stanza?", risposta: "Sì: un soggiorno, una cucina o un ufficio singolo sono progetti che seguiamo volentieri." },
            { domanda: "Devo cambiare tutti i mobili?", risposta: "No. Teniamo i pezzi a cui sei legato e progettiamo il resto intorno a loro." },
            { domanda: "Come capisco lo stile giusto per me?", risposta: "Con la moodboard: immagini, materiali e colori che scegliamo insieme al primo incontro. Diventa il riferimento per tutte le decisioni successive." },
            { domanda: "Vi occupate anche degli acquisti?", risposta: "Possiamo gestire ordini e forniture per te, oppure darti una lista dettagliata se preferisci acquistare in autonomia." }
        ]
    },
    {
        id: "ristrutturazioni",
        icona: "bi-bricks",
        titolo: "Ristrutturazioni",
        breve: "Riqualificazione di spazi esistenti, gestione dei lavori e coordinamento con le imprese.",
        intro: "Ristrutturare significa dare nuova vita a ciò che esiste. Il nostro compito è farlo senza sorprese: tempi, costi e permessi chiari fin dall'inizio.",
        approccio: [
            "Partiamo dal rilievo dello stato di fatto: misure, impianti, eventuali criticità strutturali.",
            "Ti diciamo subito quale pratica edilizia serve per i lavori che vuoi fare, così non ci sono blocchi a cantiere aperto.",
            "Confrontiamo più preventivi di imprese e ti aiutiamo a leggerli voce per voce.",
            "Durante il cantiere sei aggiornato con report periodici e foto dell'avanzamento."
        ],
        fasi: [
            { titolo: "Rilievo", testo: "Misuriamo e documentiamo lo stato attuale dell'immobile." },
            { titolo: "Progetto e pratiche", testo: "Progetto della ristrutturazione e titolo edilizio corretto." },
            { titolo: "Scelta dell'impresa", testo: "Capitolato, raccolta preventivi e confronto con te." },
            { titolo: "Direzione lavori", testo: "Controllo del cantiere, qualità e tempi fino al collaudo." }
        ],
        faq: [
            { domanda: "Che permessi servono per ristrutturare casa?", risposta: "Dipende dai lavori. Per la manutenzione straordinaria di solito basta la CILA, asseverata da un tecnico; interventi più rilevanti richiedono la SCIA; nuove costruzioni e le ristrutturazioni più pesanti richiedono il permesso di costruire. Verifichiamo il tuo caso con il regolamento del tuo Comune." },
            { domanda: "Posso vivere in casa durante i lavori?", risposta: "Dipende dall'entità dell'intervento. A volte si può organizzare il cantiere per zone: lo valutiamo insieme in fase di progetto." },
            { domanda: "Scegliete voi l'impresa?", risposta: "Ti proponiamo imprese con cui abbiamo già lavorato, ma la scelta finale è sempre tua, dopo il confronto dei preventivi." },
            { domanda: "Ci sono agevolazioni fiscali?", risposta: "Le agevolazioni cambiano spesso: le verifichiamo con il tuo commercialista in base alle regole in vigore al momento dei lavori." }
        ]
    }
];


// === Lavori (sezione #lavori, filtrabili) ===
// Foto da Unsplash (licenza Unsplash, uso gratuito)
const lavori = [
    { id: 1, titolo: "Soggiorno luminoso", categoria: "interni", anno: 2025, foto: "1742367539759-6e4fc2e39209", fonte: "Hu_6KP4m9xA", descrizione: "Living open space dal design minimale: superfici chiare, libreria a tutta parete e illuminazione a soffitto integrata." },
    { id: 2, titolo: "Living in toni neutri", categoria: "interni", anno: 2024, foto: "1761330439714-3f33c66e10a9", fonte: "xVZYJePklnk", descrizione: "Arredo essenziale e palette calda: pochi elementi scelti, tessuti morbidi e boiserie a doghe verticali." },
    { id: 3, titolo: "Appartamento arioso", categoria: "interni", anno: 2023, foto: "1754613307941-029aa358987e", fonte: "eLMSYhpAGEI", descrizione: "Spazi chiari e luce naturale filtrata da tende leggere, con infissi neri a contrasto." },
    { id: 4, titolo: "Living a colori", categoria: "interni", anno: 2022, foto: "1783961859503-2f6cd85f6e87", fonte: "IGTzLb0QMvA", descrizione: "Parete geometrica dipinta, piante e mobili vintage per un soggiorno pieno di carattere." },
    { id: 5, titolo: "Casa con giardino", categoria: "esterni", anno: 2025, foto: "1758448756207-54505680d130", fonte: "eWOgoFHlE8g", descrizione: "Grandi vetrate a tutta altezza aprono la casa sul verde; facciata in pietra e cemento." },
    { id: 6, titolo: "Villa con piscina", categoria: "esterni", anno: 2023, foto: "1613977257363-707ba9348227", fonte: "Id7u0EkTjBE", descrizione: "Volumi bianchi, terrazze e piscina con area relax esterna." },
    { id: 7, titolo: "Residenza in mattoni", categoria: "palazzi", anno: 2024, foto: "1763441344610-9c0946421fb2", fonte: "90kZ3TlPhho", descrizione: "Edificio residenziale in mattoni con facciata giocata su luci e ombre." },
    { id: 8, titolo: "Condominio con balconi", categoria: "palazzi", anno: 2022, foto: "1757372429884-92e02350c5d9", fonte: "9NNAR40GXVM", descrizione: "Facciata moderna con balconi continui e parapetti a lamelle." },
    { id: 9, titolo: "Complesso residenziale", categoria: "palazzi", anno: 2021, foto: "1755896487242-23cb0847e493", fonte: "pQVGCKktYUY", descrizione: "Edificio a più piani con balconi in serie su tutta la facciata." }
];

const categorie = {
    interni: "Interni",
    esterni: "Esterni",
    palazzi: "Palazzi"
};


// === Recensioni (carousel) ===
const recensioni = [
    { id: 1, nome: "Giulia R.", servizio: "interior", data: "2025-09-14", voto: 5, testo: "Avevamo un soggiorno buio e pieno di mobili spaiati. Atelier ha tenuto la credenza della nonna e ci ha costruito intorno tutto il progetto: luci nuove, una libreria su misura e colori caldi. Ogni scelta ci è stata spiegata con campioni alla mano. Oggi è la stanza dove passiamo più tempo." },
    { id: 2, nome: "Marco e Elena T.", servizio: "ristrutturazioni", data: "2025-06-02", voto: 5, testo: "Ristrutturazione completa di un appartamento anni '70. Ci hanno detto subito quale pratica serviva e quanto tempo avrebbe richiesto. I report settimanali con le foto del cantiere ci hanno tranquillizzati, visto che lavoravamo fuori città. Consegna puntuale." },
    { id: 3, nome: "Studio Ferri", servizio: "interior", data: "2025-03-21", voto: 4, testo: "Ci serviva un ufficio accogliente per i clienti ma funzionale per otto persone. Il risultato è molto bello e l'acustica è migliorata tantissimo. Unica nota: la fornitura delle sedute ha avuto un ritardo di qualche settimana, comunque gestito bene dallo studio." },
    { id: 4, nome: "Alessandro P.", servizio: "residenziale", data: "2024-11-08", voto: 5, testo: "Progettazione della nostra casa con giardino. Dal primo incontro hanno voluto capire come viviamo: chi lavora da casa, dove giocano i bambini, dove vogliamo la luce al mattino. Le viste 3D ci hanno aiutato tantissimo a decidere." },
    { id: 5, nome: "Chiara M.", servizio: "ristrutturazioni", data: "2024-07-19", voto: 4, testo: "Rifacimento di bagno e cucina. Ottimo il confronto dei preventivi: ci hanno spiegato voce per voce cosa cambiava tra un'impresa e l'altra. Il cantiere è durato un po' più del previsto, ma siamo stati sempre informati." },
    { id: 6, nome: "Famiglia Bianchi", servizio: "residenziale", data: "2024-02-27", voto: 5, testo: "Volevamo ampliare la casa senza stravolgerla. Hanno trovato una soluzione che rispetta il carattere dell'edificio originale e si sono occupati di tutte le pratiche in Comune. Professionali e sempre disponibili." }
];
