export default class Cypress {
  getCyData(
    cy: Cypress.cy & CyEventEmitter,
    cyData: string,
  ) {
    return cy.get(`[data-cy=${cyData}]`);
  }

  inputFill(
    cy: Cypress.cy & CyEventEmitter,
    cyData: string,
    value: string,
  ) {
    this.getCyData(cy, cyData)
      .click()
      .type(value);
  }

  clickCyData(
    cy: Cypress.cy & CyEventEmitter,
    cyData: string,
  ) {
    this.getCyData(cy, cyData).click();
  }

  toastContains(
    cy: Cypress.cy & CyEventEmitter,
    get: string,
    value: string,
  ) {
    cy.get(get).contains(value);
  }

  inputStyleError(
    cy: Cypress.cy & CyEventEmitter,
    cyData: string,
  ) {
    this.getCyData(cy, cyData).should(
      "have.class",
      "form-input-error",
    );
  }

  formError(
    cy: Cypress.cy & CyEventEmitter,
    getToast: string,
    toastValue: string,
    inputCyData: string,
  ) {
    this.toastContains(cy, getToast, toastValue);
    this.inputStyleError(cy, inputCyData);
  }

  shouldRedirect(
    cy: Cypress.cy & CyEventEmitter,
    url: string,
  ) {
    cy.url().should("be.equal", url);
  }
}
