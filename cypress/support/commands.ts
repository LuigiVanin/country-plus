// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("interceptRegion", (region: string, fixture: string) => {
  cy.intercept("GET", `https://restcountries.com/v3.1/region/${region}`, {
    fixture: fixture ?? `americas-countries.json`,
  }).as(`fetchFrom${region}`);
  cy.wait(`@fetchFrom${region}`);
});

Cypress.Commands.add(
  "interceptLanguage",
  (language: string, fixture: string) => {
    cy.intercept("GET", `https://restcountries.com/v3.1/lang/${language}`, {
      fixture: fixture ?? `english-countries.json`,
    }).as(`fetchFrom${language}`);
    cy.wait(`@fetchFrom${language}`);
  },
);
