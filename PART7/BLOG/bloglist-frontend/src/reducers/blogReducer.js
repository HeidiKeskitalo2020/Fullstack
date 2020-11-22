import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {

  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG': {
    return [...state, action.data]
  }
  default:
    return state
  }
}
export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export const addBlogs = (content) => {
  return async dispatch => {
    const data = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data
    })
  }
}

export default blogReducer
