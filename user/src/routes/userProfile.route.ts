// user-service/src/routes/userProfileRoutes.ts
import { Router } from "express";
import { UserProfileController } from "../controllers/userProfile.controller";

const userProfileController = new UserProfileController()

const router = Router();

router.get("/profile/:userId", userProfileController.getProfile);
router.put("/profile/:userId", userProfileController.updateProfile);

export default router;
