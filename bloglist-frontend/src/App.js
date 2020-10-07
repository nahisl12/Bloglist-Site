import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import blogService from './services/blogs';
import { initializeBlogs } from './reducers/blogReducer';
import { useSelector, useDispatch } from 'react-redux';

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const blogs = useSelector(({ blog }) => {
    return blog;
  });

  console.log(blogs);

  return (
    <div>      
      <Login 
        user={user}
        setUser={setUser}
        username={username} 
        setUsername={setUsername} 
        password={password} 
        setPassword={setPassword} 
        blogs={blogs} 
        message={errorMessage}
        setErrorMessage={setErrorMessage}
      />

    </div>
  )
}

export default App