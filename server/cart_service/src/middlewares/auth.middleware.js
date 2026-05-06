const jwt = require("jsonwebtoken");

// const createAuthMiddleware = (roles = ["user"]) => {
//   return function authMiddleware(req, res, next) {
//     const token =
//       req.cookies?.token || req.headers?.authorization?.split(" ")[1];

//     if (!token) {
//       return res
//         .status(401)
//         .json({ message: "Unathorized: token is not provided" });
//     }

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       if (!roles.includes(decoded.role)) {
//         return res
//           .status(403)
//           .json({ message: "Forbidden: You don't have enough permission" });
//       }

//       req.user = decoded;

//       next();
//     } catch (err) {
//       return res.status(401).json({ message: "Unauthorized: Invalid token" });
//     }
//   };
// };


function createAuthMiddleware(roles = ["user"]) {
  return (req, res, next) => {

    const userId = req.headers["x-user-id"];
    const role = req.headers["x-user-role"];

    if (!userId) {
      return res.status(401).json({ message: "User ID is required" });
    }

    if (!roles.includes(String(role))) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    req.user = {
      id: userId,
      role: String(role),
    };

    next();
  };
}

module.exports = createAuthMiddleware;

