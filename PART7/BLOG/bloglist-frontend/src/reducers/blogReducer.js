import blogService from '../services/blogs'


const blogReducer = (state = [], action) => {

  switch (action.type) {
  case 'LIKE': {
    const id = action.data.id
    const blogToChange = state.find(a => a.id === id)
    const changeBlog = { ... blogToChange, likes: blogToChange.likes + 1 }
    return state.map(blog => blog.id !== id ? blog : changeBlog)
  }
  case 'REMOVE': {
    const id = action.data
    return state.filter(blogs => blogs.id !== id)
  }
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

export const like = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.update(blog)
    dispatch({
      type: 'LIKE',
      data: newBlog
    })
  }
}

export const remove = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

export default blogReducer
