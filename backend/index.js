import express from "express"; // Express is a web framework for Node.js, designed for building web applications and APIs
import mongoose from "mongoose"; // Mongoose is a middleware that helps our express server to easily communicate with the Mongo DB
import "dotenv/config";
import cors from "cors";

const app = express();
const port = 4000;




mongoose.connect(process.env.MONGO_CONNECTION);
const DetailSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  dob: { type: String },
  gender: { type: String },
       friendName: { type: String, },

  parentName: { type: String },
  parentPhone: { type: Number },
  localAddress: { type: String },
  permanentAddress: { type: String },
  sameAddress: { type: Boolean, default: false },
  status: { type: String, default: "Student" },
  qualification: { type: String },
  year: { type: String },
  college: { type: String },
  course: { type: String },
  source: { type: String, default: "Google" },
  agreed: { type: Boolean, default: false }
});


const DetailModel = mongoose.model("detail", DetailSchema);




const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());


app.post("/api/details/add", async (req, res) => {
  try {
    console.log(req.body);
    
    const dataToAdd = new DetailModel(req.body);
    await dataToAdd.save();
    res.status(200).send("Data Added");
  } catch (error) {
    console.log(error);
    res.status(500).send("There is an error", error.message);
  }
});



app.listen(port, () => console.log(`Server started at port ${port}`));


// import express from "express";
// import mongoose from "mongoose";
// import "dotenv/config";
// import cors from "cors";

// const app = express();
// const port = 4000;


// mongoose.connect(process.env.MONGO_CONNECTION)
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));


// const DetailSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true },
//   phone: { type: Number, required: true },
//   dob: { type: String },
//   gender: { type: String },
//   parentName: { type: String },
//   parentPhone: { type: Number },
//   localAddress: { type: String },
//   permanentAddress: { type: String },
//   sameAddress: { type: Boolean, default: false },
//   status: { type: String, default: "Student" },
//   qualification: { type: String },
//   year: { type: String },
//   college: { type: String },
//   course: { type: String },
//   source: { type: String, default: "Google" },
//   agreed: { type: Boolean, default: false }
// });

// const DetailModel = mongoose.model("detail", DetailSchema);

// app.use(cors({ origin: "http://localhost:5173" }));
// app.use(express.json());

// app.post("/api/details/add", async (req, res) => {
//   try {
//     console.log("Received Data:", req.body);

//     const dataToAdd = new DetailModel(req.body);
//     await dataToAdd.save();

//     res.status(200).send("Data Added");
//   } catch (error) {
//     console.error("Error while saving data:", error);
//     res.status(500).json({
//       message: "There is an error while saving data",
//       error: error.message
//     });
//   }
// });

// app.listen(port, () => console.log(`Server started at port ${port}`));
