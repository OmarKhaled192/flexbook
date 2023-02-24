const UserValidator = require("../util/authValidator");
const validate = require("validator");
const isValidEmail = (val) => validate.isEmail(val) || /^[0-9]{11}$/.test(val);

module.exports = (req, res, nxt) => {
  let not1;

  if (!isValidEmail(req.body.userName)) {
    req.flash(
      "emailNotVal",
      `Sorry ${req.body.userName} is Not Valid Email Or Phone`
    );
    not1 = true; // this attribute not valid
    console.log("email not valid");
  }

  // check validation of all data
  let valid = UserValidator(req.body);
  if(!valid) console.log(`${JSON.stringify(req.body)} is not valid`);

  if (valid && !not1) {
    req.valid = 1;
    nxt();
  } else {
    if (UserValidator.error != null) {
      console.log(UserValidator.errors);
      for (err of UserValidator.errors) {
        console.log(err["instancePath"]);
        if (
          err["instancePath"] == "/password"
        ) {
          req.flash("passNotVal", "pass not valid");
        }
      }
    }
    console.log("forbidden data");
    req.flash("resultInfo", "user name or password is Invalid");
    req.flash("tagInfo", "warning");
    console.log("All validation is done");
    res.status(403).redirect("back");
  }
};
