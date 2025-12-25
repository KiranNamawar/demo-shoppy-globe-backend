import mongoose from "mongoose";
import Product from "../models/product.js";

export function validateProductId(source = "body") {
  return async (req, res, next) => {
    // get productId from body is source is body otherwise from params
    const productId =
      source === "body" ? req.body.productId : req.params.productId;

    try {
      // check if productId is valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({
          error: "Invalid Product ID",
        });
      }

      // validate product exists
      const product = await Product.findById(productId).lean();
      if (!product) {
        return res.status(404).json({
          error: "Product doesn't exists",
        });
      }

      req.product = product;

      next();
    } catch (err) {
      next(err);
    }
  };
}
