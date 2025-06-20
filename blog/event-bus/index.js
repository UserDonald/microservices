import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', async (req, res) => {
  console.log('Received event: ', req.body.type);
  const event = req.body;

  events.push(event);

  const services = [
    { url: 'http://posts-ci-srv:4000/events', name: 'posts service' },
    { url: 'http://comments-ci-srv:4001/events', name: 'comments service' },
    { url: 'http://query-ci-srv:4002/events', name: 'query service' },
    { url: 'http://moderation-ci-srv:4003/events', name: 'moderation service' },
  ];

  const promises = services.map(async (service) => {
    try {
      await axios.post(service.url, event);
    } catch (error) {
      console.error(`Failed to send event to ${service.name}`);
    }
  });

  await Promise.allSettled(promises);

  res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Version: latest');
  console.log('Listening on 4005');
});
