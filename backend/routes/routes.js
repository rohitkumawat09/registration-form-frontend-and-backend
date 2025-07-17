import express from "express";
import { addData } from "../controllers/controllers.js";
import logMethod from "../middleware/middleware.js";
const router = express.Router();

router.post("/add",logMethod, addData);

export default router;
