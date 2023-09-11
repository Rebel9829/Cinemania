const jwt = require("jsonwebtoken"); 

const getSuccess = (req, res) => {
  const user = req.user;
  const token = jwt.sign({ user }, process.env.AUTH_TOKEN, {
    expiresIn: "72h",
  });
  return res.redirect("http://localhost:3000/?user=" + token);
};

module.exports = getSuccess;
