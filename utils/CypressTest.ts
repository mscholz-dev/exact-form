// types
import {
  TCypressFormData,
  TCypressFormError,
} from "./types";

export default class CypressTest {
  getCyData(
    cy: Cypress.cy & CyEventEmitter,
    cyData: string,
  ) {
    return cy.get(`[data-cy=${cyData}]`);
  }

  shouldNotExistByCyData(
    cy: Cypress.cy & CyEventEmitter,
    cyData: string,
  ) {
    return cy
      .get(`[data-cy=${cyData}]`)
      .should("not.exist");
  }

  inputFill(
    cy: Cypress.cy & CyEventEmitter,
    cyData: string,
    value: string,
  ) {
    this.getCyData(cy, cyData)
      .focus()
      .clear()
      .type(value);
  }

  loopFormFill(formData: TCypressFormData) {
    for (const { cyData, value } of formData)
      this.inputFill(cy, cyData, value);
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
    cy.get(get).contains(value, {
      timeout: 10_000,
    });
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
    cy.url().should("be.equal", url, {
      timeout: 10_000,
    });
  }

  compareInputValue(
    cy: Cypress.cy & CyEventEmitter,
    cyData: string,
    data: string,
  ) {
    cy.get(`[data-cy=${cyData}]`).should(
      "have.value",
      data,
    );
  }

  clearInputValue(
    cy: Cypress.cy & CyEventEmitter,
    cyData: string,
  ) {
    cy.get(`[data-cy=${cyData}]`)
      .click()
      .focused()
      .clear();
  }

  setCookie(
    cy: Cypress.cy & CyEventEmitter,
    name: string,
    value: string,
  ) {
    cy.setCookie(name, value);
    cy.wait(1_000);
  }

  selectOption(
    cy: Cypress.cy & CyEventEmitter,
    name: string,
    value: string,
  ) {
    this.getCyData(cy, name).select(value);
  }

  countChildren(
    cy: Cypress.cy & CyEventEmitter,
    parentName: string,
    childrenName: string,
    length: number,
  ) {
    this.getCyData(cy, parentName)
      .find(childrenName)
      .should("have.length", length);
  }
}
