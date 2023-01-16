import CypressClass from "../../utils/Cypress";
import commonTranslations from "../../locales/fr/common.json";
import data from "../../utils/data";

// classes
const Cypress = new CypressClass();

const url = "http://localhost:3000";

describe("Page: /signup", () => {
  beforeEach(() => {
    cy.visit(`${url}/fr/signup`);
  });

  describe("Sign up without filling any input", () => {
    it("it should throw: 4 form errors", () => {
      const formError = [
        {
          id: 0,
          toastValue:
            "form:input:username:error:empty",
          inputCyData: "input-username",
        },
        {
          id: 1,
          toastValue:
            "form:input:email:error:empty",
          inputCyData: "input-email",
        },
        {
          id: 2,
          toastValue:
            "form:input:password:error:empty",
          inputCyData: "input-password",
        },
        {
          id: 3,
          toastValue:
            "form:input:password2:error:empty",
          inputCyData: "input-password2",
        },
      ];

      Cypress.clickCyData(cy, "btn-form");

      Cypress.loopFormError(
        formError,
        commonTranslations,
      );
    });
  });

  describe("Sign up with unmatching passwords", () => {
    it("it should throw: passwords not matching", () => {
      const formError = [
        {
          id: 0,
          toastValue:
            "form:input:password:error:match",
          inputCyData: "input-password2",
        },
      ];

      const formData = [
        {
          cyData: "username",
          value: data.username,
        },
        {
          cyData: "email",
          value: data.email,
        },
        {
          cyData: "password",
          value: "a",
        },
        {
          cyData: "password2",
          value: "b",
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

  describe("Sign up with valid data", () => {
    it("it should redirect to: /", () => {
      const formData = [
        {
          cyData: "username",
          value: data.username,
        },
        {
          cyData: "email",
          value: data.email,
        },
        {
          cyData: "password",
          value: data.password,
        },
        {
          cyData: "password2",
          value: data.password,
        },
      ];

      Cypress.loopFormFill(formData);

      Cypress.clickCyData(cy, "btn-form");

      Cypress.shouldRedirect(cy, `${url}/fr`);
    });
  });
});
