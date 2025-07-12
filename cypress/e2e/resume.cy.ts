// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

// Cypress E2E: Resume Download

describe('Resume Download', () => {
  it('should download the resume from About or Navbar', () => {
    cy.visit('/about');
    cy.get('[data-testid="resume-download"]').should('have.attr', 'href').and('include', 'resume');
  });
});
