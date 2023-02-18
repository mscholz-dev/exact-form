import CypressTestClass from "../../../utils/CypressTest";
import formPageTranslations from "../../../locales/fr/form-page.json";
import data from "../../../utils/data";

// classes
const CypressTest = new CypressTestClass();

const url = "http://localhost:3000";

describe("Page: /form", () => {
  beforeEach(() => {
    cy.visit(`${url}/fr/form`);
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

  it("it should get 8 forms (page 1)", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    CypressTest.countChildren(
      cy,
      "article",
      "a",
      8,
    );
  });

  it("it should get 8 forms (page 2)", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    CypressTest.getCyData(
      cy,
      "paging-arrow-next",
    ).click();

    CypressTest.countChildren(
      cy,
      "article",
      "a",
      8,
    );
  });

  it("it should get 4 forms (page 3)", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    CypressTest.getCyData(
      cy,
      "paging-arrow-next",
    ).click();

    CypressTest.getCyData(
      cy,
      "paging-arrow-next",
    ).click();

    CypressTest.countChildren(
      cy,
      "article",
      "a",
      4,
    );
  });

  it("it should delete a form (page 3)", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    CypressTest.getCyData(
      cy,
      "paging-arrow-next",
    ).click();

    CypressTest.getCyData(
      cy,
      "paging-arrow-next",
    ).click();

    CypressTest.countChildren(
      cy,
      "article",
      "a",
      4,
    );

    CypressTest.getCyData(
      cy,
      "tooltip-0",
    ).click();

    CypressTest.getCyData(
      cy,
      "tooltip-delete-0",
    ).click();

    CypressTest.countChildren(
      cy,
      "article",
      "a",
      3,
    );

    CypressTest.successToastContains(
      cy,
      0,
      "delete:success",
      formPageTranslations,
    );
  });

  it("it should edit the first form", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    CypressTest.countChildren(
      cy,
      "article",
      "a",
      8,
    );

    CypressTest.getCyData(
      cy,
      "tooltip-0",
    ).click();

    CypressTest.getCyData(
      cy,
      "tooltip-edit-0",
    ).click();

    CypressTest.inputFill(
      cy,
      "name",
      "CYPRESS TEST UPDATE NAME",
    );

    CypressTest.selectOption(
      cy,
      "timezone",
      "Asia/Kamchatka",
    );

    CypressTest.getCyData(cy, "btn-form").click();

    CypressTest.successToastContains(
      cy,
      0,
      "edit:success",
      formPageTranslations,
    );
  });
});
