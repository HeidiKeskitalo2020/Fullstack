const { response } = require('express')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')
const list_helper = require('../utils/list_helper')

const initialBlogs = [
    {
      title: 'HTML is easy',
      author: 'Heidi',
      url: 'www.easy.fi',
      likes: 22
    },
    {
      title: 'Browser can execute only Javascript',
      author: 'Juuso',
      url: 'www.juuso.com',
      likes: 2
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

  test('If likes property is missing defaults to 0', async () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url'
    }
    await api
    .post('/api/blogs')
    .send(blog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

    const blogs = await Blog.find({})
    

    expect(blogs[initialBlogs.length].likes).toBe(0)
  })

test('If id is valid: succeeds with status code 204', async () => {
    const blogs = await Blog.find({})
    const deleteBlog = blogs[0]

    await api
        .delete(`/api/blogs/${deleteBlog.id}`)
        .expect(204)

    const blogsAtEnd = await Blog.find({})
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1 )

    const blog = blogsAtEnd.map(b => b.title)
    expect(blog).not.toContain(deleteBlog.title)
  })

test('Blog must have title and url', async () => {
  const newBlog = {
    author: 'Juulia'
  }
  await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

  const bloglist = await Blog.find({})
  expect(bloglist).toHaveLength(initialBlogs.length)
})
  

afterAll(() => {
  mongoose.connection.close()
})