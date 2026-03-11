const orderModel = require("../models/order.model");
const axios = require("axios");
const { publishToQueue } = require("../broker/broker");

async function createOrder(req, res) {
  try {
    const user = req.user;

    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!req.body.shippingAddress) {
      return res.status(400).json({ message: "Shipping address is required" });
    }

    // fetch order details from cart service
    const cartResponse = await axios.get("http://localhost:8082/api/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // fetch price details from product service

    const products = await Promise.all(
      cartResponse.data.cart.items.map(async (item) => {
        return (
          await axios.get(
            `http://localhost:8081/api/products/${item.productId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          )
        ).data.product;
      }),
    );

    // calculate total price

    let totalPrice = 0;

    const orderItems = cartResponse.data.cart.items.map((item, index) => {
      const product = products.find((p) => p._id === item.productId);

      // if stock is insufficient then stop order creation
      if (product.inStock < item.quantity) {
        throw new Error(`Insufficient stock for product ${product.title}`);
      }

      const itemTotal = product.price.amount * item.quantity;
      totalPrice += itemTotal;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: {
          amount: itemTotal,
          currency: product.price.currency,
        },
      };
    });

    // create order
    const newOrder = await orderModel.create({
      user: user.id,
      items: orderItems,
      status: "PENDING",
      totalPrice: {
        amount: totalPrice,
        currency: "INR",
      },
      shippingAddress: {
        street: req.body.shippingAddress.street,
        city: req.body.shippingAddress.city,
        state: req.body.shippingAddress.state,
        zip: req.body.shippingAddress.zip,
        country: req.body.shippingAddress.country,
        phone: req.body.shippingAddress.phone,
      },
    });

 await publishToQueue("ORDER_SELLER_DASHBOARD_ORDER_CREATED", newOrder) 

    return res
      .status(201)
      .json({ message: "Order created successfully", order: newOrder });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function getMyOrders(req, res) {
  const user = req.user;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const orders = await orderModel
      .find({ user: user.id })
      .skip(skip)
      .limit(limit)
      .exec();
    const totalOrders = await orderModel.countDocuments({ user: user.id });

    res.status(200).json({
      orders,
      meta: {
        total: totalOrders,
        page,
        limit,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
}


async function getOrderById(req, res) {
  const user = req.user;
  const orderId = req.params.id;
  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
      if (order.user.toString() !== user.id && user.role !== "seller") {
      return res.status(403).json({
        message: "Forbidden: You do not have access to this order",
      });
    }
    return res.status(200).json({ order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

async function cancelOrder(req, res) {
  const user = req.user;
  const orderId = req.params.id;
  try {
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.user.toString() !== user.id) {
      return res.status(403).json({
        message: "Forbidden: You do not have access to cancel this order",
      });
    }
    // order only calcel when status is PENDING
    if (order.status !== "PENDING" && order.status !== "CONFIRMED") {
      return res
        .status(400)
        .json({ message: "Cannot cancel order at this stage" });
    }
    order.status = "CANCELLED";
    await order.save();
    return res
      .status(200)
      .json({ message: "Order cancelled successfully", order });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

module.exports = {
  createOrder,
  getOrderById,
  getMyOrders,
  cancelOrder,
};
