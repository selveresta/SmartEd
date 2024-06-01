// resource-service/src/routes/resourceRoutes.ts
import { Router } from "express";
import { ResourceController } from "../controllers/resources.controller";

const resourceController = new ResourceController();
const router = Router();

router.post("/resources", resourceController.uploadMiddleware(), resourceController.addResource);
router.get("/resources/:userId", resourceController.getResources);
router.put("/resources/:id", resourceController.updateResource);
router.delete("/resources/:id", resourceController.deleteResource);

export default router;
