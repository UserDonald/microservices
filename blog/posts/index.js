import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import { randomBytes } from 'crypto';
import express from 'express';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post('/posts', async (req, res) => {
  const id = randomBytes(4).toString('hex');
  const { content, author, username } = req.body;

  const newPost = {
    id,
    content,
    author,
    username,
    createdAt: new Date().toISOString(),
  };

  try {
    await axios.post('http://localhost:4005/events', {
      type: 'PostCreated',
      data: {
        ...newPost,
      },
    });
  } catch (error) {
    console.error('Failed to publish event to event bus:', error.message);
  }

  res.status(201).send(newPost);
});

app.post('/events', (req, res) => {
  console.log('Received event: ', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
