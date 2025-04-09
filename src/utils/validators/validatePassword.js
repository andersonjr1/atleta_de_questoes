function validatePassword(password) {
  return (
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    password.length >= 8 &&
    password.length <= 30
  );
}

module.exports = { validatePassword };
