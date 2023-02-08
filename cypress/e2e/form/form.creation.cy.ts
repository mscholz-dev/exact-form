import CypressTestClass from "../../../utils/CypressTest";
import formTranslations from "../../../locales/fr/form.json";
import data from "../../../utils/data";

// classes
const CypressTest = new CypressTestClass();

const url = "http://localhost:3000";

describe("Page: /form/creation", () => {
  beforeEach(() => {
    cy.visit(`${url}/fr/form/creation`);
  });

  it("it should redirect to: /", () => {
    CypressTest.shouldRedirect(cy, `${url}/fr`);
  });

  it("it should redirect to: /", () => {
    CypressTest.setCookie(
      cy,
      "user",
      `${data.validFrJwt}!`,
    );

    CypressTest.shouldRedirect(cy, `${url}/fr`);
  });

  it("it should redirect to: /", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.userNotFoundJwt,
    );

    CypressTest.shouldRedirect(cy, `${url}/fr`);
  });

  it("it should throw: 2 form errors", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue: "input:formName:error:empty",
      },
      {
        id: 1,
        toastValue: "input:timezone:error:empty",
      },
    ];

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should redirect to: /form", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formData = [
      {
        cyData: "name",
        value: data.formName,
      },
    ];

    CypressTest.loopFormFill(formData);
    CypressTest.selectOption(
      cy,
      "timezone",
      data.formTimezone,
    );

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.shouldRedirect(
      cy,
      `${url}/fr/formulaire`,
    );
  });
});
