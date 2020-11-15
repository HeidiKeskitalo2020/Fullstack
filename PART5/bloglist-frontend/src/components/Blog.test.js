import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const likeBlogs = jest.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Winnie the Pooh',
    url: 'www.PoohWorld.com',
    user: {
      username: 'Milli Molly',
      name: 'User Name',
      id: 'User ID',
    },
    likes: 1
  }
  beforeEach(() => {
    const user = {}
    component = render(
      <Blog blog={blog} updateBlog={likeBlogs} user={user} />
    )
  })
  describe ('Visibility of blogs', () => {
    test('Only title and author are visible', () => {
      const div = component.container.querySelector('.blog')
      expect(div).toHaveTextContent(blog.title)
      expect(div).toHaveTextContent(blog.author)
      expect(div).not.toHaveTextContent(blog.url)
      expect(div).not.toHaveTextContent(blog.likes)
    })
    test ('Title, author, likes and url are visible', () => {
      const button = component.getByText('view')
      fireEvent.click(button)

      const div = component.container.querySelector('.blog')
      expect(div).toHaveTextContent(blog.title)
      expect(div).toHaveTextContent(blog.author)

      const div2 = component.container.querySelector('.info')
      expect(div2).not.toHaveStyle('display: none')
      expect(div2).toHaveTextContent(blog.url)
      expect(div2).toHaveTextContent(blog.likes)
    //component.debug()
    })
  })
  describe('Like function', () => {
    test('When like button is clicked twice, responsible is called twice', () => {


      const button = component.getByText('like')
      fireEvent.click(button)
      fireEvent.click(button)

      expect(likeBlogs.mock.calls).toHaveLength(2)
      component.debug()
    })
  })
})

