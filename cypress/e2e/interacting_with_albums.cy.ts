

describe("Home Page Albums", () => {
  it("intercepts and mocks API", () => {
    
    cy.intercept("GET", "/api/albums", {
      statusCode: 200,
      body: [
        { id: 1, name: "Mocked Album", author_name: "Mock Artist", release_date: Date.now() }
      ]
    }).as("getAlbums");

    cy.visit("/");

    cy.wait("@getAlbums");

    cy.contains("Mocked Album").should("be.visible");
  });
});

describe("Home Page Albums - server error", () => {
  it("shows error message when server returns 500", () => {
    
    cy.intercept("GET", "/api/albums", {
      statusCode: 500,
      body: { message: "Internal Server Error" },
    }).as("getAlbumsError");


    cy.visit("/");

    cy.wait("@getAlbumsError");

    cy.contains("Chyba servera").should("be.visible");
  });
});

describe("Home Page Albums - loading state", () => {
  it("shows loader while fetching and hides it after data loads", () => {
    cy.intercept("GET", "/api/albums", (req) => {
      req.on("response", (res) => {
        res.setDelay(1000);
      });
      req.reply({
        statusCode: 200,
        body: [
          {
            id: 1, name: "Mocked Album", author_name: "Mock Artist", release_date: Date.now(),
          },
        ],
      });
    }).as("getAlbumsSlow");

    cy.visit("/");
    
    cy.contains("Loading...").should("be.visible");
    
    cy.wait("@getAlbumsSlow");
    
    cy.contains("Loading...").should("not.exist");

    cy.contains("Mocked Album").should("be.visible");
  });
});

describe("Search Page", () => {
  it("mocks search API and displays album results", () => {
    
    cy.intercept("GET", "/api/search/Mock", {
      statusCode: 200,
      body: {
        albums: [
          { id: 1, name: "Mock Album 1", release_date: Date.now(), author_id: 1 },
          { id: 2, name: "Mock Album 2", release_date: Date.now(), author_id: 2 },
          
        ],
        songs: [
          { id: 1, name: "Mock Song 1", release_date: Date.now(), album_id: 1 },
          { id: 2, name: "Mock Song 2", release_date: Date.now(), album_id: 2 }
        ]
      }
    }).as("getSearchResults");

    
    cy.visit("/");

    
    cy.get('input[placeholder="Search"]').type("Mock");

    cy.contains("Search").click();

    cy.wait("@getSearchResults");

    cy.url().should("include", "search");

    cy.contains("Mock Album 1").should("be.visible");
    cy.contains("Mock Album 2").should("be.visible");
  });

 
});
