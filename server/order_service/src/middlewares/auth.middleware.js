// const jwt = require("jsonwebtoken");

// function createAuthMiddleware(roles = ["user"]) {
//   return (req, res, next) => {

//     const userId = req.headers["x-user-id"];
//     const role = req.headers["x-user-role"];

//     if (!userId) {
//       return res.status(401).json({ message: "User ID is required" });
//     }

//     if (!roles.includes(String(role))) {
//     return res.status(403).json({ message: "Insufficient permissions" });
//     }

//     req.user = {
//       id: userId,
//       role: String(role),
//     };

//     next();
//   };
// }

// module.exports = createAuthMiddleware;
















// const jwt = require("jsonwebtoken");

// function createAuthMiddleware(roles = ["user"]) {
//   return (req, res, next) => {
//     try {
//       const token = req.cookies?.token;

//       if (!token) {
//         return res.status(401).json({
//           message: "Token is required",
//         });
//       }

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       if (!roles.includes(String(decoded.role))) {
//         return res.status(403).json({
//           message: "Insufficient permissions",
//         });
//       }

//       req.user = {
//         id: decoded.id,
//         role: decoded.role,
//       };

//       next();
//     } catch (error) {
//       return res.status(401).json({
//         message: "Invalid token",
//       });
//     }
//   };
// }

// module.exports = createAuthMiddleware;








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

