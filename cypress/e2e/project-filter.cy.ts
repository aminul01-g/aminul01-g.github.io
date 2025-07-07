// @ts-nocheck
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="cypress" />

// Cypress E2E: Project Filter

describe('Project Filter', () => {
  beforeEach(() => {
    cy.visit('/projects');
  });

  it('should filter projects by tag and persist in URL', () => {
    cy.get('[data-testid="project-filter-tag"]').first().click();
    cy.url().should('include', 'filter=');
    cy.get('[data-testid="project-card"]').should('exist');
  });

  it('should clear filter and show all projects', () => {
    cy.get('[data-testid="project-filter-tag"]').first().click();
    cy.get('[data-testid="clear-filter"]').click();
    cy.url().should('not.include', 'filter=');
    cy.get('[data-testid="project-card"]').should('have.length.greaterThan', 1);
  });
});
