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

      <p style="color:#6b7280; font-size:12px;">
        If you have any questions or need assistance, feel free to reply to this email.
        We're here to help!
      </p>

      <p style="margin-top:30px; font-size:13px; color:#374151;">
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



  subscribeToQueue("PAYMENT_NOTIFICATION.PAYMENT_COMPLETED", async (data) => {
    const subject = `Payment Successful for Order ${data.orderId}`;

    const text = `
Hi, ${data.fullName.firstName} ${data.fullName.lastName},

We received your payment of ${data.currency} ${data.amount} for order ${data.orderId} and it has been successfully processed. 
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
        Hi, ${data.fullName.firstName} ${data.fullName.lastName},
      </p>
      <p style="color:#4b5563; font-size:14px; line-height:1.6;">
        Your payment for order <strong>${data.orderId}</strong> has been successfully processed.
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
    const subject = `Payment Failed for Order ${data.orderId}`;

    const text = `Hi, ${data.fullName.firstName} ${data.fullName.lastName},

Unfortunately, your payment for order ${data.orderId} could not be processed. 
Please try again or contact support if you need assistance.
— Team EverCart
`;

    const html = `
<!DOCTYPE html>
<html>
  <body>    
      
    <div>
      <h2 style="margin-top:0; color:#111827;">
        Payment Failed ❌
      </h2>
      <p style="color:#374151; font-size:14px;">
        Hi, ${data.fullName.firstName} ${data.fullName.lastName},
      </p>
      <p style="color:#4b5563; font-size:14px; line-height:1.6;">
        Unfortunately, your payment for order <strong>${data.orderId}</strong> could not be processed.
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

}
