import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function startConsumer() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queue = 'welcome_email';

  await channel.assertQueue(queue, { durable: true });
  console.log(' Waiting for welcome emails...');

  channel.consume(queue, async (msg) => {
    if (msg) {
      const { email } = JSON.parse(msg.content.toString());
      console.log(`Sending welcome email to ${email}`);
      await sendEmail(email);
      channel.ack(msg);
    }
  });
}

async function sendEmail(email: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Your App" <your-email@gmail.com>',
    to: email,
    subject: 'Welcome!',
    text: 'Thank you for signing up to our app!',
  });

  console.log(` Email sent to ${email}`);
}

startConsumer().catch(console.error);
