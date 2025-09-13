import express from "express";
import { signUp } from "../../controllers/Auth/SignUpController.js";
import { signIn } from "../../controllers/Auth/SignInController.js";
const router = express.Router();

router.post("/signUp", signUp);
router.post("/signIn", signIn);

export default router;
