import TestApi from "../../pages/api/test";

import "./signup.cy";
import "./signin.cy";
import "./disconnection.cy";
import "./form/form.creation.cy";
import "./form/form.cy";
import "./form/form.key.cy.ts";
import "./profile.cy";
import "./change-email.cy";
import "./contact.cy";

before(() => {
  new Cypress.Promise(() => TestApi.newDB());
});

beforeEach(() => cy.reload(true));
