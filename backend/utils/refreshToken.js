import jwt from "jsonwebtoken";
import User from "../models/User/UserSchema.js";

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies?.refreshToken || req.body.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh Token missing" });

    let decoded;
    try {
      decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (err) {
      return res
        .status(403)
        .json({ message: "Invalid or expired refresh token" });
    }

    const user = await User.findOne({ _id: decoded.id, refreshToken });
    if (!user)
      return res.status(403).json({ message: "Refresh Token not valid" });

    const newAccessToken = jwt.sign(
      { id: user._id, userName: user.userName, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // Set cookie
    res.cookie("authToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({ message: "Access Token Refreshed" });
  } catch (err) {
    console.error("Error refreshing access token:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
