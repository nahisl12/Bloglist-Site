import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Blog from './Blog';
import CreateBlog from './CreateBlog';
import Notification from './Notification';
import Togglable from './Togglable';
import blogService from '../services/blogs';
import loginService from '../services/login';

const Login = ({ user, setUser, username, setUsername, password, setPassword, blogs, setBlogs, message, setErrorMessage }) => {

  const dispatch = useDispatch();

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedInUser');
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if(!blogs) {
    return null;
  }


  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setErrorMessage('Wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  const handleLogout = () => {
    setUser(null);
    setUsername('');
    setPassword('');
    window.localStorage.removeItem('loggedInUser');
  };

  const loginForm = () => (
    <>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>  
    </>    
  )

  const showBlogs = () => (
    <>
    <h2>Blogs</h2>
    <p>
      {user.name} logged-in
      <button onClick={handleLogout}>Logout</button>
    </p>
    <div>
      <Togglable buttonLabel="new note">
        <CreateBlog blogs={blogs} setBlogs={setBlogs} message={message} setErrorMessage={setErrorMessage} />
      </Togglable>
    </div>
    {blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blog => <Blog blog={blog} setBlogs={setBlogs} blogs={blogs} />)}
    </>
  )

  return (
    <>
    <Notification message={message}/>
    {user === null ?
      loginForm() :
      showBlogs()
    }
    </>
  )
}

export default Login
