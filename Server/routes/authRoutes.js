const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/auth/authControllers");
const auth = require("../middleware/auth");

router.post("/register", authControllers.controllers.postRegister);
router.post("/login", authControllers.controllers.postLogin);
router.get("/test", auth, (req, res) => {
  res.send("request passed");
});

module.exports = router;
