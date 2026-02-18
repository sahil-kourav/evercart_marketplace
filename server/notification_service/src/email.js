require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Sahil Kourav" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};


sendEmail(
  'example@gmail.com',
  'Welcome to EverCart 🎉',
  'Welcome to EverCart! Your email configuration is working perfectly. We are excited to have you on board.',
  `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>Welcome to <b>EverCart</b> 🚀</h2>
      <p>Hi there,</p>
      <p>
        We're excited to let you know that your email configuration is working perfectly!
        This means your EverCart setup is successfully sending emails.
      </p>
      <p>
        Thank you for choosing <b>EverCart</b>. We're glad to have you with us.
      </p>
      <br/>
      <p>Best Regards,<br/><b>EverCart Team</b></p>
    </div>
  `
);


module.exports = { sendEmail, transporter };