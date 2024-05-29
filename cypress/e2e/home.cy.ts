import { Country } from "../../src/types/country";

describe("Home page tests", () => {
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

  it("Testing home components configuration", () => {
    cy.visit("/");

    cy.interceptRegion("Americas", "americas-countries-lg.json");

    cy.get("table").should("exist");

    cy.get('main [data-testid="page-title"] h1').contains("Countries");
    cy.get('main [data-testid="page-title"]').contains("Americas");

    cy.get('main [data-testid="page-title"] a').each(($el) => {
      cy.wrap($el).contains(/(Search)|(New Item)/i);
    });

    cy.fixture("americas-countries-lg.json").then((data) => {
      cy.get("tbody tr").should("have.length", data.length);
    });

    cy.get("table thead tr ").each(($el) => {
      cy.wrap($el).contains(/(Name)|(Capital)|(Region)|(Subregion)|(Maps)/i);
    });
  });

  describe("Table tests", () => {
    it("Testing table data rendering", () => {
      cy.visit("/");

      cy.interceptRegion("Americas", "americas-countries.json");
      cy.get('[data-testid="language-column-value"').should("exist");

      cy.fixture("americas-countries.json").then((data: Country[]) => {
        cy.get("table tbody td").each(($el, idx) => {
          const columnIdx = idx % 6;
          const dataIdx = Math.floor(idx / 6);
          if (columnIdx === 0)
            cy.wrap($el).contains(data[dataIdx].name.official);
          if (columnIdx === 1) cy.wrap($el).contains(data[dataIdx].capital[0]);
          if (columnIdx === 2) {
            Object.values(data[dataIdx].languages).forEach((lang) => {
              cy.wrap($el).contains(lang);
              cy.wrap($el).within(($el) => expect($el.text()).to.include(lang));
            });
          }
          if (columnIdx === 3) {
            cy.wrap($el).contains(data[dataIdx].region);
          }
          if (columnIdx === 4) cy.wrap($el).contains(data[dataIdx].subregion);
          if (columnIdx === 5) {
            cy.wrap($el)
              .find("a")
              .should("have.attr", "href", data[dataIdx].maps.googleMaps);
          }
        });
      });
    });

    it("Testing language column navigation", () => {
      cy.visit("/");

      cy.interceptRegion("Americas", "americas-countries.json");

      cy.get('[data-testid="language-column-value"').should("exist");

      cy.fixture("americas-countries.json").then((data: Country[]) => {
        const lang = Object.values(data[0].languages)[0];

        cy.get('[data-testid="language-column-value"] span')
          .first()
          .should("have.text", lang)
          .click();
        // cy.interceptLanguage("english", "english-countries.json");
        cy.location("pathname").should("eq", `/countries/language/${lang}`);
      });
    });

    it("Testing region column navigation", () => {
      cy.visit("/");

      cy.interceptRegion("Americas", "americas-countries.json");

      cy.get('[data-testid="region-column-value"]').should("exist");

      cy.fixture("americas-countries.json").then((data: Country[]) => {
        const region = data[0].region;

        cy.get('[data-testid="region-column-value"]')
          .first()
          .should("have.text", region)
          .click();
        // cy.interceptRegion("Americas", "americas-countries.json");
        cy.location("pathname").should("eq", `/countries/region/${region}`);
      });
    });
  });
});
