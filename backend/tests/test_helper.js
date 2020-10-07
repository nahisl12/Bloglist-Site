const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'ello',
    author: 'nahidul',
    url: 'asfdsjioejroirwe@asdiofj203i.com',
    likes: 50,
  },
  {
    title: 'azello',
    author: 'waaaaaaaaario',
    url: 'assdfvroirwe@asdiofj203i.com',
    likes: 1,
  }
]

const nonExistingId = async () => {
  const blog = new Blog({  title: 'testremovethis', author: 'test', url: 'testurl.com', likes: 3, })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}