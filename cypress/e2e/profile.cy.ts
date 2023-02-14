import CypressTestClass from "../../utils/CypressTest";
import formTranslations from "../../locales/fr/form.json";
import profileTranslations from "../../locales/fr/profile.json";
import data from "../../utils/data";

// classes
const CypressTest = new CypressTestClass();

const url = "http://localhost:3000";

describe("Page: /profile", () => {
  beforeEach(() => {
    cy.visit(`${url}/fr/profile`);
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

  it("it should appear a valid toast", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    CypressTest.compareInputValue(
      cy,
      "username",
      data.usernameSeed,
    );
    CypressTest.compareInputValue(
      cy,
      "email",
      data.emailSeed,
    );
    CypressTest.compareInputValue(
      cy,
      "role",
      data.client,
    );

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.successToastContains(
      cy,
      0,
      "form:success",
      profileTranslations,
    );

    cy.getCookie("user").should(
      "have.property",
      "value",
      data.validFrJwt,
    );
  });

  it("it should throw: oldPassword must contain one upper case", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:oldPassword:error:atLeastOneUppercase",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
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

  it("it should throw: oldPassword must contain one lower case", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:oldPassword:error:atLeastOneLowercase",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
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

  it("it should throw: oldPassword must contain one digit", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:oldPassword:error:atLeastOneDigit",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
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

  it("it should throw: oldPassword must contain one special character", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:oldPassword:error:atLeastOneSpecialCharacter",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
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

  it("it should throw: oldPassword must contain 8 characters", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:oldPassword:error:atLeastHeightCharacters",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
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

  it("it should throw: newPassword required", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword:error:empty",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
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

  it("it should throw: newPassword must contain one upper case", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword:error:atLeastOneUppercase",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
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

  it("it should throw: newPassword must contain one lower case", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword:error:atLeastOneLowercase",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
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

  it("it should throw: newPassword must contain one digit", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword:error:atLeastOneDigit",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
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

  it("it should throw: newPassword must contain one special character", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword:error:atLeastOneSpecialCharacter",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
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

  it("it should throw: newPassword must contain 8 characters", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword:error:atLeastHeightCharacters",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
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

  it("it should throw: newPassword2 required", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword2:error:empty",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
        value: `${data.password}.new`,
      },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: newPassword2 must contain one upper case", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword2:error:atLeastOneUppercase",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
        value: `${data.password}.new`,
      },
      { cyData: "newPassword2", value: "a" },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: newPassword2 must contain one lower case", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword2:error:atLeastOneLowercase",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
        value: `${data.password}.new`,
      },
      { cyData: "newPassword2", value: "A" },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: newPassword2 must contain one digit", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword2:error:atLeastOneDigit",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
        value: `${data.password}.new`,
      },
      { cyData: "newPassword2", value: "Aa" },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: newPassword2 must contain one special character", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword2:error:atLeastOneSpecialCharacter",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
        value: `${data.password}.new`,
      },
      {
        cyData: "newPassword2",
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

  it("it should throw: newPassword2 must contain 8 characters", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:newPassword2:error:atLeastHeightCharacters",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
        value: `${data.password}.new`,
      },
      {
        cyData: "newPassword2",
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

  it("it should throw: newPasswords not matching", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:password:new:error:match",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
        value: `${data.password}.new`,
      },
      {
        cyData: "newPassword2",
        value: `${data.password}.not.matching`,
      },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: oldPassword incorrect", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue:
          "input:oldPassword:error:incorrect",
      },
    ];

    const formData = [
      {
        cyData: "oldPassword",
        value: `${data.password}.incorrect`,
      },
      {
        cyData: "newPassword",
        value: `${data.password}.new`,
      },
      {
        cyData: "newPassword2",
        value: `${data.password}.new`,
      },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should update username and password", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formData = [
      {
        cyData: "username",
        value: `fr.${data.usernameSeed}`,
      },
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
        value: `${data.password}.new`,
      },
      {
        cyData: "newPassword2",
        value: `${data.password}.new`,
      },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.successToastContains(
      cy,
      0,
      "form:success",
      profileTranslations,
    );
  });

  it("it should send an fr email for change email", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    CypressTest.clickCyData(
      cy,
      "btn-change-email-form",
    );

    CypressTest.successToastContains(
      cy,
      0,
      "form:change:email:success",
      profileTranslations,
    );
  });

  it("it should throw: token already exists", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue: "token:error:exists",
      },
    ];

    CypressTest.clickCyData(
      cy,
      "btn-change-email-form",
    );

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });
});
