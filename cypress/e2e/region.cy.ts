import { Country } from "../../src/types/country";

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

    cy.contains(/settings/i);

    cy.get('[data-testid="chart-settings-panel"]').should("not.exist");

    cy.get("canvas").should("exist");
  });

  it("Testing settings button open", () => {
    cy.visit("countries/region/Americas");

    cy.interceptRegion("Americas", "americas-countries.json");

    cy.contains(/settings/i).click();

    cy.get('[data-testid="chart-settings-panel"]').should("exist");

    cy.contains(/chart settings/i);

    cy.contains(/scale settings/i);

    cy.contains(/bubble settings/i);

    cy.get('[data-testid="chart-settings-panel"] input').each(($el, idx) => {
      cy.wrap($el).should("exist").should("have.attr", "type", "radio");
      if (idx === 0) {
        cy.wrap($el).should("not.be.checked").should("have.value", "linear");
        cy.wrap($el).check();
        cy.wrap($el).should("be.checked");
      } else {
        cy.wrap($el)
          .should("not.be.checked")
          .should("have.value", "logarithmic");
        cy.wrap($el).check();
        cy.wrap($el).should("be.checked");
      }
    });

    cy.get('[data-testid="chart-settings-panel"] button')
      .contains(/area/i)
      .click();
    cy.get('[data-testid="chart-settings-panel"] button')
      .contains(/ratio/i)
      .click();
    cy.get('[data-testid="chart-settings-panel"] button')
      .contains(/population/i)
      .click();
  });

  it("Testing country card information", () => {
    cy.visit("countries/region/Americas");

    cy.interceptRegion("Americas", "americas-countries.json");

    cy.get('main [data-testid="country-card"]').should("exist");

    cy.fixture("americas-countries.json").then((data: Country[]) => {
      cy.get('main [data-testid="country-card"]')
        .should("have.length", data.length)
        .each(($el, i) => {
          cy.wrap($el).contains(data[i].name.official);
          cy.wrap($el).contains(data[i].region);
          cy.wrap($el).contains(data[i].subregion);
          cy.wrap($el).contains(data[i].capital[0]);

          cy.wrap($el)
            .find("a")
            .each(($a, _j) => {
              if ($a.text() === "Region")
                cy.wrap($a).should(
                  "have.attr",
                  "href",
                  `/countries/region/${data[i].region}`,
                );
              if ($a.text() === "Google Maps")
                cy.wrap($a).should(
                  "have.attr",
                  "href",
                  data[i].maps.googleMaps,
                );
            });
        });
    });
  });
});
