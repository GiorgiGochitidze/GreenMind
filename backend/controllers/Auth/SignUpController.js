import bcrypt from "bcrypt";
import User from "../../models/User/UserSchema.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
      return res.status(400).json({ message: " All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const emailDomain = email.split("@")[1];

    // allowed domains
    const allowedDomains = [
      "gmail.com",
      "outlook.com",
      "yahoo.com",
      "icloud.com",
      "hotmail.com",
      "protonmail.com",
    ];

    // blocked disposable domains
    const blockedDomains = [
      "tempmail.com",
      "10minutemail.com",
      "mailinator.com",
      "guerrillamail.com",
      "fakeinbox.com",
    ];

    if (!allowedDomains.includes(emailDomain)) {
      return res
        .status(400)
        .json({ message: "Only popular email providers are allowed" });
    }

    if (blockedDomains.includes(emailDomain)) {
      return res
        .status(400)
        .json({ message: "Disposable emails are not allowed" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
      role: "user",
    });

    const accessToken = jwt.sign(
      {
        id: newUser._id,
        userName: newUser.userName,
        role: newUser.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "7d" }
    );

    newUser.refreshToken = refreshToken;
    await newUser.save();

    res.cookie("authToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({ message: "Sign Up Completed Successfully" });
  } catch (err) {
    console.log("Error while signing in user", err);
    res.status(500).send("Error while signing in user");
  }
};