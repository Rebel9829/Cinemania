const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const isLoggedIn = require("../middleware/isLoggedIn");
const mainControllers = require("../controllers/main/mainControllers");

router.post(
  "/addInitialDetails",
  auth,
  mainControllers.controllers.addInitialDetails
);

module.exports = router;
