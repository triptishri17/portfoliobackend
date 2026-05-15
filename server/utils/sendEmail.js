import nodemailer from 'nodemailer';

console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP ERROR:', error);
  } else {
    console.log('✅ SMTP READY');
  }
});

export const sendEmail = async ({ subject, html, replyTo }) => {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.CONTACT_RECEIVER,
    subject,
    html,
    replyTo,
  });
};

export default transporter;
