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
    cy.setCookie("user", `${data.validFrJwt}!`);

    CypressTest.shouldRedirect(cy, `${url}/fr`);
  });

  it("it should redirect to: /", () => {
    cy.setCookie("user", data.userNotFoundJwt);

    CypressTest.shouldRedirect(cy, `${url}/fr`);
  });

  it("it should appear a valid toast", () => {
    cy.setCookie("user", data.validFrJwt);

    // wait API auth call
    cy.wait(1000);

    CypressTest.compareInputValue(
      cy,
      "input-username",
      data.username,
    );
    CypressTest.compareInputValue(
      cy,
      "input-email",
      data.email,
    );
    CypressTest.compareInputValue(
      cy,
      "input-role",
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
    cy.setCookie("user", data.validFrJwt);

    // wait API auth call
    cy.wait(1000);

    const formError = [
      {
        id: 0,
        toastValue: "input:username:error:empty",
      },
    ];

    CypressTest.clearInputValue(
      cy,
      "input-username",
    );

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: newPassword required", () => {
    cy.setCookie("user", data.validFrJwt);

    // wait API auth call
    cy.wait(1000);

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
    cy.setCookie("user", data.validFrJwt);

    // wait API auth call
    cy.wait(1000);

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

  it("it should throw: newPasswords not matching", () => {
    cy.setCookie("user", data.validFrJwt);

    // wait API auth call
    cy.wait(1000);

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
        value: "a",
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
    cy.setCookie("user", data.validFrJwt);

    // wait API auth call
    cy.wait(1000);

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
        value: "a",
      },
      {
        cyData: "newPassword2",
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

  it("it should update username and password", () => {
    cy.setCookie("user", data.validFrJwt);

    // wait API auth call
    cy.wait(1000);

    CypressTest.clearInputValue(
      cy,
      "input-username",
    );

    const formData = [
      {
        cyData: "username",
        value: `fr.${data.username}`,
      },
      {
        cyData: "oldPassword",
        value: data.password,
      },
      {
        cyData: "newPassword",
        value: "a",
      },
      {
        cyData: "newPassword2",
        value: "a",
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

  it("it should update username and password", () => {
    cy.setCookie("user", data.validFrJwt);

    // wait API auth call
    cy.wait(1000);

    CypressTest.clearInputValue(
      cy,
      "input-username",
    );

    const formData = [
      {
        cyData: "username",
        value: `fr2.${data.username}`,
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
    cy.setCookie("user", data.validFrJwt);

    // wait API auth call
    cy.wait(1000);

    const formError = [
      {
        id: 0,
        toastValue: "input:username:error:exists",
      },
    ];

    CypressTest.clearInputValue(
      cy,
      "input-username",
    );

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
});
