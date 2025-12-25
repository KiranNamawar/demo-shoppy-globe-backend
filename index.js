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
import { validateProductId } from "./middlewares/productId.js";

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
app.get(
  "/products/:productId",
  validateProductId("params"),
  handleProductsByID,
);

// cart routes
app.post(
  "/cart",
  authenticateUser,
  validateAddToCartBody,
  validateProductId("body"),
  handleAddToCart,
);
app.put(
  "/cart/:productId",
  authenticateUser,
  validateUpdateCartBody,
  validateProductId("params"),
  handleUpdateCartItem,
);
app.delete(
  "/cart/:productId",
  authenticateUser,
  validateProductId("params"),
  handleRemoveFromCart,
);

// global error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({
    error: "Something went wrong on the server!",
  });
});

// start server on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
