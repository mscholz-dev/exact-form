describe("E2E Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("write in input username", () => {
    cy.visit("/signup");

    cy.get("[data-cy=input-username]")
      .click()
      .type("mscholz.dev.test");

    cy.get("[data-cy=input-email]")
      .click()
      .type("mscholz.dev.test@gmail.com");

    cy.get("[data-cy=input-password]")
      .click()
      .type("Azerty5!");

    cy.get("[data-cy=input-password2]")
      .click()
      .type("Azerty5!");
  });
});
