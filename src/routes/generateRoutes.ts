import { Router } from "express";
import { GenerateController } from "../controllers/generateController";

const router = Router();
router.post("/generate", GenerateController.generate);

export default router;
