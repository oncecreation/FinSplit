import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  let userAgent = req.header("user-agent");
  let token = "";

  // const paragraph = 'PostmanRuntime/7.26.8';
  const regex = /^PostmanRuntime/i;
  if (regex.test(userAgent)) {
    token = req.header("authorization").split(" ")[1];
  } else {
    token = req.header("authorization");
  }
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

export default auth;
