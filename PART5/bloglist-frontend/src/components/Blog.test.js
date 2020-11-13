import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('Only title and author are visible', () => {
  const user = {
      username: "Milli Molly",
      password: "M.M."
    }
   
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: "Winnie the Pooh",
    url: "Poohworld.com",
    user: user
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(blog.title)
    'Component testing is done with react-testing-library'

  expect(div).toHaveTextContent(blog.author)

  expect(div).not.toHaveTextContent(blog.url)

  expect(div).not.toHaveTextContent(blog.likes)
})
