import Cart from "../models/cart.js";

export async function handleAddToCart(req, res) {
  let { productId, quantity } = req.body;
  quantity = Number(quantity);
  const userId = req.user.id;
  try {
    // product already in cart
    const productInCart = await Cart.findOne({
      userId,
      "products.productId": productId,
    }).lean();
    if (productInCart) {
      return res.status(409).json({
        error: "Product already in cart. Try updating quantity with PUT",
      });
    }

    // add to cart
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $push: { products: { productId, quantity } } },
      {
        upsert: true, // create Cart if it doesn't exist
        new: true, // return updated cart
      }
    ).lean();

    res.status(201).json({
      message: "Product Added to Cart",
      cart: cart.products,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function handleUpdateCartItem(req, res) {
  const productId = req.params.productId;
  const quantity = Number(req.body.quantity);
  const userId = req.user.id;
  try {
    // product not in cart
    const productInCart = await Cart.findOne({
      userId,
      "products.productId": productId,
    }).lean();
    if (!productInCart) {
      return res.status(404).json({
        error: "Product not in cart. Try adding with POST.",
      });
    }

    // update quantity
    const cart = await Cart.findOneAndUpdate(
      { userId, "products.productId": productId },
      { $set: { "products.$.quantity": quantity } }, // '$' targets the matched array element
      { new: true } // return updated cart
    ).lean();

    res.json({
      message: "Product Quantity Updated in Cart",
      cart: cart.products,
    });
  } catch (err) {
    next(err);
  }
}

export async function handleRemoveFromCart(req, res) {
  const productId = req.params.productId;
  const userId = req.user.id;
  try {
    // product not in cart
    const productInCart = await Cart.findOne({
      userId,
      "products.productId": productId,
    }).lean();
    if (!productInCart) {
      return res.status(404).json({
        error: "Product not in cart.",
      });
    }

    // remove from cart
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { products: { productId } } },
      { new: true } // return updated cart
    );

    res.json({
      message: "Product Removed from Cart",
      cart: cart.products,
    });
  } catch (err) {
    next(err);
  }
}
