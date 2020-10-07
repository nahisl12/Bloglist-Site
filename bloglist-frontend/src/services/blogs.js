import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Creates a new token which is necessary to create a new blog
const create = async (blogObj) => {
  const config = {
    headers: { Authorization: token }
  }
  const object = blogObj;
  // Post request to url
  const response = await axios.post(baseUrl, object, config);
  return response.data;
}

const updateBlog = async (blogObj, id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogObj, config);
  return response.data;
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data
}

export default { getAll, create, setToken, updateBlog, deleteBlog }