import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    }
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedNote => {
        setBlogs(blogs.concat(returnedNote))
        setMessage(`A new blog "${blogTitle}" by ${blogAuthor} created.`)
        setBlogTitle('')
        setBlogAuthor('')
        setBlogUrl('')
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
  }

  const handleLogin = async(event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('Successfully logged in')
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    } catch (exception) {
      
      setErrorMessage('Wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)  
    }
  }
  if(user === null) {
    return (
      <div>
       
        <Notification message={message} errorMessage={errorMessage} />
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
            />
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} errorMessage={errorMessage} />
      <p>{user.name} logged in
      <button onClick={() => {
        window.localStorage.removeItem('loggedBlogUser')
        setUser(null)
      }}>logout</button></p>
       <div>

      <Toggleable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          onSubmit={addBlog}
          titleValue={blogTitle}
          authorValue={blogAuthor}
          urlValue={blogUrl}
          handleTitleChange={({ target }) => setBlogTitle(target.value)}
          handleAuthorChange={({ target }) => setBlogAuthor(target.value)}
          handleUrlChange={({ target }) => setBlogUrl(target.value)}
          />
      </Toggleable>

      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App