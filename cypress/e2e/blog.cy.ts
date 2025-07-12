// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

// Cypress E2E: Blog Navigation and Post View

describe('Blog Navigation', () => {
  it('should navigate to the blog page and view a post', () => {
    cy.visit('/blog');
    cy.get('[data-testid="blog-card"]').first().click();
    cy.url().should('include', '/blog/');
    cy.get('[data-testid="blog-post-title"]').should('exist');
  });
});
