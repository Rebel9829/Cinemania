const postLogin = require("./postLogin");
const postRegister = require("./postRegister");
const getFailed = require("./getFailed");
const getSuccess = require("./getSuccess");
const getGoogle = require("./getGoogle");
const getFacebook = require("./getFacebook");
const getGoogleRedirect = require("./getGoogleRedirect");
const getFacebookRedirect = require("./getFacebookRedirect");

exports.controllers = {
  postLogin,
  postRegister,
  getFailed,
  getSuccess,
  getGoogle,
  getGoogleRedirect,
  getFacebook,
  getFacebookRedirect
};
