import axios from 'axios';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
  if (type === 'PostCreated') {
    const { id, content, author, username, createdAt } = data;
    const newPost = { id, content, author, username, createdAt, comments: [] };
    posts[id] = newPost;
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, author, username, createdAt, status } = data;
    const updatedPost = posts[postId];
    const newComment = { id, content, author, username, createdAt, status };
    updatedPost.comments.push(newComment);
  }

  if (type === 'CommentUpdated') {
    const { id, postId, status, content } = data;
    const updatedPost = posts[postId];
    const updatedComment = updatedPost.comments.find(
      (comment) => comment.id === id
    );
    updatedComment.status = status;
    updatedComment.content = content;
  }
};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.get('/posts/:id', (req, res) => {
  res.send(posts[req.params.id]);
});

app.post('/events', (req, res) => {
  console.log('Received event: ', req.body.type);
  const { type, data } = req.body;

  handleEvent(type, data);

  res.send({});
});

app.listen(4002, async () => {
  console.log('Listening on 4002');

  try {
    const response = await axios.get('http://localhost:4005/events');
    response.data.forEach((event) => {
      console.log('Processing event: ', event.type);
      handleEvent(event.type, event.data);
    });
  } catch (error) {
    console.error('Error fetching events:', error);
  }
});
