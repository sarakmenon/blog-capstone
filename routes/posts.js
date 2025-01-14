import express from 'express';
const router = express.Router();

// Sample in-memory store for posts
let posts = [];

// Home page to view all posts
router.get('/', (req, res) => {
  res.render('index', { posts });
});

// Create post page
router.get('/create', (req, res) => {
  res.render('create');
});

// Handle post creation
router.post('/create', (req, res) => {
  const { title, content } = req.body;
  const newPost = { title, content, id: posts.length + 1 };
  posts.push(newPost);
  res.redirect('/');
});

// Edit post page
router.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    res.render('edit', { post });
  } else {
    res.redirect('/');
  }
});

// Handle post update
router.post('/edit/:id', (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (post) {
    post.title = title;
    post.content = content;
  }
  res.redirect('/');
});

// Handle post deletion
router.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.redirect('/');
});

export default router;
