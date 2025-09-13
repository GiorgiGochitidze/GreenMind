import express from "express";
const router = express.Router();
import { verifyToken } from "../../utils/verifyToken.js";
import { LoadUser } from "../../controllers/User/LoadUserController.js";

router.post("/loadUserAuth", verifyToken, LoadUser);

export default router;
