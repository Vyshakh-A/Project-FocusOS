import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        const { accessToken, refreshToken } = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            accessToken,
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server error",
            stack: error.stack,
        });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ message: "Invalid email or password" });
        }
        const { accessToken, refreshToken } = generateToken(user._id);
        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            accessToken,
            refreshToken,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server error",
        });
    }
};

export const refreshAccessToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res
                .status(400)
                .json({ message: "Refresh token is required" });
        }

        // Verify refresh token
        const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        );

        // Generate new access token
        const newAccessToken = jwt.sign(
            { id: decoded.id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" },
        );

        res.status(200).json({
            success: true,
            accessToken: newAccessToken,
            message: "Access token refreshed successfully",
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired refresh token",
        });
    }
};
