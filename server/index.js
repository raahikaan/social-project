import express from "express";
import bodyparser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/user.js"
import postRoutes from "./routes/post.js"
import { register } from "./controllers/auth.js"
import { createPost} from "./controllers/post.js"
import { varifyToken } from "./middleware/auth.js";


/* configurations */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express()
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyparser.json({ limit: "30mb", extended: true }));
app.use(bodyparser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* setup file storage */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/assets');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });


/* routes with file */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", varifyToken, upload.single("picture"), createPost)

/* routes */
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)


/* mongoose setup */
const PORT = process.env.PORT || 6001;

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Server Running On http://localhost:${PORT}`));
}).catch((error) => console.log(`${error} did not connect`));