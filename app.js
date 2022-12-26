const express = require('express');
const mongoose = require('mongoose');

const path = require('path');
const ejs = require('ejs');

const Post = require('./modals/Post');

const app = express();

// DB bağlantı:
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/cleanBlog-test-db');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  const posts = await Post.find({})
  res.render('index', {
    posts: posts
  });
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/post', (req, res) => {
  res.render('post');
});

app.post('/message', async (req, res,) => {
  await Post.create(req.body);
  res.redirect('/add_post')
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
