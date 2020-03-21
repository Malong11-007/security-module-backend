// config.js
const dotenv = require('dotenv').config({
  path: __dirname+'/../.env'
});
module.exports = {
  "jwt_secret" : process.env.JWT_SECRET,
};