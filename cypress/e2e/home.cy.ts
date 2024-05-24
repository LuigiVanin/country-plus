describe("Startup test", () => {
  it("Visiting localhost", () => {
    cy.visit("http://localhost:3000");

    cy.intercept("GET", "https://restcountries.com/v3.1/region/*", {
      fixture: "americas-countries.json",
    }).as("fetchCountriesFromAmericaMock");
  });
});
