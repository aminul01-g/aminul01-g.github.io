// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

// Cypress E2E: Theme Toggle

describe('Theme Toggle', () => {
  it('should toggle between light and dark mode', () => {
    cy.visit('/');
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('body').should('have.class', 'dark');
    cy.get('[data-testid="theme-toggle"]').click();
    cy.get('body').should('not.have.class', 'dark');
  });
});
