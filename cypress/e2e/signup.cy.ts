import CypressTestClass from "../../utils/CypressTest";
import formTranslations from "../../locales/fr/form.json";
import data from "../../utils/data";

// classes
const CypressTest = new CypressTestClass();

const url = "http://localhost:3000";

describe("Page: /signup", () => {
  beforeEach(() => {
    cy.visit(`${url}/fr/signup`);
  });

  it("it should throw: 4 form errors", () => {
    const formError = [
      {
        id: 0,
        toastValue: "input:username:error:empty",
      },
      {
        id: 1,
        toastValue: "input:email:error:empty",
      },
      {
        id: 2,
        toastValue: "input:password:error:empty",
      },
      {
        id: 3,
        toastValue: "input:password2:error:empty",
      },
    ];

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });

  it("it should throw: passwords not matching", () => {
    const formError = [
      {
        id: 0,
        toastValue: "input:password:error:match",
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

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.shouldRedirect(cy, `${url}/fr`);
  });

  it("it should throw: username already exists", () => {
    const formError = [
      {
        id: 0,
        toastValue: "input:username:error:exists",
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
        value: data.password,
      },
      {
        cyData: "password2",
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

  it("it should throw: email already exists", () => {
    const formError = [
      {
        id: 0,
        toastValue: "input:email:error:exists",
      },
    ];
    const formData = [
      {
        cyData: "username",
        value: `en.${data.username}`,
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

    CypressTest.loopFormFill(formData);

    CypressTest.clickCyData(cy, "btn-form");

    CypressTest.loopFormError(
      formError,
      formTranslations,
    );
  });
});
