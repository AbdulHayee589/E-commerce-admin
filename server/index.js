import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import { register, login } from "./controllers/auth.js";
import {
  addproduct,
  getProduct,
  deleteProduct,
  editProduct,
  printifyProduct,
} from "./controllers/ProductRoutes.js";
import {
  getPrintifyProduct,
  PrintifyAuth,
  getSpecificProduct,
} from "./controllers/PrintfyRoutes.js";

//File Handling
import multer from "multer";
import { getUsers } from "./controllers/UserRoutes.js";
const upload = multer({ dest: "uploads/" });

//CONFIGURATION
const app = express();
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "30mb" }));

//Routes AUTH
app.post("/auth/register", register);
app.post("/auth/login", login);

//PRODUCT ROUTES
app.post("/product/add", upload.array("images", 5), addproduct);

app.post("/product/add/printify", upload.array("images", 5), printifyProduct);
app.get("/product/all", getProduct);
app.post("/product/delete", deleteProduct);
app.post("/product/edit", upload.array("images", 5), editProduct);

//PRINTIFY ROUTES
app.get("/product/printify/auth", PrintifyAuth);
app.get("/product/printify/add", getPrintifyProduct);
app.post("/product/printify/getproduct", getSpecificProduct);

//Routes USERS/users/all
app.get("/users/all", getUsers);

//Mongoose AND Server SETUP
const PORT = process.env.PORT || 6001;
const host = "0.0.0.0";
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, host, () => console.log(`Server Port:${PORT}`));
  })
  .catch((err) => console.log(`${err} did not connect`));
