const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Blog = require('../models/blog');

// Retrieve data from db
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

// Make a post to db
blogsRouter.post('/', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if(!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);

  // const user = await User.findById(body.userId);  // Find the user by an id that is given when creating a new blog 

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  });

  if(blog.title === undefined && blog.url === undefined) {
    response.status(400).end();
    return;
  }

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);  // concats the id of the new note to the users blog array
  await user.save();

  response.json(savedBlog.toJSON());
});

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);  // gets the blog matching the id in the req
  const token = getTokenFrom(request);  // grabs the encrypted token
  const decodedToken = jwt.verify(token, process.env.SECRET); // unencrypts the token so we can use the id
  if(!token || !decodedToken.id) { // If theres no token or id sends response
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  // if the id in the blog item (to string) matches the id of the decoded token, delete the blog post
  if(blog.user.toString() === decodedToken.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    return response.status(401).json({ error: 'a blog can only be deleted by the user who created it' });
  }

  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if(!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await Blog.findById(request.params.id);  // gets the blog matching the id in the req

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  if(user.toString() === decodedToken.id.toString()) {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true});
    response.status(200).json(updatedBlog.toJSON());
  } else {
    return response.status(401).json({ error: 'a blog can only be updated by the user who created it' });
  }
});

module.exports = blogsRouter;