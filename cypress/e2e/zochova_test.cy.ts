describe('Zochova.sk - Contact Page', () => {
  it('displays correct email address on contact page', () => {
    
    cy.visit('https://zochova.sk/kontakt');
    cy.contains('office@zochova.sk').should('be.visible');
  });


  it('contact page loads successfully', () => {

    cy.visit('https://zochova.sk/kontakt');

    cy.url().should('include', '/kontakt');
    cy.contains('office@zochova.sk').should('exist');
  });

  it('displays email on mobile viewport', () => {
    
    cy.viewport(375, 812);
    cy.visit('https://zochova.sk/kontakt');
    
    cy.scrollTo('bottom', { duration: 1000 });
    cy.contains('office@zochova.sk').should('be.visible');
  });

  it('navigates to contact page via mobile menu', () => {
  
  cy.viewport(375, 812);
  cy.visit('https://zochova.sk');

  cy.get('#hamburger').click();

  cy.wait(500);
  cy.contains('Kontakt').click();

  cy.url().should('include', '/kontakt');
  cy.scrollTo('bottom');
  cy.contains('office@zochova.sk').should('be.visible');
});

});