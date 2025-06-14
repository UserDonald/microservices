import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.get('/posts/:id', (req, res) => {
  res.send(posts[req.params.id]);
});

app.post('/events', (req, res) => {
  const { type, data } = req.body;

  if (type === 'PostCreated') {
    const { id, content, author, username, createdAt } = data;
    const newPost = { id, content, author, username, createdAt, comments: [] };
    posts[id] = newPost;
  }

  if (type === 'CommentCreated') {
    const { id, content, postId, author, username, createdAt } = data;
    const updatedPost = posts[postId];
    const newComment = { id, content, author, username, createdAt };
    updatedPost.comments.push(newComment);
    posts[postId] = updatedPost;
  }

  res.send({});
});

app.listen(4002, () => {
  console.log('Listening on 4002');
});
