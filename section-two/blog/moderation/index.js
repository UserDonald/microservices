import axios from 'axios';
import bodyParser from 'body-parser';
import express from 'express';

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  console.log('Received event: ', req.body.type);
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    try {
      await axios.post('http://localhost:4005/events', {
        type: 'CommentModerated',
        data: { ...data, status },
      });
    } catch (error) {
      console.error('Failed to publish event to event bus:', error.message);
    }
  }

  res.send({});
});

app.listen(4003, () => {
  console.log('Listening on 4003');
});
