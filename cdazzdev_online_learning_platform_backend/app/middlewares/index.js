const role = require("./authJwt");
const verifySignUp = require("./verifySignUp");

// Export all middlewares
module.exports = {
  role,
  verifySignUp,
};
