import TestApi from "../../pages/api/test";

before(async () => {
  await TestApi.newDB();
});

import "./signup.cy";
// import "./signin.cy";
import "./profile.cy";
import "./change-email.cy";
// import "./contact.cy";
