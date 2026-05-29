const userModel = require("../models/user.model")
const productModel = require("../models/product.model")
const orderModel = require("../models/order.model")
const paymentModel = require("../models/payment.model")

async function getMetrics(req, res) {
    try {
        const seller = req.user;

        const products = await productModel.find({ seller: seller._id });
        const productIds = products.map(p => p._id);
        const productIdStrings = productIds.map(id => id.toString()); // ← fix #2

        const orders = await orderModel.find({
            'items.productId': { $in: productIds },
            status: { $in: ["PROCESSING", "SHIPPED", "DELIVERED"] }
        }).populate('user', 'name email');

        let sales = 0;
        let revenue = 0;
        const productSales = {};

        orders.forEach(order => {
            order.items.forEach(item => {
                if (productIdStrings.includes(item.productId?.toString())) { // ← fix #2
                    sales += item.quantity;
                    revenue += item.price.amount * item.quantity;
                    const key = item.productId.toString();
                    productSales[key] = (productSales[key] || 0) + item.quantity;
                }
            });
        });

        const topProducts = Object.entries(productSales)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([productId, qty]) => {
                const prod = products.find(p => p._id.toString() === productId);
                return prod ? { id: prod._id, title: prod.title, sold: qty } : null;
            })
            .filter(Boolean);

        const uniqueCustomers = [...new Set(orders.map(o => o.user?._id?.toString()).filter(Boolean))];

        return res.json({
            productsCount: products.length,      
            totalRevenue: revenue,           
            ordersCount: orders.length,            
            customersCount: uniqueCustomers.length,
            allOrders: orders,                     
            sales,
            topProducts,
        });
    } catch (error) {
        // console.error("Error fetching metrics:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


async function getOrders(req, res) {
    try {
        const seller = req.user;

        // Get all products for this seller
        const products = await productModel.find({ seller: seller._id });
        const productIds = products.map(p => p._id);

        // Get all orders containing seller's products
        const orders = await orderModel.find({
            'items.product': { $in: productIds }
        }).populate('user', 'name email').sort({ createdAt: -1 });

        // Filter order items to only include those from this seller
        const filteredOrders = orders.map(order => {
            const filteredItems = order.items.filter(item => productIds.includes(item.product));
            return {
                ...order.toObject(),
                items: filteredItems
            };
        }).filter(order => order.items.length > 0);
        return res.json(filteredOrders);
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function getProducts(req, res) {

    try {
        const seller = req.user;

        const products = await productModel.find({ seller: seller._id }).sort({ createdAt: -1 });

        return res.json(products);
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }

}

module.exports = {
    getMetrics,
    getOrders,
    getProducts
}