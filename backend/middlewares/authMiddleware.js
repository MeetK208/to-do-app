import JWT from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  console.log("Here");
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authentication failed: Token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  console.log(token);
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId };
    console.log(req.user)
    next();
  } catch (error) {
    res
      .status(401)
      .json({ message: "Authentication failed: Invalid or expired token" });
  }
};

export default userAuth;
