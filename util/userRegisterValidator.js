const Ajv = require("ajv");
const date = new Date();
const schema = {
  type: "object",
  properties: {
    fn: {
      type: "string",
      pattern: "^[A-Za-z][A-Za-z0-9_]{1,29}$",
      minLength: 2,
      maxLength: 29,
    },
    ln: {
      type: "string",
      pattern: "^[A-Za-z][A-Za-z0-9_]{1,29}$",
      minLength: 2,
      maxLength: 29,
    },
    emailOrPhone: {
      type: "string",
      maxLength: 50,
    },
    pass: {
      type: "string",
      minLength: 8,
      pattern:
        "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$",
      /*
        Ensure string has two uppercase letters,
        it has one special case letter,
        it has two digits,
        it has three lowercase letters,
        it is of length 8 or more.
      */
    },
    passConf: {
      type: "string",
      minLength: 8,
      pattern:
        "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$",
    },
    day: {
      type: "string",
      pattern: "^(3[01]|[12][0-9]|[1-9])$" /* Ensure that day from 1 to 31*/,
    },
    month: {
      type: "string",
      enum: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    year: {
      type: "number",
      maximum: date.getFullYear() - 12,
    },
    gender: {
      type: "string",
      enum: ["male", "female", "custom"],
    },
    customGender: {
      type: "string",
    },
  },
  required: [
    "fn",
    "ln",
    "emailOrPhone",
    "pass",
    "passConf",
    "day",
    "month",
    "year",
    "gender",
  ],
};

const ajv = new Ajv({ allErrors: true });

module.exports = ajv.compile(schema);
