import express from "express";
import { addData } from "../controllers/controllers.js";
const router = express.Router();

router.post("/add", addData);

export default router;
