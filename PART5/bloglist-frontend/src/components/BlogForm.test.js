import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('Testing fot BlogForm: calls the createBlog event handler correct way.', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'Testing  for form title.' }
  })

  fireEvent.change(inputAuthor, {
    target: { value: 'Testing for form author.' }
  })

  fireEvent.change(inputUrl, {
    target: { value: 'Testing of form url.' }
  })
  
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe("Testing  for form title.")
  expect(createBlog.mock.calls[0][0].author).toBe("Testing for form author.")
  expect(createBlog.mock.calls[0][0].url).toBe("Testing of form url.")
  
})