const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const path = require('path');
const ejs = require('ejs');

const Post = require('./models/Post');
const PostController = require('./controllers/postController')
const PageController = require('./controllers/pageController')

const app = express();

// DB bağlantı:
mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://arslan_ng:narniag7A.@cluster0.cm2ofum.mongodb.net/?retryWrites=true&w=majority');

// Middleware
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Router
app.get('/', PostController.getAllPosts);
app.get('/posts/:id', PostController.getPost);
app.post('/message', PostController.createPost);
app.put('/posts/:id', PostController.updatePost);
app.delete('/posts/:id', PostController.deletPost);

app.get('/add_post', PageController.getAdd);
app.get('/about', PageController.getAbout);
app.get('/post', PageController.getPost);
app.get('/posts/edit/:id', PageController.getEdit);

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
