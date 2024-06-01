// analytics-service/src/routes/analyticsRoutes.ts
import { Router } from "express";
import { AnalyticsController } from "../controllers/analyric.controller";

const analyticsController = new AnalyticsController();
const router = Router();

router.get("/report/:type", analyticsController.generateReport);

export default router;
