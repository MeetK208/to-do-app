import express from "express";
import {
  loginController,
  registerController,
  logoutController,
} from "../controllers/userController.js";

const router = express.Router();

// routes register Post
router.post("/register/", registerController);

// routes Login post
router.post("/login/", loginController);

router.post("/logout/", logoutController);


// export
export default router;