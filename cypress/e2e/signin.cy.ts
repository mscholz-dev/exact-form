import CypressTestClass from "../../utils/CypressTest";
import formTranslations from "../../locales/fr/form.json";
import data from "../../utils/data";

// classes
const CypressTest = new CypressTestClass();

const url = "http://localhost:3000";

describe("Page: /signin", () => {
  beforeEach(async () => {
    cy.visit(`${url}/fr/signin`);
  });

  describe("Sign in without filling any input", () => {
    it("it should throw: 2 form errors", () => {
      const formError = [
        {
          id: 0,
          toastValue: "input:email:error:empty",
        },
        {
          id: 1,
          toastValue:
            "input:password:error:empty",
        },
      ];

      CypressTest.clickCyData(cy, "btn-form");

      CypressTest.loopFormError(
        formError,
        formTranslations,
      );
    });
  });

  describe("Sign in with a new email", () => {
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
  });

  describe("Sign in with an incorrect password", () => {
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
          value: "bad password",
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

      CypressTest.loopFormFill(formData);

      CypressTest.clickCyData(cy, "btn-form");

      CypressTest.shouldRedirect(cy, `${url}/fr`);
    });
  });
});
