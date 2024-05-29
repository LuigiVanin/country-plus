import { Country } from "../../src/types/country";

describe("Language page testing", () => {
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

  it("Testing language page rendering", () => {
    cy.visit("/countries/language/English");

    cy.interceptLanguage("english", "english-countries.json");

    cy.get('main [data-testid="page-title"]').contains("Countries");
    cy.get('main [data-testid="page-title"]').contains("Language");
    cy.get('main [data-testid="page-title"]').contains("English");

    cy.fixture("english-countries.json").then((data) => {
      cy.get("tbody tr").should("have.length", data.length);
    });

    cy.get("table thead tr ").each(($el) => {
      cy.wrap($el).contains(/(Name)|(Capital)|(Region)|(Subregion)|(Maps)/i);
    });

    cy.fixture("english-countries.json").then((data) => {
      cy.get("tbody tr").should("have.length", data.length);
    });
  });

  describe("Table tests", () => {
    it("Testing table data rendering", () => {
      cy.visit("/countries/language/English");

      cy.interceptLanguage("english", "english-countries.json");

      cy.get('[data-testid="language-column-value"').should("exist");

      cy.fixture("english-countries.json").then((data: Country[]) => {
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
      cy.visit("/countries/language/English");

      cy.interceptLanguage("english", "english-countries.json");

      cy.get('[data-testid="language-column-value"').should("exist");

      cy.fixture("english-countries.json").then((data: Country[]) => {
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
      cy.visit("/countries/language/English");

      cy.interceptLanguage("english", "english-countries.json");

      cy.get('[data-testid="region-column-value"').should("exist");

      cy.fixture("americas-countries.json").then((data: Country[]) => {
        const region = data[0].region;

        cy.get('[data-testid="region-column-value"]')
          .first()
          .should("have.text", region)
          .click();
        // cy.interceptRegion("english", "english-countries.json");
        cy.location("pathname").should("eq", `/countries/region/${region}`);
      });
    });
  });
});
