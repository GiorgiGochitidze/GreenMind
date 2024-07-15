const express = require("express");
const cors = require("cors");
const PORT = 5000;
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("./User");

const app = express();
app.use(express.json());
app.use(cors());

const dbUserPass = process.env.DB_USER_PASS;

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Example usage to generate a random string of length 64
const randomString = generateRandomString(64);

const uri = `mongodb+srv://greenmind2424:${dbUserPass}@greenmind.apcab2o.mongodb.net/?retryWrites=true&w=majority&appName=GreenMind`;

mongoose
  .connect("mongodb://localhost:27017/GreenMind")
  .then(() => {
    console.log("Connected MongoDB Succesfully");
  })
  .catch((err) => {
    console.log("Something went wrong while connecting", err);
  });

app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if userName or email already exist
    const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .send("User with that userName or email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ userName, email, password: hashedPassword });

    await newUser.save();

    console.log("User saved successfully");
    res.status(200).send("User registered successfully");
  } catch (err) {
    console.log("Something wrong in saving user", err);
    res.status(500).send("Something went wrong while saving the user");
  }
});

app.post("/logIn", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if userName or email exists
    const user = await User.findOne({ $or: [{ userName }, { email }] });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    // Generate JWT token
    const token = jwt.sign({ userName: user.userName }, randomString, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.log("Error during login", err);
    res.status(500).send("Something went wrong during login");
  }
});


app.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
