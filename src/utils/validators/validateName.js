function validadeName(name) {
  const nameRegex = /^[a-zA-Z ]{3,60}$/;
  return nameRegex.test(name);
}

module.exports = { validadeName };
