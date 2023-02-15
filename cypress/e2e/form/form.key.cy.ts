import CypressTestClass from "../../../utils/CypressTest";
import formPageKeyTranslations from "../../../locales/fr/form-page-key.json";
import data from "../../../utils/data";

// classes
const CypressTest = new CypressTestClass();

const url = "http://localhost:3000";

describe("Page: /form/key", () => {
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

  it("it should get 50 form items (page 1)", () => {
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

    CypressTest.getCyData(
      cy,
      "Form-1-User-1",
    ).click();

    CypressTest.countChildren(
      cy,
      "table-body",
      "tr",
      50,
    );
  });

  it("it should get 10 form items (page 2)", () => {
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

    CypressTest.getCyData(
      cy,
      "Form-1-User-1",
    ).click();

    cy.wait(3_000);

    CypressTest.getCyData(
      cy,
      "paging-arrow-next",
    ).click();

    CypressTest.countChildren(
      cy,
      "table-body",
      "tr",
      10,
    );
  });

  it("it should delete the first form item with tooltip", () => {
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

    CypressTest.getCyData(
      cy,
      "Form-1-User-1",
    ).click();

    cy.wait(3_000);

    CypressTest.countChildren(
      cy,
      "table-body",
      "tr",
      50,
    );

    CypressTest.getCyData(cy, "tooltip-0").click({
      force: true,
    });

    CypressTest.getCyData(
      cy,
      "tooltip-delete-0",
    ).click({ force: true });

    CypressTest.countChildren(
      cy,
      "table-body",
      "tr",
      50,
    );

    CypressTest.successToastContains(
      cy,
      0,
      "delete:success",
      formPageKeyTranslations,
    );
  });

  it("it should delete 3 form item with checkbox", () => {
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

    CypressTest.getCyData(
      cy,
      "Form-1-User-1",
    ).click();

    cy.wait(3_000);

    CypressTest.countChildren(
      cy,
      "table-body",
      "tr",
      50,
    );

    CypressTest.getCyData(cy, "selectRow0").click(
      {
        force: true,
      },
    );

    CypressTest.getCyData(cy, "selectRow1").click(
      {
        force: true,
      },
    );

    CypressTest.getCyData(cy, "selectRow2").click(
      {
        force: true,
      },
    );

    CypressTest.getCyData(
      cy,
      "table-btn-delete",
    ).click({ force: true });

    CypressTest.countChildren(
      cy,
      "table-body",
      "tr",
      50,
    );

    CypressTest.successToastContains(
      cy,
      0,
      "delete:many:success",
      formPageKeyTranslations,
    );
  });

  it("it should delete all form item with header checkbox", () => {
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

    CypressTest.getCyData(
      cy,
      "Form-1-User-1",
    ).click();

    cy.wait(3_000);

    CypressTest.countChildren(
      cy,
      "table-body",
      "tr",
      50,
    );

    CypressTest.getCyData(cy, "selectAll").click({
      force: true,
    });

    CypressTest.getCyData(
      cy,
      "table-btn-delete",
    ).click({ force: true });

    CypressTest.countChildren(
      cy,
      "table-body",
      "tr",
      6,
    );

    CypressTest.successToastContains(
      cy,
      0,
      "delete:many:success",
      formPageKeyTranslations,
    );
  });
});
