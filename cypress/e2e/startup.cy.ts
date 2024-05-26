describe("Startup testing", () => {
  it("Testing window scrolling behaviour", () => {
    cy.visit("/");

    cy.interceptRegion("Americas", "americas-countries-lg.json");

    cy.window().then((win) => {
      expect(win.scrollY).to.equal(0);
      cy.scrollTo("bottom", { duration: 500 }).then(() => {
        expect(win.scrollY).to.be.greaterThan(0);

        cy.get('[data-testid="scroll-top-button"]')
          .click()
          .then(() => {
            setTimeout(() => {
              expect(win.scrollY).to.equal(0);
            }, 500);
          });
      });
    });
  });

  it("Testing dark mode toggle", () => {
    cy.visit("/", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem("nuxt-color-mode", "light");
      },
    });

    cy.interceptRegion("Americas", "americas-countries.json");

    cy.getAllLocalStorage().then((ls) => {
      let theme = ls[Cypress.env("LOCAL_WEBPAGE_URL")]["nuxt-color-mode"];
      cy.get("html").should("have.class", theme);
      cy.get('[data-testid="theme-button"]').click();
      cy.get("html").should("have.class", "dark");
      cy.get('[data-testid="theme-button"]').click();
      cy.get("html").should("have.class", "light");
    });
  });

  it("Testing sidebar functionality", () => {
    cy.visit("/");

    cy.interceptRegion("Americas", "americas-countries.json");

    cy.get("aside").should("have.class", "w-12");
    cy.get("aside ul li a").each(($el, idx) => {
      if (idx === 0) {
        cy.wrap($el).should("not.contain", /Home/i);
        cy.wrap($el.find("span.i-heroicons-home")).should("exist");
      } else if (idx === 1) {
        cy.wrap($el).should("not.contain", /Search/i);
        cy.wrap($el.find("span.i-heroicons-magnifying-glass")).should("exist");
      } else if (idx === 2) {
        cy.wrap($el).should("not.contain", /New Item/i);
        cy.wrap($el.find("span.i-heroicons-plus")).should("exist");
      } else if (idx === 3) cy.wrap($el).should("not.contain", /github/i);
    });

    cy.get('[data-testid="sidebar-button"]').click();
    cy.get("aside").should("have.class", "w-36");

    cy.get("aside ul li a").each(($el, idx) => {
      if (idx === 0) {
        cy.wrap($el).contains(/Home/i);
        cy.wrap($el.find("span.i-heroicons-home")).should("exist");
      } else if (idx === 1) {
        cy.wrap($el).contains(/Search/i);
        cy.wrap($el.find("span.i-heroicons-magnifying-glass")).should("exist");
      } else if (idx === 2) {
        cy.wrap($el).contains(/New Item/i);
        cy.wrap($el.find("span.i-heroicons-plus")).should("exist");
      } else if (idx === 3) cy.wrap($el).contains(/Github/i);
    });
  });
});
