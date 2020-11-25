import React from 'react'
import {  ListGroup } from 'react-bootstrap'

//import PropTypes from 'prop-types'

const Blog = ({ blog }) => {


  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  //const label = visible ? 'hide' : 'view'

  return (

    <div style={blogStyle} className='blog'>
      <ListGroup>
        <a href={`/blogs/${blog.id}`}>{blog.title} {blog.author} </a>
      </ListGroup>

    </div>
  )
}

/*Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}*/

export default Blog