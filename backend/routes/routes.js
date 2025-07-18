
import express from "express";
import uploadMiddleware from "../middleware/middleware.js";
import createForm from "../controllers/controllers.js";


const router = express.Router();

router.post("/add", uploadMiddleware, createForm);

export default router;