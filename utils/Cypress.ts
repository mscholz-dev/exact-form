// types
import {
  TCypressFormData,
  TCypressFormError,
} from "./type";

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

  loopFormFill(formData: TCypressFormData) {
    for (const { cyData, value } of formData)
      this.inputFill(
        cy,
        `input-${cyData}`,
        value,
      );
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

  loopFormError(
    formError: TCypressFormError,
    translation: object,
  ) {
    for (const { id, toastValue } of formError)
      this.toastContains(
        cy,
        `#${id + 1}.Toastify__toast--error`,
        translation[toastValue as keyof object],
      );
  }

  successToastContains(
    cy: Cypress.cy & CyEventEmitter,
    id: number,
    toastValue: string,
    translation: object,
  ) {
    this.toastContains(
      cy,
      `#${id + 1}.Toastify__toast--success`,
      translation[toastValue as keyof object],
    );
  }

  shouldRedirect(
    cy: Cypress.cy & CyEventEmitter,
    url: string,
  ) {
    cy.url().should("be.equal", url);
  }
}
