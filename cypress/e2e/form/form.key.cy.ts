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

    // TODO: test .trigger("click");
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

    CypressTest.getCyData(cy, "tooltip-0").click({
      force: true,
    });

    CypressTest.getCyData(
      cy,
      "tooltip-table-delete-0",
    ).click({ force: true });

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

    CypressTest.getCyData(cy, "selectAll").click({
      force: true,
    });

    CypressTest.getCyData(
      cy,
      "table-btn-delete",
    ).click({ force: true });

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

    CypressTest.getCyData(cy, "tooltip-0").click({
      force: true,
    });

    CypressTest.getCyData(
      cy,
      "tooltip-table-delete-0",
    ).click({ force: true });

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

    CypressTest.successToastContains(
      cy,
      0,
      "delete:many:success",
      formPageKeyTranslations,
    );
  });

  it("it should recover a form item in trash with tooltip", () => {
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

    CypressTest.getCyData(cy, "tooltip-0").click({
      force: true,
    });

    CypressTest.getCyData(
      cy,
      "tooltip-table-recover-0",
    ).click({ force: true });

    CypressTest.successToastContains(
      cy,
      0,
      "recover:success",
      formPageKeyTranslations,
    );
  });

  it("it should recover 3 form items with checkbox", () => {
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
      "table-btn-recover",
    ).click({
      force: true,
    });

    CypressTest.successToastContains(
      cy,
      0,
      "recover:many:success",
      formPageKeyTranslations,
    );
  });

  it("it should recover 45 form items with checkbox all", () => {
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

    CypressTest.getCyData(cy, "selectAll").click({
      force: true,
    });

    CypressTest.getCyData(
      cy,
      "table-btn-recover",
    ).click({
      force: true,
    });

    CypressTest.successToastContains(
      cy,
      0,
      "recover:many:success",
      formPageKeyTranslations,
    );
  });
});
