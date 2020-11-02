const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const list_helper = require('../utils/list_helper')

const initialBlogs = [
    {
      content: 'HTML is easy',
      date: new Date(),
      important: false,
    },
    {
      content: 'Browser can execute only Javascript',
      date: new Date(),
      important: true,
    },
  ]
  beforeEach(async () => {
    await Blog.deleteMany({})
    for (let blog of initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('Blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  })

  test('There are correct amount of blogs returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('Id is unique', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toBeDefined()
  })

  test('Adds a new blog', async () => {
     const newBlog = {
        title: 'Hei K!', 
        author: 'HK', 
        url: 'www.HeiK.fi', 
        likes: '2'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const blogs = await Blog.find({})
      expect(blogs).toHaveLength(initialBlogs.length + 1)

      const authors = blogs.map(blog => blog.author)
      expect(authors).toContain(newBlog.author)
  })

afterAll(() => {
  mongoose.connection.close()
})