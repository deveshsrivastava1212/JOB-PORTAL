import express from "express"
import { testPostController } from "../controllers/testControllers.js";

const router = express.Router();

router.post('/test-post', testPostController);

export default router;