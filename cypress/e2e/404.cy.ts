// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

// Cypress E2E: 404 Page

describe('404 Page', () => {
  it('shows the custom 404 page for unknown routes', () => {
    cy.visit('/thispagedoesnotexist', { failOnStatusCode: false });
    cy.contains('404').should('exist');
    cy.contains('Page Not Found').should('exist');
    cy.get('a').contains('Go Home').should('exist');
  });
});
