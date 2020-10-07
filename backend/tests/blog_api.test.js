const mongoose = require('mongoose');
const helper = require('./test_helper');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

  // beforeEach(async () => {
  //   await Note.deleteMany({})
  
  //   for (let note of helper.initialNotes) {
  //     let noteObject = new Note(note)
  //     await noteObject.save()
  //   }
  // })
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('check that the blog posts have a unique id prop', async () => {
  const blogs = await helper.blogsInDb();

  // const response = await api.get('/api/blogs');
  // const content = response.body;

  // content.forEach(blog => expect(blog.id).toBeDefined());

  blogs.forEach(blog => expect(blog.id).toBeDefined());
});

test('new blog post is created', async () => {
  const newBlog = {
    title: 'testBlogPost',
    author: 'testBlogAuthor',
    url: 'testBlogURL',
    likes: 1
  }

  await api.post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAfterAdding = await helper.blogsInDb();
  expect(blogsAfterAdding).toHaveLength(helper.initialBlogs.length + 1);

  const content = blogsAfterAdding.map(blog => blog.title);
  expect(content).toContain('testBlogPost');

});

test('if likes value is empty set to 0 by default', async () => {
  const newBlog = {
    title: 'testBlogPos1t',
    author: 'testBlogAut4hor',
    url: 'testBlogU6RL'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAfterAdding = await helper.blogsInDb();
  const likes = blogsAfterAdding.map(blog => blog.likes);
  expect(likes).not.toContain(undefined);
});

test('if title and url are missing return 400', async () => {
  const newBlog = {
    author: 'testBlogAut4sadfhor'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAfterAdding = await helper.blogsInDb();
  const author = blogsAfterAdding.map(blog => blog.author);
  expect(author).not.toContain(newBlog.author);
});

afterAll(() => {
  mongoose.connection.close();
});