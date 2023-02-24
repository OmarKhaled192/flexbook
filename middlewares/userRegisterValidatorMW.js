const UserValidator = require("../util/userRegisterValidator");
const validate = require("validator");
const isValidEmail = (val) => validate.isEmail(val) || /^[0-9]{11}$/.test(val);
const isIdenticalPasswords = (val1, val2) => val1 === val2;
const date = new Date();
module.exports = (req, res, nxt) => {
  let not1, not2, not3;
  // casting year prop to number
  req.body.year = Number(req.body.year);
  if (req.body.year > date.getFullYear() - 12) {
    req.flash("yearNotVal", "Your age must be more than 12");
    not1 = true; // this attribute not valid
  }

  if (!isValidEmail(req.body.emailOrPhone)) {
    req.flash(
      "emailNotVal",
      `Sorry ${req.body.emailOrPhone} is Not Valid Email Or Phone`
    );
    not2 = true; // this attribute not valid
  }
  if (!isIdenticalPasswords(req.body.pass, req.body.passConf)) {
    req.flash("passwordsNotIdentical", "Your passwords aren't identical ! ");
    not3 = true; // this attribute not valid
  }

  // check validation of all data
  let valid = UserValidator(req.body);
  console.log(valid);
  if (valid && !not1 && !not2 && !not3) {
    req.valid = 1;
    nxt();
  } else {
    if (UserValidator.error != null) {
      console.log(UserValidator.errors);
      for (err of UserValidator.errors) {
        console.log(err["instancePath"]);
        if (err["instancePath"] == "/fn" || err["instancePath"] == "/ln") {
          req.flash("namesNotVal", "names not valid");
        }
        if (
          err["instancePath"] == "/pass" ||
          err["instancePath"] == "/passConf"
        ) {
          req.flash("passNotVal", "pass not valid");
        }
      }
    }
    console.log("forbidden data");
    req.flash("resultInfo", "Data is forbidden");
    req.flash("tagInfo", "warning");
    console.log("All validation is done");
    res.status(403).redirect("back");
  }
};
