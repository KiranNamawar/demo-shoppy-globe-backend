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
import { getEnvVar } from "./utils/env.js";

// load .env file
process.loadEnvFile();

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
app.post("/register", handleRegister);
app.post("/login", handleLogin);

// products routes
app.get("/products", handleProducts);
app.get("/products/:id", handleProductsByID);

// cart routes
app.post("/cart", handleAddToCart);
app.put("/cart/:id", handleUpdateCartItem);
app.delete("/cart/:id", handleRemoveFromCart);

// Global error handler
app.use((error, _, res) => {
  console.error("Server error:", error);
  res.status(500).json({ error: "Interal Server Error" });
});

// start server on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
