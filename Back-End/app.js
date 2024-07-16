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
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

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

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
      cart: [],
    });

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
    const token = jwt.sign(
      { userId: user._id, userName: user.userName },
      randomString,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.log("Error during login", err);
    res.status(500).send("Something went wrong during login");
  }
});

app.post("/addToCart", async (req, res) => {
  const { userId, plantsname, price } = req.body;

  try {
    await User.findByIdAndUpdate(userId, {
      $push: { cart: { plantsname, price } },
    });

    res.status(200).send("Successfully added to cart");
  } catch (err) {
    console.log("Error adding to cart", err);
    res.status(500).send("Something went wrong while adding to the cart");
  }
});

app.post("/loadCart", async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      res.status(404).send("User not found");
    }

    res.status(200).json(user.cart);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong while fetching the cart");
  }
});

app.post("/removeFromCart", async (req, res) => {
  const { userId, plantsname, price } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { cart: { plantsname: plantsname, price: price } },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user.cart)

  } catch (err) {
    console.log(err);
    res.status(404).send("Something went wrong when removing item from cart");
  }
});

app.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
