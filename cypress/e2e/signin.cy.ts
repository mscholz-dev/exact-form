import CypressClass from "../../utils/Cypress";
import commonTranslations from "../../locales/fr/common.json";
import data from "../../utils/data";

// classes
const Cypress = new CypressClass();

const url = "http://localhost:3000";

describe("Page: /signin", () => {
  beforeEach(() => {
    cy.visit(`${url}/fr/signin`);
  });

  describe("Sign in without filling any input", () => {
    it("it should throw: 2 form errors", () => {
      const formError = [
        {
          id: 0,
          toastValue:
            "form:input:email:error:empty",
        },
        {
          id: 1,
          toastValue:
            "form:input:password:error:empty",
        },
      ];

      Cypress.clickCyData(cy, "btn-form");

      Cypress.loopFormError(
        formError,
        commonTranslations,
      );
    });
  });

  describe("Sign in with a new email", () => {
    it("it should throw: user not found", () => {
      const formError = [
        {
          id: 0,
          toastValue:
            "form:input:email:error:found",
        },
      ];

      const formData = [
        {
          cyData: "email",
          value: "new.email@gmail.com",
        },
        {
          cyData: "password",
          value: data.password,
        },
      ];

      Cypress.loopFormFill(formData);

      Cypress.clickCyData(cy, "btn-form");

      Cypress.loopFormError(
        formError,
        commonTranslations,
      );
    });
  });

  describe("Sign in with an incorrect password", () => {
    it("it should throw: password incorrect", () => {
      const formError = [
        {
          id: 0,
          toastValue:
            "form:input:password:error:incorrect",
        },
      ];

      const formData = [
        {
          cyData: "email",
          value: data.email,
        },
        {
          cyData: "password",
          value: "bad password",
        },
      ];

      Cypress.loopFormFill(formData);

      Cypress.clickCyData(cy, "btn-form");

      Cypress.loopFormError(
        formError,
        commonTranslations,
      );
    });
  });

  describe("Sign in with valid data", () => {
    it("it should redirect to: /", () => {
      const formData = [
        {
          cyData: "email",
          value: data.email,
        },
        {
          cyData: "password",
          value: data.password,
        },
      ];

      Cypress.loopFormFill(formData);

      Cypress.clickCyData(cy, "btn-form");

      Cypress.shouldRedirect(cy, `${url}/fr`);
    });
  });
});
