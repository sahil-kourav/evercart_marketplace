const { subscribeToQueue } = require('./broker');
const { sendEmail } = require('../email');

module.exports = function () {
  subscribeToQueue("AUTH_NOTIFICATION.USER_REGISTERED", async (data) => {

    const html = `
<!DOCTYPE html>
<html>
  <body>
    <div>
      <h2 style="margin-top:0; color:#111827;">
        Welcome to EverCart 🛍️
      </h2>

      <p style="color:#374151; font-size:14px;">
        Hi ${data.fullName.firstName} ${data.fullName.lastName},
      </p>

      <p style="color:#4b5563; font-size:14px; line-height:1.6;">
        Your account has been successfully created and everything is working perfectly 🎉
      </p>

      <p style="color:#4b5563; font-size:14px; line-height:1.6;">
        You can now explore products, place orders, and enjoy a smooth shopping experience with EverCart.
      </p>

      <div style="margin:25px 0;">
        <a
          href="https://yourfrontendurl.com"
          style="
            display:inline-block;
            padding:10px 18px;
            background:#111827;
            color:#ffffff;
            text-decoration:none;
            border-radius:6px;
            font-size:13px;
          "
        >
          Start Exploring →
        </a>
      </div>

      <p style="color:#4b5563; font-size:13px; line-height:1.6;">
        If you have any questions or need assistance, feel free to reply to this email.
        We're here to help!
      </p>

      <p style="margin-top:10px; font-size:13px; color:#374151;">
        Best regards,<br />
        The EverCart Team
      </p>
    </div>
  </body>
</html>
`;

    const subject = `You're in, ${data.fullName.firstName}! Welcome to EverCart.`;

    const text = `
Your EverCart account is ready!

Start exploring products and enjoy a seamless shopping experience.

— Team EverCart
`;

    await sendEmail(data.email, subject, text, html);
  });

  subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_INITIATED", async (data) => {
    const subject = `Payment Initiated for Order #${data.orderId}`;

    const text = `
Hi Dear,
We have received your payment initiation for order #${data.orderId} of amount ${data.currency} ${data.amount}.
We are processing your payment and will notify you once it's completed.
— Team EverCart
`;

    const html = `
<!DOCTYPE html>
<html>
  <body>
    <div>
      <h2 style="margin-top:0; color:#111827;">
        Payment Initiated 💳
      </h2>
      <p style="color:#374151; font-size:14px;">
        Hi Dear,
      </p>
      <p style="color:#4b5563; font-size:14px; line-height:1.6;">
        We have received your payment initiation for order <strong>#${data.orderId}</strong> of amount <strong>${data.currency} ${data.amount}</strong>.
      </p>
      <p style="color:#4b5563; font-size:14px; line-height:1.6;">
        We are processing your payment and will notify you once it's completed.
      </p>
      <p style="margin-top:30px; font-size:13px; color:#374151;">
        Best regards,<br />
        The EverCart Team
      </p>

    </div>
  </body>
</html>
`;

    await sendEmail(data.email, subject, text, html);
  });

  subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_COMPLETED", async (data) => {
    const subject = `Payment Successful for Order #${data.orderId}`;

    const text = `
Hi Dear,

We received your payment of ${data.currency} ${data.amount} for order #${data.orderId} and it has been successfully processed. 
Thank you for shopping with us!

— Team EverCart
`;

    const html = `
<!DOCTYPE html>
<html>
  <body>    
      
    <div>
      <h2 style="margin-top:0; color:#111827;">
        Payment Successful! 🎉
      </h2>
      <p style="color:#374151; font-size:14px;">
        Hi Dear,
      </p>
      <p style="color:#4b5563; font-size:14px; line-height:1.6;">
        Your payment for order <strong>#${data.orderId}</strong> has been successfully processed.
      </p>
      <p style="color:#4b5563; font-size:14px; line-height:1.6;">
        Thank you for shopping with us!
      </p>
      <p style="margin-top:30px; font-size:13px; color:#374151;">
        Best regards,<br />
        The EverCart Team
      </p>
    </div>
  </body>
</html>
`;

    await sendEmail(data.email, subject, text, html);
  });

  subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_FAILED", async (data) => {
    const subject = `Payment Failed for Order #${data.orderId}`;

    const text = `Hi Dear,

Unfortunately, your payment for order #${data.orderId} could not be processed. 
Please try again or contact support if you need assistance.
— Team EverCart
`;

    const html = `
<!DOCTYPE html>
<html>
  <body>    
      
    <div>
      <h2 style="margin-top:0; color:#111827;">
        Payment Failed
      </h2>
      <p style="color:#374151; font-size:14px;">
        Hi Dear,
      </p>
      <p style="color:#4b5563; font-size:14px; line-height:1.6;">
        Unfortunately, your payment for order <strong>#${data.orderId}</strong> could not be processed.
      </p>
      <p style="color:#4b5563; font-size:14px; line-height:1.6;">
        Please try again or contact support if you need assistance.
      </p>
      <p style="margin-top:30px; font-size:13px; color:#374151;">
        Best regards,<br />
        The EverCart Team
      </p>
    </div>
  </body>
</html>
`;

    await sendEmail(data.email, subject, text, html);
  });

  subscribeToQueue("PRODUCT_NOTIFICATION.PRODUCT_CREATED", async (data) => {
    const subject = `New Product Just Dropped on EverCart! 🛍️`;

    const text = `
Hi there,

A new product has just been listed on EverCart!

Product: ${data.title}
Category: ${data.category}

Be the first to explore it and grab the best deals.

Visit EverCart now.

Best regards,  
Team EverCart
`;

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>New Product Listed</title>
</head>
<body style="margin:0; padding:0; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" ">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0">

        <tr>
            <td style="font-size:15px; padding-bottom:10px;">
              Hi there,
            </td>
          </tr>

          <tr>
            <td style="font-size:14px; padding-bottom:8px;">
              We have some exciting news for you!
            </td>
          </tr>

          <tr>
            <td style="font-size:14px; line-height:1.6;">
              We’re excited to let you know that a new product has just been added to EverCart.
            </td>
          </tr>

          <tr>
            <td style="font-size:14px; line-height:1.6; padding-top:5px;">
              <strong>Product:</strong> ${data.title} <br />
              <strong>Category:</strong> ${data.category}
            </td>
          </tr>

          <tr>
            <td style="font-size:14px; line-height:1.6; padding-top:5px;">
              Don’t miss out — explore it now and grab the best deals before it’s gone!
            </td>
          </tr>

          <tr>
            <td style="padding:18px 0;">
              <a href="${data.productUrl || "#"}"
                 style="background-color:#111827; color:#ffffff; padding:12px 25px; 
                 text-decoration:none; border-radius:6px; font-size:14px; display:inline-block;">
                View Product →
              </a>
            </td>
          </tr>

          <tr>
            <td style="font-size:12px; color:#9ca3af;">
              You are receiving this email because you subscribed to product notifications on EverCart.
            </td>
          </tr>

          <tr>
            <td style="font-size:13px; color:#374151; padding-top:14px;">
              Best regards,<br />
              <strong>Team EverCart</strong>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

    await sendEmail(data.email, subject, text, html);
  });

  subscribeToQueue("PAYMENT_NOTIFICATION.COD_ORDER_PLACED", async (data) => {
    const subject = `Your Order has Been Placed! 🛍️`;

    const text = `Hi Dear,

Your order #${data.orderId} has been placed successfully with Cash on Delivery (COD) as the payment method. 
We will process your order and keep you updated on the status.  
Thank you for shopping with us!
— Team EverCart
`;

    const html = `<!DOCTYPE html>
<html>
  <body>
    <div>
      <h2 style="margin-top:0; color:#111827;">
        Order Placed Successfully! 🛍️
      </h2>
      <p>
        Hi Dear,
      </p>
      <p>
        Your order #${data.orderId} has been placed successfully with Cash on Delivery (COD) as the payment method.
      </p>
      <p>
        We will process your order and keep you updated on the status.
      </p>
      <p>
        Thank you for shopping with us!
      </p>
      <p>
        — Team EverCart
      </p>
    </div>
  </body>
</html>
`;

    await sendEmail(data.email, subject, text, html);
  });

  subscribeToQueue("ORDER_NOTIFICATION.ORDER_DELIVERED", async (data) => {
    const subject = `Your Order has been Delivered! 🎉`;

    const text = `Hi Dear,

We are thrilled to inform you that your order #${data.orderId} has been delivered successfully! We hope you enjoy your purchase. If you have any questions or need assistance, feel free to reach out to our support team.

Thank you for shopping with us!
— Team EverCart
`;

    const html = `<!DOCTYPE html>
<html>
  <body>
    <div>
      <h2 style="margin-top:0; color:#111827;"> 
        Order Delivered! 🎉
      </h2>
      <p>
        Hi Dear,
      </p>
      <p>
        We are thrilled to inform you that your order #${data.orderId} has been delivered successfully! We hope you enjoy your purchase. If you have any questions or need assistance, feel free to reach out to our support team.
      </p>
      <p>
        Thank you for shopping with us!
      </p>
      <p>
        — Team EverCart
      </p>
    </div>
  </body>
</html>
`;

    await sendEmail(data.email, subject, text, html);

  });

};