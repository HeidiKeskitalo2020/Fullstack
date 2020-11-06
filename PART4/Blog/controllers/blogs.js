const blogsRouter = require('express').Router()
//const { populate } = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', {username: 1, name: 1 })
           
      response.json(blogs.map(blog => blog.toJSON()))
        })

blogsRouter.get('/:id', (request, response, next) => {
    Blog.findById(request.params.id)
      .then(blog => {
        if (blog) {
          response.json(blog)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    //const token = getTokenFrom(request)
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
      })
    try {
    const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog)
      } catch(exception) {
        response.status(400).end()
      }
   
    })

blogsRouter.put('/:id', async(request, response) => {
  const body = request.body

  const blog = {
    likes: body.likes || 0,
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.status(200).json(updatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
   
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token is missing or it is invalid.' })
    }
    const userid = decodedToken.id

    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === userid.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(400).json({ error: 'Does not exist token or user.' })
    }
  })

module.exports = blogsRouter
