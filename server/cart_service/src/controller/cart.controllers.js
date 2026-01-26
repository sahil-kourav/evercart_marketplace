const cartModel = require("../models/cart.model");

async function getUserCart(req, res) {
  try {
    const user = req.user;
    let cart = await cartModel.findOne({ user: user.id });
    if (!cart) {
      cart = new cartModel({ user: user.id, items: [] });
      await cart.save();
    }   
    res.status(200).json({
        cart,
        totals: {
            itemCount: cart.items.length,
            totalQuantity: cart.items.reduce((sum, item) => sum + item.quantity, 0)
        }
    });

    } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function addItemToCart(req, res) {
  try {
    const { productId, qty } = req.body;

    const user = req.user;

    let cart = await cartModel.findOne({ user: user.id });

    if (!cart) {
      cart = new cartModel({ user: user.id, items: [] });
    }

    const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += qty;
    } else {
      cart.items.push({ productId, quantity: qty });
    }

    await cart.save();

    return res.status(200).json({
      message: "Item added to cart successfully",
      cart,
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateCartItem(req, res) {
  try {
    const { productId } = req.params;
    const { qty } = req.body;
    const user = req.user;

    const cart = await cartModel.findOne({ user: user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }
    cart.items[itemIndex].quantity = qty;

    await cart.save();

    return res.status(200).json({
      message: "Item updated",
      cart,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function deleteCartItem(req, res) {
  try {
    const { productId } = req.params;
    const user = req.user;
    const cart = await cartModel.findOne({ user: user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId,
    );
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found" });
    }
    cart.items.splice(itemIndex, 1);
    await cart.save();
    return res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function clearCart(req, res) {
  try {
    const user = req.user;
    const cart = await cartModel.findOne({ user: user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    cart.items = [];
    await cart.save();
    return res.status(200).json({ message: "Cart cleared", cart });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  getUserCart,
  addItemToCart,
  updateCartItem,
  deleteCartItem,
  clearCart,
};
