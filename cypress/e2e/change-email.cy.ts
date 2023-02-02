import CypressTestClass from "../../utils/CypressTest";
import formTranslations from "../../locales/fr/form.json";
import changeEmailTranslations from "../../locales/fr/change-email.json";
import data from "../../utils/data";

// classes
const CypressTest = new CypressTestClass();

const url = "http://localhost:3000";

describe("Page: /change-email/:token", () => {
  it("it should redirect to: /", () => {
    cy.visit(`${url}/fr/change-email/token`);

    CypressTest.shouldRedirect(cy, `${url}/fr`);
  });

  it("it should redirect to: /", () => {
    cy.visit(`${url}/fr/change-email/token`);

    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    CypressTest.shouldRedirect(cy, `${url}/fr`);
  });

  it("it should redirect to: /", () => {
    cy.visit(`${url}/fr/change-email/token`);

    CypressTest.setCookie(
      cy,
      "user",
      data.userNotFoundJwt,
    );

    CypressTest.shouldRedirect(cy, `${url}/fr`);
  });

  it("it should redirect to: /", () => {
    cy.visit(`${url}/fr/change-email/token`);

    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    CypressTest.shouldRedirect(cy, `${url}/fr`);
  });

  it("it should throw: newEmail required and newEmail2 required", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    cy.request(
      "GET",
      "http://localhost:8000/api/test/user/token/email",
    ).then((response) => {
      expect(response.body.token).to.exist;

      const token = response.body.token;

      cy.visit(`${url}/fr/change-email/${token}`);

      CypressTest.setCookie(
        cy,
        "user",
        data.validFrJwt,
      );
      const formError = [
        {
          id: 0,
          toastValue:
            "input:newEmail:error:empty",
        },
        {
          id: 1,
          toastValue:
            "input:newEmail2:error:empty",
        },
      ];

      CypressTest.clickCyData(cy, "btn-form");

      CypressTest.loopFormError(
        formError,
        formTranslations,
      );
    });
  });

  it("it should throw: newEmails not matching", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    cy.request(
      "GET",
      "http://localhost:8000/api/test/user/token/email",
    ).then((response) => {
      expect(response.body.token).to.exist;

      const token = response.body.token;

      cy.visit(`${url}/fr/change-email/${token}`);

      CypressTest.setCookie(
        cy,
        "user",
        data.validFrJwt,
      );

      const formError = [
        {
          id: 0,
          toastValue:
            "input:newEmail2:error:match",
        },
      ];

      const formData = [
        {
          cyData: "newEmail",
          value: data.email2,
        },
        {
          cyData: "newEmail2",
          value: data.email,
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

  it("it should throw: newEmail must be different", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    cy.request(
      "GET",
      "http://localhost:8000/api/test/user/token/email",
    ).then((response) => {
      expect(response.body.token).to.exist;

      const token = response.body.token;

      cy.visit(`${url}/fr/change-email/${token}`);

      CypressTest.setCookie(
        cy,
        "user",
        data.validFrJwt,
      );
      const formError = [
        {
          id: 0,
          toastValue:
            "input:newEmail:error:different",
        },
      ];

      const formData = [
        {
          cyData: "newEmail",
          value: data.email,
        },
        {
          cyData: "newEmail2",
          value: data.email,
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

  it("it should update email", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    cy.request(
      "GET",
      "http://localhost:8000/api/test/user/token/email",
    ).then((response) => {
      expect(response.body.token).to.exist;

      const token = response.body.token;

      cy.visit(`${url}/fr/change-email/${token}`);

      CypressTest.setCookie(
        cy,
        "user",
        data.validFrJwt,
      );

      const formData = [
        {
          cyData: "newEmail",
          value: data.email2,
        },
        {
          cyData: "newEmail2",
          value: data.email2,
        },
      ];

      CypressTest.loopFormFill(formData);

      CypressTest.clickCyData(cy, "btn-form");

      CypressTest.successToastContains(
        cy,
        0,
        "form:success",
        changeEmailTranslations,
      );
    });
  });
});
