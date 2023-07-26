const jwt = require("jsonwebtoken");

// Genrate Token
const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("You are not auth token ~!");

  jwt.verify(token, process.env.JWT_SEC, (err, payload) => {
    if (err) return res.status(403).json("Token is not valid ~!");
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};

module.exports = { verifyToken };
