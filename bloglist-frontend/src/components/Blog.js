import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import blogService from '../services/blogs';

const Blog = ({ blog, setBlogs, blogs, title }) => {
  const [visible, setVisible] = useState(false);

  const setVisibility = () => {
    setVisible(!visible);
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 10
  }

  return (
    visible === false ?
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={setVisibility}>view</button>
      </div> :
      <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={setVisibility}>hide</button>
      <div>url: {blog.url}</div>
      {/* <div>likes: {blog.likes} <button onClick={addLike}>like</button></div> */}
      {/* <div><button onClick={removeBlog}>remove</button></div> */}
      </div>
  )
}

export default Blog;
