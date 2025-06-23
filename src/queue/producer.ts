import amqp from 'amqplib';

export const sendWelcomeEmailJob = async (email: string) => {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();

  const queue = 'welcome_email';
  await channel.assertQueue(queue, { durable: true });

  const message = JSON.stringify({ email });
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });

  await channel.close();
  await connection.close();
};
