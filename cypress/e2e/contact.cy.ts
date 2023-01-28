import CypressTestClass from "../../utils/CypressTest";
import formTranslations from "../../locales/fr/form.json";
import contactTranslations from "../../locales/fr/contact.json";
import data from "../../utils/data";
import TestApi from "../../pages/api/test";

// classes
const CypressTest = new CypressTestClass();

const url = "http://localhost:3000";

describe("Page: /contact", () => {
  beforeEach(async () => {
    await TestApi.newDB();
    cy.visit(`${url}/fr/contact`);
  });

  describe("Contact without filling any input", () => {
    it("it should throw: 4 form errors", () => {
      const formError = [
        {
          id: 0,
          toastValue:
            "input:firstName:error:empty",
        },
        {
          id: 1,
          toastValue:
            "input:lastName:error:empty",
        },
        {
          id: 2,
          toastValue: "input:email:error:empty",
        },
        {
          id: 3,
          toastValue: "input:message:error:empty",
        },
      ];

      CypressTest.clickCyData(cy, "btn-form");

      CypressTest.loopFormError(
        formError,
        formTranslations,
      );
    });
  });

  describe("Contact with a bad phone", () => {
    it("it should throw: phone invalid", () => {
      const formError = [
        {
          id: 0,
          toastValue: "input:phone:error:format",
        },
      ];

      const formData = [
        {
          cyData: "lastName",
          value: data.lastName,
        },
        {
          cyData: "firstName",
          value: data.firstName,
        },
        {
          cyData: "email",
          value: data.email,
        },
        {
          cyData: "phone",
          value: "bad phone",
        },
        {
          cyData: "message",
          value: data.message,
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

  describe("Contact without phone", () => {
    it("it should send: message sent", () => {
      const formData = [
        {
          cyData: "lastName",
          value: data.lastName,
        },
        {
          cyData: "firstName",
          value: data.firstName,
        },
        {
          cyData: "email",
          value: data.email,
        },
        {
          cyData: "message",
          value: data.message,
        },
      ];

      CypressTest.loopFormFill(formData);

      CypressTest.clickCyData(cy, "btn-form");

      CypressTest.successToastContains(
        cy,
        0,
        "form:success",
        contactTranslations,
      );
    });
  });

  describe("Contact with phone", () => {
    it("it should send: message sent", () => {
      const formData = [
        {
          cyData: "lastName",
          value: data.lastName,
        },
        {
          cyData: "firstName",
          value: data.firstName,
        },
        {
          cyData: "email",
          value: data.email,
        },
        {
          cyData: "phone",
          value: data.phone,
        },
        {
          cyData: "message",
          value: data.message,
        },
      ];

      CypressTest.loopFormFill(formData);

      CypressTest.clickCyData(cy, "btn-form");

      CypressTest.successToastContains(
        cy,
        0,
        "form:success",
        contactTranslations,
      );
    });
  });
});
