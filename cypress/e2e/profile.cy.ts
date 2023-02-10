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

  it("it should throw: username required", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    const formError = [
      {
        id: 0,
        toastValue: "input:username:error:empty",
      },
    ];

    CypressTest.clearInputValue(cy, "username");

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
      {
        id: 1,
        toastValue:
          "input:newPassword2:error:empty",
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
        value: "b",
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
        value: "b",
      },
      {
        cyData: "newPassword2",
        value: "not matching",
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
        value: "incorrect",
      },
      {
        cyData: "newPassword",
        value: "b",
      },
      {
        cyData: "newPassword2",
        value: "b",
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
        value: "b",
      },
      {
        cyData: "newPassword2",
        value: "b",
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

  it("it should throw: username already exists", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );
    const formError = [
      {
        id: 0,
        toastValue: "input:username:error:exists",
      },
    ];

    const formData = [
      {
        cyData: "username",
        value: `en.${data.username}`,
      },
    ];

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
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
