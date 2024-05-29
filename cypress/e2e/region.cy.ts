describe("Region page test", () => {
  beforeEach(() => {
    if (Cypress.browser.family === "chromium") {
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.enable",
        params: {},
      });
      Cypress.automation("remote:debugger:protocol", {
        command: "Network.setCacheDisabled",
        params: { cacheDisabled: true },
      });
    }
  });

  it("Testing region page component configuration", () => {
    cy.visit("countries/region/Americas");

    cy.interceptRegion("Americas", "americas-countries.json");

    cy.get('main [data-testid="page-title"]').contains("Countries");
    cy.get('main [data-testid="page-title"]').contains("Region");
    cy.get('main [data-testid="page-title"]').contains("Americas");
    cy.get('main [data-testid="page-title"] p').should("exist");
    cy.get('main [data-testid="page-title"] button')
      .should("exist")
      .should("have.text", "Back");

    cy.get('main [data-testid="country-card"]').should("not.exist");

    cy.get('main [data-testid="country-card"]').should("exist");
  });
});
