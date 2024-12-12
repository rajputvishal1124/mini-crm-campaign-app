const amqp = require("amqplib");

let channel;

async function connectMessageBroker() {
  try {
    const connection = await amqp.connect("amqp://localhost");
    channel = await connection.createChannel();
    await channel.assertQueue("data_ingestion");
    await channel.assertQueue("delivery_updates");
    console.log("Connected to RabbitMQ");
  } catch (error) {
    console.error("Error connecting to RabbitMQ:", error);
  }
}

function publishMessage(queue, message) {
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)));
}

module.exports = { connectMessageBroker, publishMessage };
