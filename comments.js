// Create a web server
// 1. GET /comments - return all comments
// 2. GET /comments/:id - return comment with given id
// 3. POST /comments - create a new comment
// 4. PUT /comments/:id - update comment with given id
// 5. DELETE /comments/:id - delete comment with given id

const express = require('express');
const Joi = require('joi');
const app = express();

app.use(express.json());

const comments = [
  {id: 1, comment: 'comment 1'},
  {id: 2, comment: 'comment 2'},
  {id: 3, comment: 'comment 3'},
  {id: 4, comment: 'comment 4'},
  {id: 5, comment: 'comment 5'},
];

app.get('/comments', (req, res) => {
  res.send(comments);
});

app.get('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) {
    return res.status(404).send('Comment not found');
  }
  res.send(comment);
});

app.post('/comments', (req, res) => {
  const {error} = validateComment(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const comment = {
    id: comments.length + 1,
    comment: req.body.comment,
  };
  comments.push(comment);
  res.send(comment);
});

app.put('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) {
    return res.status(404).send('Comment not found');
  }

  const {error} = validateComment(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  comment.comment = req.body.comment;
  res.send(comment);
});

app.delete('/comments/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) {
    return res.status(404).send('Comment not found');
  }

  const index = comments.indexOf(comment);
  comments.splice(index, 1);

  res.send(comment