const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

const User = require("./User");
const Products = require("./Products");
const Comments = require("./Comments");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = "./uploads/";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save with original file name
  },
});

const upload = multer({ storage: storage });

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
const mongoLocal = "mongodb://localhost:27017/GreenMind"

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected MongoDB Successfully");
  })
  .catch((err) => {
    console.log("Something went wrong while connecting", err);
  });

app.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
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
      role: "User",
      comments: [],
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
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Invalid password");
    }

    const token = jwt.sign(
      { userId: user._id, userName: user.userName, role: user.role },
      randomString,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
    console.log("User Logged In Successfully");
  } catch (err) {
    console.log("Error during login", err);
    res.status(500).send("Something went wrong during login");
  }
});

app.post("/addToCart", async (req, res) => {
  const { userId, imgUrl, plantsname, price, cardId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if the item already exists in the user's cart
    const itemExists = user.cart.some((item) => item.cardId === cardId);

    if (itemExists) {
      return res.status(400).send("Item already in cart");
    }

    // Add the item to the user's cart
    user.cart.push({ imgUrl, plantsname, price, cardId });
    await user.save();

    res.status(200).send("Successfully added to cart");
  } catch (err) {
    console.log("Error adding to cart", err);
    res.status(500).send("Something went wrong while adding to the cart");
  }
});

app.post("/loadCart", async (req, res) => {
  const { userId } = req.body;

  try {
    // Find the user and their cart
    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return res.status(404).send("User not found");
    }

    // Extract card IDs from the user's cart
    const cardIds = user.cart.map((item) => item.cardId);

    // Fetch card details for each card ID
    const cards = await Products.find({ _id: { $in: cardIds } });

    // Create a map of card ID to card details
    const cardMap = cards.reduce((map, card) => {
      map[card._id.toString()] = card;
      return map;
    }, {});

    // Combine card data with user's cart items
    const detailedCartItems = user.cart.map((cartItem) => {
      const card = cardMap[cartItem.cardId.toString()];
      return {
        ...cartItem,
        imgUrl: card.imgUrl,
        price: card.price,
        plantsname: card.plantsname,
        purchashes: card.purchashes,
      };
    });

    res.status(200).json(detailedCartItems);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong while fetching the cart");
  }
});

app.post("/removeFromCart", async (req, res) => {
  const { userId, plantsname, price, cardId } = req.body;

  try {
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { cart: { plantsname: plantsname, price: price, cardId: cardId } },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).json(user.cart);
  } catch (err) {
    console.log(err);
    res.status(404).send("Something went wrong when removing item from cart");
  }
});

app.post("/addNewPlant", upload.single("image"), async (req, res) => {
  const { plantName, plantPrice1, plantPrice2, amount, codenum } = req.body;
  try {
    const { path } = req.file; // Path to temporary uploaded file

    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(path, { folder: "plants" });

    // Set plantPrice based on plantPrice1 or default to 0
    const plantPrice = plantPrice1 === "1-500-მდე" ? plantPrice1 : 0;

    // Save new plant to MongoDB
    const newPlant = new Products({
      imgUrl: result.secure_url,
      plantsname: plantName,
      price: plantPrice,
      purchashes: 0,
      amount: amount,
      codenum: codenum
    });

    await newPlant.save();
    res.status(201).json({ message: "Plant added successfully" });
  } catch (error) {
    console.error("Error adding plant:", error);
    res.status(500).json({ message: "Failed to add plant" });
  }
});


app.post("/loadPlants", async (req, res) => {
  try {
    const plants = await Products.find(
      {},
      "imgUrl plantsname price purchashes"
    );
    res.status(200).json(plants);
  } catch (err) {
    console.error("Error loading plants:", err);
    res.status(500).json({ message: "Failed to load plants" });
  }
});

app.post("/deleteProduct", async (req, res) => {
  const { cardId } = req.body;

  try {
    // Find product in Products collection to get cloudinaryId
    const product = await Products.findById(cardId);

    // Ensure product exists
    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Delete from Cloudinary using cloudinaryId
    if (product.cloudinaryId) {
      await cloudinary.uploader.destroy(product.cloudinaryId);
    }

    // Delete from Products collection based on _id
    await Products.findByIdAndDelete(cardId);

    // Delete from all users' carts
    await User.updateMany({}, { $pull: { cart: { cardId: cardId } } });

    res.status(200).send("Product deleted successfully");
  } catch (err) {
    console.log("Error deleting product", err);
    res.status(500).send("Something went wrong while deleting the product");
  }
});

