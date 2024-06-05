import { Country } from "../../src/types/country";

describe("Search page test", () => {
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

  it("Testing search page component configuration", () => {
    cy.visit("countries/search");

    cy.get('main [data-testid="page-title"]').contains("Countries");
    cy.get('main [data-testid="page-title"]').contains("Search");
    cy.get('main [data-testid="page-title"] p').should("exist");
    cy.get('main [data-testid="page-title"] button')
      .should("exist")
      .should("have.text", "Back");

    cy.get('main [data-testid="country-card"]').should("not.exist");

    cy.get("main input").should("exist").type("a");
    cy.get("main form button").should("exist").click();

    cy.contains("at least 3 characters");

    cy.interceptSearch("auni", "americas-countries.json");
    cy.get("main input").should("exist").type("uni");
    cy.get("main form button").should("exist").click();
    cy.wait("@fetchFromSearch");

    cy.get('main [data-testid="country-card"]').should("exist");
  });

  it("Testing country card information", () => {
    cy.visit("countries/search");

    cy.get('main [data-testid="country-card"]').should("not.exist");

    cy.interceptSearch("auni", "americas-countries.json");
    cy.get("main input").should("exist").type("auni");
    cy.get("main form button").should("exist").click();
    cy.wait("@fetchFromSearch");

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

  it("Testing country card navigation", () => {
    cy.visit("countries/search");

    cy.get('main [data-testid="country-card"]').should("not.exist");

    cy.interceptSearch("auni", "americas-countries.json");
    cy.get("main input").should("exist").type("auni");
    cy.get("main form button").should("exist").click();
    cy.wait("@fetchFromSearch");

    cy.get('main [data-testid="country-card"]').should("exist");

    cy.fixture("americas-countries.json").then((data: Country[]) => {
      cy.get('main [data-testid="country-card"]').should(
        "have.length",
        data.length,
      );
      cy.get('main [data-testid="country-card"]')
        .first()
        .find("a")
        .each(($a) => {
          if ($a.text().includes("Region")) {
            cy.wrap($a).should(
              "have.attr",
              "href",
              `/countries/region/${data[0].region}`,
            );
            cy.wrap($a).click();
            cy.url().should("include", `/countries/region/${data[0].region}`);
          }
        });
    });
  });
});
