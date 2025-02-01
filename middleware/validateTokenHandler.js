import jwt from 'jsonwebtoken';

const validateToken = async (req, res, next) => {
  try {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      // Verify the token
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded.user; // Attach the user to the request object
      next(); // Call the next middleware
    } else {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  } catch (err) {
    res.status(401).json({ message: err.message || "User is not authorized" });
  }
};

export default validateToken;