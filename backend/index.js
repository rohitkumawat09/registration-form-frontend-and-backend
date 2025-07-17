import express from "express"; // Express is a web framework for Node.js, designed for building web applications and APIs

import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./routes/routes.js";
// import multer from "multer";
// const upload = multer({ dest: 'uploads/' })

const app = express();

const port = process.env.PORT;

connectDB();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/details", userRouter);

app.listen(port, () => console.log(`Server started at port ${port}`));
