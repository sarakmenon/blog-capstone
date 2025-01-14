const express = require('express');
const app = express();
const path = require('path');

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to serve static files (CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data

// Data storage (no database in this version)
let posts = [];

// Route to render the home page with all posts
app.get('/', (req, res) => {
    res.render('index', { posts: posts });
});

// Route to render the create post form
app.get('/create', (req, res) => {
  // Get the current date
  const date_time = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date_time.toLocaleDateString(undefined, options);

  // Log the date of creation to the console for debugging
  console.log("Date of Creation: ", formattedDate);

  // Render the 'create' page and pass the date of creation
  res.render('create', { date_of_creation: formattedDate });
});

// Handle post creation
app.post('/create', (req, res) => {
  const date_time = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const formattedDate = date_time.toLocaleDateString(undefined, options);

  const newPost = {
      title: req.body.title,
      content: req.body.content,
      id: Date.now(),
      created_at: formattedDate // Store the creation date
  };

  posts.push(newPost);
  res.redirect('/');
});

// Route to render the edit post form
app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    res.render('edit', { post: post });
});

// Handle post edit
app.post('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id == req.params.id);
    post.title = req.body.title;
    post.content = req.body.content;
    res.redirect('/');
});

// Handle post deletion
app.post('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id != req.params.id);
    res.redirect('/');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
