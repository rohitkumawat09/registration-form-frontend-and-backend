import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";


const _filename = fileURLToPath(import.meta.url); 
const _dirname = path.dirname(_filename);         


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(_dirname, "../uploads")); 
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});


const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } 
});


const uploadMiddleware = upload.fields([
  { name: "aadhaarFront", maxCount: 1 },
  { name: "aadhaarBack", maxCount: 1 }
]);

export default uploadMiddleware;
