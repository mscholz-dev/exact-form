import TestApi from "../../pages/api/test";

before(async () => {
  await TestApi.newDB();
});

beforeEach(() => cy.reload(true));

import "./signup.cy";
import "./signin.cy";
import "./disconnection.cy";
import "./form/form.creation.cy";
import "./profile.cy";
import "./change-email.cy";
import "./contact.cy";
