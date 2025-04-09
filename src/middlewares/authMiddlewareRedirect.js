const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/env.js");

const authTokenRedirect = (req, res, next) => {
  try {
    const token = req.cookies.SESSION_ID;
    if (!token) {
      return res.redirect("/login");
    }
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    return res.redirect("/login");
  }
};

module.exports = {
  authTokenRedirect,
};
