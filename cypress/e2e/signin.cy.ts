import CypressTestClass from "../../utils/CypressTest";
import formTranslations from "../../locales/fr/form.json";
import data from "../../utils/data";

// classes
const CypressTest = new CypressTestClass();

const url = "http://localhost:3000";

describe("Page: /signin", () => {
  beforeEach(() => {
    cy.visit(`${url}/fr/signin`);
  });

  it("it should throw: 2 form errors", () => {
    const formError = [
      {
        id: 0,
        toastValue: "input:email:error:empty",
      },
      {
        id: 1,
        toastValue: "input:password:error:empty",
      },
    ];

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: password must contain one upper case", () => {
    const formError = [
      {
        id: 0,
        toastValue:
          "input:password:error:atLeastOneUppercase",
      },
    ];

    const formData = [
      {
        cyData: "email",
        value: data.email,
      },
      {
        cyData: "password",
        value: "a",
      },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: password must contain one lower case", () => {
    const formError = [
      {
        id: 0,
        toastValue:
          "input:password:error:atLeastOneLowercase",
      },
    ];

    const formData = [
      {
        cyData: "email",
        value: data.email,
      },
      {
        cyData: "password",
        value: "A",
      },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: password must contain one digit", () => {
    const formError = [
      {
        id: 0,
        toastValue:
          "input:password:error:atLeastOneDigit",
      },
    ];

    const formData = [
      {
        cyData: "email",
        value: data.email,
      },
      {
        cyData: "password",
        value: "Aa",
      },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: password must contain one special character", () => {
    const formError = [
      {
        id: 0,
        toastValue:
          "input:password:error:atLeastOneSpecialCharacter",
      },
    ];

    const formData = [
      {
        cyData: "email",
        value: data.email,
      },
      {
        cyData: "password",
        value: "Aa1",
      },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: password must contain 8 characters", () => {
    const formError = [
      {
        id: 0,
        toastValue:
          "input:password:error:atLeastHeightCharacters",
      },
    ];

    const formData = [
      {
        cyData: "email",
        value: data.email,
      },
      {
        cyData: "password",
        value: "Aa1$",
      },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: user not found", () => {
    const formError = [
      {
        id: 0,
        toastValue: "input:email:error:found",
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

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: password incorrect", () => {
    const formError = [
      {
        id: 0,
        toastValue:
          "input:password:error:incorrect",
      },
    ];

    const formData = [
      {
        cyData: "email",
        value: data.email,
      },
      {
        cyData: "password",
        value: `${data.password}$`,
      },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

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

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.shouldRedirect(cy, `${url}/fr`);
  });
});
