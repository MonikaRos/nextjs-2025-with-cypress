# 🧠 Teória: Cypress Intercept & Mockovanie API

## 💬 Prečo mockujeme API?

V reálnych aplikáciách frontend často závisí od backendu — ale pri testovaní nechceme:
- čakať na reálne API,
- riskovať pády servera,
- manipulovať so skutočnými dátami.

Cypress nám preto umožňuje **interceptovať sieťové požiadavky** a **vrátiť vlastné (mockované) dáta**.  
Tým vieme simulovať rôzne situácie (úspech, chyba, prázdne dáta...) a otestovať správanie UI.

---

## ⚙️ Základný princíp

### 1. Cypress zachytí request
```ts
cy.intercept("GET", "/api/albums", mockData);
```

- **`GET`** – HTTP metóda, ktorú zachytávame  
- **`/api/albums`** – adresa endpointu  
- **`mockData`** – objekt, ktorý vrátime namiesto reálneho API

---

### 2. Aplikácia pošle request
Keď test spustí `cy.visit("/")`, frontend urobí `fetch("/api/albums")` (alebo axios `api.get("/api/albums")`).

---

### 3. Cypress odpovie mockom
Namiesto reálneho backendu odpovie Cypress a UI zareaguje, ako keby to boli skutočné dáta.

---

## 🧩 Typické scenáre, ktoré chceme testovať

| Scenár | Čo simulujeme | Cieľ testu |
|--------|----------------|------------|
| ✅ Úspešné načítanie | API vráti dáta | UI zobrazí zoznam |
| ❌ Chyba servera | status 500 | UI zobrazí chybovú hlášku |
| ⌛ Načítavanie | request trvá dlhšie | UI ukáže loader/spinner |
| 🕳️ Prázdna odpoveď | API vráti `[]` | UI ukáže “Žiadne výsledky” |
| 🧪 Špeciálny prípad | niektoré polia sú `null` | UI zvládne edge case |

---

## 🧱 Štruktúra testu

```ts
describe("Home Page Albums", () => {
  it("intercepts and mocks API", () => {
    // 1️⃣ Zachytenie requestu
    cy.intercept("GET", "/api/albums", {
      statusCode: 200,
      body: [{ id: 1, name: "Mocked Album", author_name: "Mock Artist" }]
    }).as("getAlbums");

    // 2️⃣ Návšteva stránky
    cy.visit("/");

    // 3️⃣ Počkaj, kým sa API zavolá
    cy.wait("@getAlbums");

    // 4️⃣ Over, že UI zobrazilo výsledok
    cy.contains("Mocked Album").should("be.visible");
  });
});
```

---

## 💡 Tipy pre prax

- **Alias (`as`)** – pomenuj intercepty, aby si ich mohol neskôr `wait()`-nuť.
- **Používaj hviezdičku `*`** – ak má endpoint query parametre:  
  ```ts
  cy.intercept("GET", "/api/search*").as("search");
  ```
- **Chceš dynamické mocky?** Použi funkciu:
  ```ts
  cy.intercept("GET", "/api/albums", (req) => {
    req.reply({ body: [{ name: `Mock ${Date.now()}` }] });
  });
  ```
- **Fixtures:** dáta môžeš ukladať do súborov:
  ```
  cypress/fixtures/albums.json
  ```
  a načítať:
  ```ts
  cy.intercept("GET", "/api/albums", { fixture: "albums.json" });
  ```

---

## 🚀 Prečo je to užitočné

- **Rýchlosť:** testy sú nezávislé od backendu  
- **Predvídateľnosť:** dáta sú stabilné a kontrolované  
- **Kreativita:** môžeš simulovať bugy, výpadky, oneskorenia  
- **Zábava:** testy sa dajú “gamifikovať” — vymysli vlastné mock dáta!

---

## 🧃 Bonus: kombinácia interceptu a času

Cypress umožňuje aj manipulovať časom:
```ts
cy.clock();
cy.intercept("GET", "/api/drinks", { fixture: "drinks.json" });
cy.visit("/drinks");
cy.tick(5000); // posunie čas o 5 sekúnd
```

Tým vieš testovať, že sa UI po čase automaticky aktualizuje.

---

## ✅ Zhrnutie

`cy.intercept` je tvoj “tajný agent” v testovaní:
- **zachytí requesty**,
- **nahradí odpoveď**,
- **umožní ti kontrolovať celý flow bez reálneho servera.**

---

🎯 *Cieľ pre túto kapitolu:*  
Po prečítaní by si mal vedieť:
- rozpoznať request, ktorý máš zachytiť,
- pripraviť vlastný mock dát,
- a napísať test, ktorý overí správanie UI pre daný scenár.

---

