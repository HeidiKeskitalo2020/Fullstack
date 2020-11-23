import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import UsersService from './services/users'
import { userAdd, userNullify } from './reducers/userReducer'

//import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducers'
import { initializeBlogs, addBlogs, like, remove } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch } from 'react-router-dom'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  //const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

  const blogFormRef = React.createRef()
  console.log('users', users)
  useEffect(() => {
    dispatch(initializeBlogs())
    UsersService.getAll().then(users =>
      dispatch(initializeUsers(users)))
  }, [dispatch])


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

  const fit = useRouteMatch('/users/:id')
  const fitUser = fit
    ? users.find(user => user.id === (fit.params.id))
    : null

  const firB = useRouteMatch('/blogs/:id')
  const fitBlog = firB
    ? blogs.find(user => user.id === (firB.params.id))
    : null

  if ( !user ) {
    console.log('usersname', username)
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
  //console.log('username', username)
  const User = () => {
    if(!fitUser) {
      return null
    }

    if (user !== null) {
      const name = fitUser.name

      return (
        <>
          <h2>{name}</h2>
          <b>added blogs</b>
          <ul>
            {fitUser.blogs.map(blog =>
              <li key={blog.id}>{blog.title}</li>
            )}
          </ul>
        </>
      )}
    return
  }
  const BlogPage =() => {
    if(!fitBlog) {
      return null
    }

    return (
      <>
        <h2>{fitBlog.title} {fitBlog.author}</h2>
        <a href={fitBlog.url}>{fitBlog.url}</a>
        <div>{fitBlog.likes} likes <button onClick={() => handleLike(fitBlog.id)}>like</button></div>
        <div>added by {fitBlog.author}</div>
      </>
    )

  }

  return (
    <div>
      <Router>
        <h2>blogs</h2>

        <Notification />
        <p>
          {user.name} logged in
        </p>
        <p>
          <button onClick={handleLogout}>logout</button>
        </p>

        <Switch>
          <Route path="/users/:id">
            <User user={fitUser}/>
          </Route>
          <Route path="/users">
            <h3>Users</h3>
            <table>
              <thead>
                <tr><th></th><th>blogs created</th></tr>
              </thead>

              <tbody>
                {users.map(user =>
                  <tr key={user.id}>
                    <td><Link to={`/users/${user.id}`}> {user.name}</Link></td>
                    <td>{user.blogs.length}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Route>
          <Route path="/blogs/:id">
            <BlogPage/>
          </Route>
          <Route path="/">
            <Togglable buttonLabel='create new blog' ref={blogFormRef}>
              <NewBlog createBlog={createBlog} />
            </Togglable>
            {blogs.sort(byLikes).map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={handleLike}
                handleRemove={handleRemove}
                own={user.username===blog.user} />
            )}
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App