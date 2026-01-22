import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protect = async (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res
                .status(401)
                .json({ message: "Not authorized, no token" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id);

        next();
    } catch (e) {
        // Check if token is expired
        if (e.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Token expired",
                code: "TOKEN_EXPIRED",
                expiredAt: e.expiredAt,
            });
        }
        const response = { message: "Invalid or expired token" };
        if (process.env.NODE_ENV === "development") {
            response.error = e.message;
        }
        res.status(401).json(response);
    }
};

export default protect;
