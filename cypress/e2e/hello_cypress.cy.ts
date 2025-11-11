describe('Album Catalog - Basic Checks', () => {
  it('opens the homepage', () => {
    cy.visit('/');

    // make this test pass by adding the correct attribute data-cy into your page
    cy.get('[data-cy="title"]').should('be.visible');
    cy.get('[data-cy="title"]').should('contain.text', 'Spotify');
  });

  it('displays the site title in the header', () => {});

  it('shows at least one album card', () => {});

  it('album card has a title and price', () => {});

  it('has a visible search input on the top', () => {});

  // add at least 3 more tests here
});
