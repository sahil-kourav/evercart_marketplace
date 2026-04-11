// const { subscribeToQueue } = require('./broker');
// const userModel = require('../models/user.model');
// const productModel = require('../models/product.model');
// const orderModel = require('../models/order.model');
// const paymentModel = require('../models/payment.model');

// module.exports = async function () {

//    subscribeToQueue("AUTH_SELLER_DASHBOARD.USER_REGISTERED", async (user) => {
//       await userModel.create(user);
//    })

//    subscribeToQueue("PRODUCT_SELLER_DASHBOARD.PRODUCT_CREATED", async (product) => {
//       await productModel.create(product);
//    })

//    subscribeToQueue("ORDER_SELLER_DASHBOARD_ORDER_CREATED", async (order) => {
//       await orderModel.create(order);
//    })

//    subscribeToQueue("PAYMENT_SELLER_DASHBOARD.PAYMENT_CREATED", async (payment) => {
//       await paymentModel.create(payment)
//    })

//    subscribeToQueue("PAYMENT_SELLER_DASHBOARD.PAYMENT_UPDATE", async (payment) => {
//       await paymentModel.findOneAndUpdate({ orderId: payment.orderId }, { ...payment })
//    })

//    subscribeToQueue("PAYMENT_SELLER_DASHBOARD.PAYMENT_UPDATE", async (payment) => { 
//       await orderModel.findOneAndUpdate({ _id: payment.orderId }, { paymentStatus: payment.status })
//    })

//    subscribeToQueue("ORDER_SELLER_DASHBOARD_ORDER_UPDATED", async (order) => {
//       await orderModel.findOneAndUpdate({ _id: order._id }, { ...order })
//    })

// }












const { subscribeToQueue } = require('./broker');
const userModel = require('../models/user.model');
const productModel = require('../models/product.model');
const orderModel = require('../models/order.model');
const paymentModel = require('../models/payment.model');

module.exports = async function () {

   subscribeToQueue("AUTH_SELLER_DASHBOARD.USER_REGISTERED", async (user) => {
      await userModel.create(user);
   });

   subscribeToQueue("PRODUCT_SELLER_DASHBOARD.PRODUCT_CREATED", async (product) => {
      await productModel.create(product);
   });

   subscribeToQueue("ORDER_SELLER_DASHBOARD_ORDER_CREATED", async (order) => {
      await orderModel.create(order);
   });

   subscribeToQueue("PAYMENT_SELLER_DASHBOARD.PAYMENT_CREATED", async (payment) => {
      await paymentModel.create(payment);
   });

   // ✅ FIXED (merged + safe update)
   subscribeToQueue("PAYMENT_SELLER_DASHBOARD.PAYMENT_UPDATE", async (payment) => {
      const { _id, ...updateData } = payment;

      // ✅ correct field name (order)
      await paymentModel.findOneAndUpdate(
         { order: payment.order },
         updateData
      );

      await orderModel.findOneAndUpdate(
         { _id: payment.order },
         { paymentStatus: payment.status }
      );
   });

   subscribeToQueue("ORDER_SELLER_DASHBOARD_ORDER_UPDATED", async (order) => {
      const { _id, ...updateData } = order;

      await orderModel.findOneAndUpdate(
         { _id: order._id },
         updateData
      );
   });

};