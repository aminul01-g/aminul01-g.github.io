// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

// Cypress E2E: Navigation

describe('Navigation', () => {
  it('should navigate to Home, About, Projects, Blog, and Contact pages', () => {
    cy.visit('/');
    cy.contains('About').click();
    cy.url().should('include', '/about');
    cy.contains('Projects').click();
    cy.url().should('include', '/projects');
    cy.contains('Blog').click();
    cy.url().should('include', '/blog');
    cy.contains('Contact').click();
    cy.url().should('include', '/contact');
  });

  it('should show custom 404 page for invalid route', () => {
    cy.visit('/some-nonexistent-route', { failOnStatusCode: false });
    cy.contains('404').should('exist');
    cy.contains('Page Not Found').should('exist');
  });
});
