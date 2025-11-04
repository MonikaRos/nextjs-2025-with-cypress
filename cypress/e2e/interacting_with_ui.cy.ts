describe('Album Catalog - Interactions', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('searches for albums when typing in search bar and clicking search button', () => {

    const searchTerm = 'Abbey';

    cy.get('[data-cy="search-input"]').type(searchTerm);
    cy.get('[data-cy="search-button"]').click();

    cy.url().should('include', '/search');
    cy.url().should('include', `q=${searchTerm}`);
    cy.get('[data-cy="search-results"]').should('be.visible');
  });

  it('navigates to the first album detail', () => {

    cy.get('[data-cy="album-card"]').should('be.visible');

    cy.get('[data-cy="album-detail-link"]').first().click();

    cy.url().should('include', '/album/');
    cy.get('[data-cy="album-detail"]').should('be.visible');
  });

  it('navigates to home page after clicking on Spotify logo', () => {

    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-detail-link"]').click();
    });
    cy.url().should('include', '/album/');

    cy.get('[data-cy="title"]').click();

    cy.url().should('not.include', '/album/');
    cy.get('[data-cy="album-card"]').should('have.length.at.least', 1);
  });

  it('clears search input after typing', () => {

    cy.get('[data-cy="search-input"]').type('Beatles');
    cy.get('[data-cy="search-input"]').should('have.value', 'Beatles');

    cy.get('[data-cy="search-input"]').clear();

    cy.get('[data-cy="search-input"]').should('have.value', '');
  });

  it('navigates to author detail from album card', () => {

    cy.get('[data-cy="album-card"]').first().should('be.visible');

    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-artist"]').find('a').click();
    });

    cy.url().should('include', '/author/');
    cy.get('[data-cy="author-detail"]').should('be.visible');
  });

  it('displays songs table on album detail page', () => {

    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-detail-link"]').click();
    });

    cy.get('[data-cy="songs-table"]').should('be.visible');
    cy.get('[data-cy="song-row"]').should('have.length.at.least', 1);
  });

  it('shows author albums list on author detail page', () => {

    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-artist"]').find('a').click();
    });

    cy.get('[data-cy="author-name"]').should('be.visible');
    cy.get('[data-cy="author-albums-list"]').should('be.visible');
    cy.get('[data-cy="author-album-item"]').should('have.length.at.least', 1);
  });

  it('navigates back from album detail using browser back', () => {

    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-detail-link"]').click();
    });
    cy.url().should('include', '/album/');

    cy.go('back');

    cy.url().should('not.include', '/album/');
    cy.get('[data-cy="album-card"]').should('be.visible');
  });
});

