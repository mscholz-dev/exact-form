import CypressTestClass from "../../../utils/CypressTest";
import formTranslations from "../../../locales/fr/form.json";
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

  it("it should get 5 forms (page 3)", () => {
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
});
