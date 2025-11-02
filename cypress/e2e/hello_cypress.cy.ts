describe('Album Catalog - Basic Checks', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('opens the homepage', () => {

    cy.get('[data-cy="title"]').should('be.visible');
    cy.get('[data-cy="title"]').should('contain.text', 'Spotify');
  });

  it('displays the site title in the navbar', () => {

    cy.get('[data-cy="navbar"]').should('be.visible');
    cy.get('[data-cy="title"]').should('be.visible');
    cy.get('[data-cy="title"]').should('contain.text', 'Spotify');
  });

  it('shows at least one album card', () => {

    cy.get('[data-cy="album-card"]').should('have.length.at.least', 1);
    cy.get('[data-cy="album-card"]').first().should('be.visible');
  });

  it('album card has a title and author', () => {

    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-title"]').should('be.visible');
      cy.get('[data-cy="album-title"]').should('not.be.empty');
      cy.get('[data-cy="album-artist"]').should('be.visible');
      cy.get('[data-cy="album-artist"]').should('contain.text', 'Author');
    });
  });

  it('has a visible search input on the top', () => {

    cy.get('[data-cy="search-input"]').should('be.visible');
    cy.get('[data-cy="search-input"]').should('have.attr', 'placeholder');
  });

  it('displays multiple albums in grid layout', () => {

    cy.get('[data-cy="album-card"]').should('have.length.at.least', 3);
  });

  it('album cards contain release date information', () => {

    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-release-date"]').should('be.visible');
      cy.get('[data-cy="album-release-date"]').should('contain.text', 'Release Date');
    });
  });

  it('page is responsive on mobile viewport', () => {

    cy.viewport(375, 667);

    cy.get('[data-cy="title"]').should('be.visible');
    cy.get('[data-cy="album-card"]').should('be.visible');
  });

  it('each album card has a detail link button', () => {

    cy.get('[data-cy="album-card"]').first().within(() => {
      cy.get('[data-cy="album-detail-link"]').should('be.visible');
      cy.get('[data-cy="album-detail-link"]').should('contain.text', 'Detail');
    });
  });
});