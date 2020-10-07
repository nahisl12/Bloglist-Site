import React, { useState } from 'react';
import blogService from '../services/blogs';
import { useDispatch } from 'react-redux';
import { createBlog, initializeBlogs } from '../reducers/blogReducer';


const CreateBlog = ({ blogs, setBlogs, message, setErrorMessage }) => {
  const dispatch = useDispatch();
 
  const createNewBlog = async (event) => {
    event.preventDefault();

    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    const response = await blogService.create(blog);
    dispatch(createBlog(response));
    dispatch(initializeBlogs());
  }

  return (
    <form onSubmit={createNewBlog}>
      <div>
        title:  
          <input type="text" name="title"></input>
      </div>
      <div>
        author: 
          <input type="text" name="author"></input>
      </div>
      <div>
        url:  
          <input type="text" name="url"></input>
      </div>
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateBlog
