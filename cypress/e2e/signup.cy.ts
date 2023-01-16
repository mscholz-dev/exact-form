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
          toastValue: "username",
          inputCyData: "input-username",
        },
        {
          id: 1,
          toastValue: "email",
          inputCyData: "input-email",
        },
        {
          id: 2,
          toastValue: "password",
          inputCyData: "input-password",
        },
        {
          id: 3,
          toastValue: "password2",
          inputCyData: "input-password2",
        },
      ];

      Cypress.clickCyData(cy, "btn-form");

      for (const {
        id,
        toastValue,
        inputCyData,
      } of formError)
        Cypress.formError(
          cy,
          `#${id + 1}.Toastify__toast--error`,
          commonTranslations[
            `form:input:${toastValue}:error:empty` as keyof object
          ],
          inputCyData,
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

      for (const { cyData, value } of formData)
        Cypress.inputFill(
          cy,
          `input-${cyData}`,
          value,
        );

      Cypress.clickCyData(cy, "btn-form");

      Cypress.shouldRedirect(cy, `${url}/fr`);
    });
  });
});