app.post("/updateUser", async (req, res) => {
  const { userId, userName, email, password } = req.body;

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Track changes
    let changes = {};

    // Compare and update fields if they are different
    if (user.userName !== userName) {
      changes.userName = userName;
    }
    if (user.email !== email) {
      changes.email = email;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      changes.password = hashedPassword;
    }

    // Update the user if there are changes
    if (Object.keys(changes).length > 0) {
      await User.findByIdAndUpdate(userId, changes);
      return res.status(200).send("User updated successfully");
    } else {
      return res.status(200).send("No changes made");
    }
  } catch (err) {
    console.log("Error updating user", err);
    res.status(500).send("Something went wrong while updating the user");
  }
});

app.post("/addNewComment", async (req, res) => {
  const { userName, profession, comment, rating, userId } = req.body;

  try {
    // Find the user by ID
    const commentUser = await User.findById(userId);
    if (!commentUser) {
      return res.status(404).send("User not found");
    }

    // Create a new comment
    const newComment = new Comments({
      userName,
      profession,
      comment,
      rating,
      userId,
    });

    // Save the new comment
    await newComment.save();

    // Update the user's comments array with the new comment's ID
    await User.findByIdAndUpdate(userId, {
      $push: { comments: newComment._id },
    });

    res.status(200).send("Comment added successfully");
  } catch (err) {
    console.log("Something went wrong", err);
    res.status(500).send("Something went wrong while adding new comment", err);
  }
});

app.post("/loadComments", async (req, res) => {
  try {
    // Retrieve all comments from the Comments collection
    const comments = await Comments.find({});

    // Send the comments data as a JSON response
    res.status(200).json(comments);
  } catch (err) {
    console.log("Error loading comments:", err);
    res.status(500).send("Error loading comments");
  }
});

app.post("/editComment", async (req, res) => {
  const { editTxt, cardId } = req.body;

  try {
    // Find the comment by its ID and update its comment field
    const updatedComment = await Comments.findByIdAndUpdate(cardId, {
      comment: editTxt,
    });

    // Check if the comment was found and updated
    if (!updatedComment) {
      return res.status(404).send("Comment not found");
    }

    console.log(updatedComment);
    res.status(200).send("Comment updated successfully");
  } catch (err) {
    console.log("Error changing comments:", err);
    res.status(500).send("Error changing comments");
  }
});

app.post("/deleteComment", async (req, res) => {
  const { cardId } = req.body;

  try {
    // Convert cardId to ObjectId
    const objectId = new mongoose.Types.ObjectId(cardId);

    // Find the comment by its ID
    const currentComment = await Comments.findById(objectId);

    // Delete the comment
    const deletedComment = await Comments.findByIdAndDelete(objectId);

    // Check if the comment was found and deleted
    if (!deletedComment) {
      return res.status(404).send("Comment not found");
    }

    // Update the user's comments array to remove the deleted comment's ID
    if (currentComment) {
      await User.findByIdAndUpdate(currentComment.userId, {
        $pull: { comments: objectId },
      });
    }

    res.status(200).send("Comment deleted successfully");
  } catch (err) {
    console.log("Error deleting comment:", err);
    res.status(500).send("Error deleting comment");
  }
});

app.post("/loadUsers", async (req, res) => {
  try {
    const loadedUsers = await User.find({});

    res.status(200).json(loadedUsers);
  } catch (err) {
    console.log("Error loading users:", err);
    res.status(500).send("Error loading users");
  }
});

app.post("/sentCardPurchashes", async (req, res) => {
  const { amount, id } = req.body; // Extract amount and id from the request body

  try {
    // Find the product by ID and update its purchashes by incrementing with the amount
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      { $inc: { purchashes: amount } }, // Increment the purchashes field by the given amount
      { new: true } // Return the updated document
    );

    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }

    res.status(200).send("purchashed successfully"); // Send the updated product data as a response
  } catch (err) {
    console.log("Error updating purchases:", err);
    res.status(500).send("Error updating product purchases");
  }
});

app.post("/editPlantCard", async (req, res) => {
  const { newPlantName, newPlantPrice, cardId } = req.body;

  try {
    // Create an object with conditional properties
    const updateFields = {
      ...(newPlantName && { plantsname: newPlantName }),
      ...(newPlantPrice && { price: newPlantPrice })
    };

    // Update the card only with the fields that are provided
    const currentCard = await Products.findByIdAndUpdate(cardId, updateFields);

    res.status(200).send('Card Changed Successfully');
  } catch (err) {
    console.log("Error editing card:", err);
    res.status(500).send("Error editing card");
  }
});



app.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
