declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      interceptRegion(region: string, fixture: string): void;
      interceptLanguage(language: string, fixture: string): void;
    }
  }
}

export {};
