import CypressClass from "../../utils/Cypress";
import commonTranslations from "../../locales/fr/common.json";

// classes
const Cypress = new CypressClass();

describe("Page: /signup", () => {
  beforeEach(() => {
    cy.visit("/fr/signup");
  });

  it("it should throw: 4 errors toasts", () => {
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

    for (const {
      id,
      toastValue,
      inputCyData,
    } of formError) {
      Cypress.formError(
        cy,
        `#${id + 1}.Toastify__toast--error`,
        commonTranslations[
          toastValue as keyof object
        ],
        inputCyData,
      );
    }
  });
});

export {};
