# 🎧 Cypress Intercept Assignments

Tieto úlohy ťa naučia zachytávať (`cy.intercept`) a mockovať REST API v Next.js aplikácii.  

---

## 1️⃣ Spotify Crash Landing — základný intercept

**Cieľ:**  
Otestuj, že domovská stránka správne zobrazí albumy, aj keď backend „spadol“.

**Mock:**

```ts
cy.intercept("GET", "/api/albums", { statusCode: 500 });
```

**Testuj:**  
- zobrazí sa chybová hláška „Ups, nepodarilo sa načítať albumy“  
- UI nezostane prázdne alebo zamrznuté

💡 **Čerešnička:**  
Pridaj loader/spinner počas načítania a otestuj, že zmizne po `cy.wait('@getAlbums')`.

---

## 2️⃣ Mystery Author — partial mock

**Cieľ:**  
Backend vráti album bez autora. Otestuj, že UI reaguje graciózne.

**Mock:**

```ts
cy.intercept("GET", "/api/albums", {
  body: [{ id: 1, name: "Nameless Album", author_name: null, release_date: "2024-12-24" }]
});
```

**Testuj:**  
- zobrazenie fallback textu: „Unknown author“  
- klik na detail nevyhodí chybu

💡 **Čerešnička:**  
Pridaj na UI emoji „🤷‍♂️“ pre albumy bez autora.

---

## 3️⃣ Time Traveller — dynamický mock

**Cieľ:**  
Otestuj, že stránka správne zoradí albumy podľa dátumu vydania.

**Mock:**

```ts
const now = new Date().toISOString();
const past = "1999-01-01";
cy.intercept("GET", "/api/albums", {
  body: [
    { id: 1, name: "Future Hit", release_date: now, author_name: "DJ AI" },
    { id: 2, name: "Old Classic", release_date: past, author_name: "Retro Band" }
  ]
});
```

**Testuj:**  
- že „Future Hit“ je v zozname nad „Old Classic“

💡 **Čerešnička:**  
Pridaj na UI značku „🔥 New Release“ pre albumy z aktuálneho roka.

---

## 4️⃣ Author’s Solo Career

**Cieľ:**  
Na stránke autora otestuj, že sa zobrazí zoznam jeho albumov.

**Mock:**

```ts
cy.intercept("GET", "/api/authors/7", {
  body: { id: 7, name: "Taylor Mocked" }
});
cy.intercept("GET", "/api/authors/7/albums", {
  body: [
    { id: 1, name: "Mock it Off", release_date: "2022-05-01" },
    { id: 2, name: "Blank Test", release_date: "2023-02-14" }
  ]
});
```

**Testuj:**  
- správne meno autora  
- 2 albumy v zozname

💡 **Čerešnička:**  
Otestuj klik na album a over, že URL sa zmení na `/album/1`.

---

## 5️⃣ Search Like a Hacker

**Cieľ:**  
Otestuj, že vyhľadávanie (`/search?q=`) zobrazuje výsledky pre rôzne entity.

**Mock:**

Interceptni `/api/search/*` a vráť `songs`, `albums`, `authors`.

**Testuj:**  
- že sa zobrazia všetky tri sekcie  
- že každá sekcia má aspoň 1 výsledok

💡 **Čerešnička:**  
Ak query obsahuje `1337`, vráť špeciálny mock s „Leet Song 🎧“.

---

## 6️⃣ 404 - Lost Album

**Cieľ:**  
Otestuj stránku `/album/404`, kde API vráti `null`.

**Mock:**

```ts
cy.intercept("GET", "/api/albums/404", { body: null, statusCode: 404 });
```

**Testuj:**  
- zobrazenie textu „Album not found“  
- že stránka nepadne

💡 **Čerešnička:**  
Zobraz na UI tlačidlo „Back to reality 🚪“.
