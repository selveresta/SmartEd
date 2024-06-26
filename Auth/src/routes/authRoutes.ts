// src/routes/authRoutes.ts
import { Router } from "express";
import AuthController from "../controllers/authController";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/profile", AuthController.authenticate);

export default router;
