import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import { randomBytes } from 'crypto';
import express from 'express';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  res.send(posts[id]);
});

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

  posts[id] = newPost;

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

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received event: ', req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log('Listening on 4000');
});
