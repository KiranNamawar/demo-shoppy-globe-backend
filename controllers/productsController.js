import Product from "../models/product.js";

export async function handleProducts(req, res) {
  try {
    const products = await Product.find().lean();
    res.json(products);
  } catch (err) {
    next(err);
  }
}

export async function handleProductsByID(req, res) {
  res.send(req.product);
}
