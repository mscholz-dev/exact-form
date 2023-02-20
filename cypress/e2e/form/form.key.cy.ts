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

  it("it should set to trash the first form item with tooltip", () => {
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
      "trash:success",
      formPageKeyTranslations,
    );
  });

  it("it should set to trash 3 form item with checkbox", () => {
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
      "trash:many:success",
      formPageKeyTranslations,
    );
  });

  it("it should set to trash all form item with header checkbox", () => {
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
      "trash:many:success",
      formPageKeyTranslations,
    );
  });

  it("it should update a form item", () => {
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
      6,
    );

    CypressTest.getCyData(cy, "tooltip-0").click({
      force: true,
    });

    CypressTest.getCyData(
      cy,
      "tooltip-table-edit-0",
    ).click({ force: true });

    CypressTest.inputFill(
      cy,
      "data1",
      "NEW VALUE",
    );

    CypressTest.getCyData(cy, "btn-form").click({
      force: true,
    });

    CypressTest.countChildren(
      cy,
      "table-body",
      "tr",
      6,
    );

    CypressTest.successToastContains(
      cy,
      0,
      "edit:success",
      formPageKeyTranslations,
    );
  });

  it("it should delete a form item in trash with button", () => {
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
      "tooltip-btn",
    ).click();

    CypressTest.getCyData(
      cy,
      "tooltip-btn-1",
    ).click();

    CypressTest.countChildren(
      cy,
      "table-body",
      "tr",
      50,
    );

    CypressTest.getCyData(
      cy,
      "btn-delete-0",
    ).click();

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

  it("it should delete many form item in trash with chechbox", () => {
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
      "tooltip-btn",
    ).click();

    CypressTest.getCyData(
      cy,
      "tooltip-btn-1",
    ).click();

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
    CypressTest.getCyData(cy, "selectRow3").click(
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
      49,
    );

    CypressTest.successToastContains(
      cy,
      0,
      "delete:success",
      formPageKeyTranslations,
    );
  });
});
