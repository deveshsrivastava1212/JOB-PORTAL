import express from "express"
import { testPostController } from "../controllers/testControllers.js";
import userAuth from "../middelwares/authMiddelware.js";

const router = express.Router();

router.post('/test-post', userAuth, testPostController);

export default router;