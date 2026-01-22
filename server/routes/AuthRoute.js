import {
    register,
    login,
    refreshAccessToken,
} from "../controllers/AuthController.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);

export default router;
