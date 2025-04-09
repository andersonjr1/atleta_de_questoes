const bcrypt = require("bcrypt");

function comparePassword(password, hashedPassword) {
  try {
    const match = bcrypt.compareSync(password, hashedPassword);
    return match;
  } catch (error) {
    throw error;
  }
}

module.exports = { comparePassword };
