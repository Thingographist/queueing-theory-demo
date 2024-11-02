const { Kafka } = require('kafkajs');
const app = require('../app');

let clients = [];

const kafka = new Kafka({ clientId: 'my-app', brokers: ["localhost:29092"] });
const consumer = kafka.consumer({ groupId: 'alerts-consumer' });
const run = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'test', fromBeginning: true });
  const parseAlert = (alertString) => alertString
    .split(', ')
    .filter(kv => kv.trim())
    .reduce((res, kv) => {
      const [k, v] = kv.split('=');
      res[k] = v;
      return res;
    }, {});
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      try {
        const { details } = JSON.parse(message.value.toString());
        details.split("\n").filter(line => line.trim()).forEach(line => { 
          console.log(line);
          const alert = parseAlert(line.slice(0,-1));
          console.log(alert);
          if (!alert.sessionId) return;
          if (client = clients.find(({ req }) => req.sessionID == alert.sessionId)?.res) {
            const sendData = `data: ${JSON.stringify(alert)}\n\n`;
            client.write(sendData);
          }
        });
      } catch (e) {
        console.error(e);
      }
    },
  });
};

// Запуск consumer
run().catch(console.error);

// Обработчик событий
app.get('/notifications', async (req, res) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  };
  res.writeHead(200, headers);
  clients.push({req,res});
  console.log(`Client connected`);
  req.on('close', () => {
      console.log(`Client disconnected`);
      clients = clients.filter(client => client.res !== res);
  });
});
