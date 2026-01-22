import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    // In development: extend token times for easier testing
    // In production: use shorter times for security (15m access, 7d refresh)
    const isDevelopment = process.env.NODE_ENV === "development";

    // Access token expiration
    const accessTokenExpiry = isDevelopment ? "30d" : "15m";

    // Refresh token expiration
    const refreshTokenExpiry = isDevelopment ? "90d" : "7d";

    const accessToken = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: accessTokenExpiry,
    });

    const refreshToken = jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET,
        { expiresIn: refreshTokenExpiry },
    );

    if (isDevelopment) {
        console.log(
            `🔐 Tokens generated (DEVELOPMENT MODE):\n   Access Token expires in: ${accessTokenExpiry}\n   Refresh Token expires in: ${refreshTokenExpiry}`,
        );
    }

    return { accessToken, refreshToken };
};

export default generateToken;
