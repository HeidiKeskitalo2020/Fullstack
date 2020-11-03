const blogsRouter = require('express').Router()
//const { response } = require('express')
//const { request } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
            response.json(blogs)
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

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
      })
    try {  
      const saveBlog = await blog.save()
        response.json(saveBlog)
    } catch(excpetion) {
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
  await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    })

module.exports = blogsRouter
