import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import { userAdd, userNullify } from './reducers/userReducer'

//import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducers'
import { initializeBlogs, addBlogs, like, remove } from './reducers/blogReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  //const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const user = storage.loadUser()
    dispatch(userAdd(user))
  }, [dispatch])

  const notifyWith = (message, type='success') => {
    const mes = { message, type }
    dispatch(setNotification(mes, 5))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')
      dispatch(userAdd(user))
      notifyWith(`${user.name} welcome back!`)
      storage.saveUser(user)
    } catch(exception) {
      notifyWith('wrong username/password', 'error')
    }
  }

  const createBlog = async (blog) => {
    try {
      //const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()
      dispatch(addBlogs(blog))
      notifyWith(`a new blog '${blog.title}' by ${blog.author} added!`)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const likeTheBlogs = blogs.find(b => b.id === id)
    const likedBlog = { ...likeTheBlogs, likes: likeTheBlogs.likes + 1, user: likeTheBlogs.user.id }
    dispatch(like(likedBlog))
    //await blogService.update(likedBlog)
    //setBlogs(blogs.map(b => b.id === id ?  { ...blogToLike, likes: blogToLike.likes + 1 } : b))

  }
  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      dispatch(remove(blogToRemove.id))
      //await blogService.remove(id)
      //setBlogs(blogs.filter(b => b.id !== id))
      // }
      notifyWith(`${blogToRemove.author} deleted blog ${blogToRemove.title}`, 'error')
    }
  }

  const handleLogout = () => {
    dispatch(userNullify())
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <Notification />

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes
  return (
    <div>
      <h2>blogs</h2>

      <Notification />

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user}
        />
      )}
    </div>
  )
}

export default App