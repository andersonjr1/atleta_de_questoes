const bcrypt = require("bcrypt");

function hashPassword(password) {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (error) {
    throw error;
  }
}

module.exports = { hashPassword };
