const jwt = require("jsonwebtoken");
const handleError = require("./error.js");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("try1");
  if (!token) {
    return next(handleError(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRETKEY, (err, user) => {
    if (err) {
      return next(handleError(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

module.exports = { verifyToken };
