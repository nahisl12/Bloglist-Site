import blogService from '../services/blogs';

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'INITIALIZE':
      return action.data;
    case 'CREATE_NEW':
      return [...state, action.data];
    default:
      return state;
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INITIALIZE',
      data: blogs
    });
  }
}

export const createBlog = (content) => {
  return {
    type: 'CREATE_NEW',
    content,
  }
}

export default blogReducer;