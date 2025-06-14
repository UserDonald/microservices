import bodyParser from 'body-parser';
import cors from 'cors';
import { randomBytes } from 'crypto';
import express from 'express';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const { content, author, username } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  const newComment = {
    id: commentId,
    content,
    author,
    username,
    createdAt: new Date().toISOString(),
  };
  
  comments.push(newComment);
  commentsByPostId[req.params.id] = comments;

  res.status(201).send(newComment);
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
