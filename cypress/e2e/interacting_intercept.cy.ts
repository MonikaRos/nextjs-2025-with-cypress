describe("Crash Landing – Home Page Error Handling", () => {
  it("shows error message when /api/albums returns 500", () => {
    cy.intercept("GET", "/api/albums", {
      statusCode: 500
    }).as("getAlbumsFail");

    cy.visit("/");

    
    cy.contains(/loading/i).should("be.visible");

    cy.wait("@getAlbumsFail");

    
    cy.contains(/loading/i).should("not.exist");

    
    cy.contains(/ups|chyba|nepodarilo/i).should("be.visible");
  });
});

describe("Mystery Author – Missing Author Name", () => {
  it("shows fallback text when author_name is null", () => {
    cy.intercept("GET", "/api/albums", {
      body: [
        {
          id: 1,
          name: "Nameless Album",
          author_name: null,
          release_date: "2024-12-24"
        }
      ]
    }).as("missingAuthor");

    cy.visit("/");

    cy.wait("@missingAuthor");

    cy.contains("Nameless Album").should("be.visible");

    
    cy.contains(/unknown author/i).should("be.visible");

    
    cy.contains("Nameless Album").click({ force: true });
  });
});

describe("Time Traveller – Sorting Albums by Date", () => {
  it("sorts albums from newest to oldest", () => {
    const now = new Date().toISOString();
    const past = "1999-01-01";

    cy.intercept("GET", "/api/albums", {
      body: [
        { id: 1, name: "Future Hit", release_date: now, author_name: "DJ AI" },
        { id: 2, name: "Old Classic", release_date: past, author_name: "Retro Band" }
      ]
    }).as("sortAlbums");

    cy.visit("/");
    cy.wait("@sortAlbums");

    cy.get(".card").first().contains("Future Hit");
    cy.get(".card").last().contains("Old Classic");
  });
});

describe("Author’s Solo Career", () => {
  it("loads author and their albums", () => {
    cy.intercept("GET", "/api/authors/7", {
      body: { id: 7, name: "Taylor Mocked" }
    }).as("getAuthor");

    cy.intercept("GET", "/api/authors/7/albums", {
      body: [
        { id: 1, name: "Mock it Off", release_date: "2022-05-01" },
        { id: 2, name: "Blank Test", release_date: "2023-02-14" }
      ]
    }).as("getAuthorAlbums");

    cy.visit("/author/7");

    cy.wait("@getAuthor");
    cy.wait("@getAuthorAlbums");

    cy.contains("Taylor Mocked").should("be.visible");
    cy.contains("Mock it Off").should("be.visible");
    cy.contains("Blank Test").should("be.visible");

    
    cy.contains("Mock it Off").click();
    cy.url().should("include", "/album/1");
  });
});

describe("Search Like a Hacker", () => {
  it("displays albums, songs, and authors", () => {
    cy.intercept("GET", "/api/search/*", {
      body: {
        albums: [
          { id: 1, name: "Album X", release_date: Date.now(), author_id: 1 }
        ],
        songs: [
          { id: 11, name: "Song Y", release_date: Date.now(), album_id: 1 }
        ],
        authors: [
          { id: 99, name: "Author Z" }
        ]
      }
    }).as("getSearchResults");

    cy.visit("/search?q=test");

    cy.wait("@getSearchResults");

    cy.contains("Album X").should("be.visible");
    cy.contains("Song Y").should("be.visible");
    cy.contains("Author Z").should("be.visible");
  });

  it("returns special leet response for '?q=1337'", () => {
    cy.intercept("GET", "/api/search/1337", {
      body: {
        songs: [{ id: 1, name: "Leet Song 🎧", album_id: 1 }],
        albums: [],
        authors: []
      }
    }).as("leetSearch");

    cy.visit("/search?q=1337");

    cy.wait("@leetSearch");

    cy.contains("Leet Song 🎧").should("be.visible");
  });
});

describe("Lost Album 404", () => {
  it("shows not found message when album does not exist", () => {
    cy.intercept("GET", "/api/albums/404", {
      statusCode: 404,
      body: null
    }).as("album404");

    cy.visit("/album/404");
    cy.wait("@album404");

    cy.contains(/album not found/i).should("be.visible");

    // bonus button
    cy.contains(/back to reality/i).should("be.visible");
  });
});
