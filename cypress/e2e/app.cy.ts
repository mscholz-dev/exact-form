import TestApi from "../../pages/api/test";

before(async () => {
  await TestApi.newDB();
});

import "./signup.cy";
// import "./signin.cy";
import "./profile.cy";
// import "./contact.cy";
