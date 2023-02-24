const Ajv = require("ajv");
const schema = {
  type: "object",
  properties: {
    userName: {
      type: "string",
      maxLength: 50,
    },
    password: {
      type: "string",
      minLength: 8,
      pattern:
        "^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8,}$",
    },
  },
  required: ["userName", "password"],
};

const ajv = new Ajv({ allErrors: true });

module.exports = ajv.compile(schema);
