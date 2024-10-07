import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: "gcve dkdn dwsi oxzx"
  }
});
  console.log( process.env.PASSWORD);

export default transporter;
