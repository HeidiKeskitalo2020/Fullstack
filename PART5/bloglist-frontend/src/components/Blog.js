import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [viewAll, setViewAll] = useState(false)

  let showDelete = { display: 'none' }
  if (user.name === blog.user.name) {
    showDelete = { display: '' }
  }

  const hideViewAll = { display: viewAll ? 'none' : '' }
  const showViewAll = { display: viewAll ? '' : 'none' }

  const blogStyle =
  {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBotton: 5
  }
  const handleClick = () => {
    const blogObjekt = {
      user: blog.user.id,
      id: blog.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    //const id = blog.id
    updateBlog(blogObjekt.id, blogObjekt)
  }
  const handleDeleteClick = () => {
    deleteBlog(blog.id, blog.title, blog.author)
  }

  return (
    <div style={blogStyle} >
      <div style={hideViewAll} className='blog'>
        {blog.title} {blog.author} <button onClick={() => setViewAll(true)}>view</button>
      </div>
      <div style={showViewAll} className='info'>
        {blog.title} {blog.author} <button onClick={() => setViewAll(false)}>hide</button>
        <div> {blog.url}</div>
        <div id='likes'>likes {blog.likes} <button id='likesButton' onClick={() => {handleClick()}}>like</button></div>
        <div>{blog.user.name}</div>
        <div style ={showDelete}><button id='deleteButton' onClick={() => {handleDeleteClick()}}>remove</button> </div>
      </div>
    </div>
  )
}


export default Blog
