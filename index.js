import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { handleLogin, handleRegister } from "./controllers/authController.js";
import {
  handleAddToCart,
  handleRemoveFromCart,
  handleUpdateCartItem,
} from "./controllers/cartController.js";
import {
  handleProducts,
  handleProductsByID,
} from "./controllers/productsController.js";
import {
  validateAddToCartBody,
  validateLoginBody,
  validateRegisterBody,
  validateUpdateCartBody,
} from "./middlewares/validation.js";
import { authenticateUser } from "./middlewares/auth.js";
import { getEnvVar } from "./utils/env.js";

// connect to database
const DB_URL = getEnvVar("DB_URL");
await mongoose.connect(DB_URL);

// Initialize Express Application
const app = express();

// parse JSON body
app.use(express.json());

// log request detail
app.use(morgan(":method :url :status - :response-time ms"));

// healthcheck
app.get("/", (_, res) => {
  res.json({ status: "ok" });
});

// auth routes
app.post("/register", validateRegisterBody, handleRegister);
app.post("/login", validateLoginBody, handleLogin);

// products routes
app.get("/products", handleProducts);
app.get("/products/:id", handleProductsByID);

// cart routes
app.use(authenticateUser);
app.post("/cart", validateAddToCartBody, handleAddToCart);
app.put("/cart/:id", validateUpdateCartBody, handleUpdateCartItem);
app.delete("/cart/:id", handleRemoveFromCart);

// start server on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
