describe('Album Catalog - Error Handling', () => {
  it('shows error message for invalid album ID (non-numeric)', () => {

    cy.visit('/album/invalid-id');
    

    cy.get('[data-cy="error-message"]').should('be.visible');
    cy.get('[data-cy="error-message"]').should('contain.text', 'Invalid Album id');
  });

}); 