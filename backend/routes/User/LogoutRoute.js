import express from "express";
const router = express.Router();
import {verifyToken} from "../../utils/verifyToken.js";
import { Logout } from "../../controllers/Auth/Logout.js";

router.post("/logout", verifyToken, Logout);

export default router;
