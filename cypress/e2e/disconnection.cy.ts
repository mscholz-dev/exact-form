import CypressTestClass from "../../utils/CypressTest";
import data from "../../utils/data";

// classes
const CypressTest = new CypressTestClass();

const url = "http://localhost:3000";

describe("Action: disconnection", () => {
  beforeEach(() => {
    cy.visit(`${url}/fr`);
  });

  it("it should not be able to click on disconnection header button", () => {
    CypressTest.shouldNotExistByCyData(
      cy,
      "btn-disconnection",
    );
  });

  it("it should not be able to click on disconnection header button", () => {
    CypressTest.setCookie(
      cy,
      "user",
      `${data.validFrJwt}!`,
    );

    CypressTest.shouldNotExistByCyData(
      cy,
      "btn-disconnection",
    );
  });

  it("it should not be able to click on disconnection header button", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.userNotFoundJwt,
    );

    CypressTest.shouldNotExistByCyData(
      cy,
      "btn-disconnection",
    );
  });

  it("it should click on disconnection header button", () => {
    CypressTest.setCookie(
      cy,
      "user",
      data.validFrJwt,
    );

    cy.visit(`${url}/fr`);

    CypressTest.clickCyData(
      cy,
      "btn-disconnection",
    );

    CypressTest.shouldRedirect(cy, `${url}/fr`);

    CypressTest.shouldNotExistByCyData(
      cy,
      "btn-disconnection",
    );
  });
});
