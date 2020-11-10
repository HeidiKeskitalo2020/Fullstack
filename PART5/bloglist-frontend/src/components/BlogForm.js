import React from 'react'

const BlogForm = (props) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={props.onSubmit}>
                <div>
                    title:
                <input
                    type="text"
                    value={props.titleValue}
                    name="title"
                    onChange={props.handleTitleChange}
                />
                </div>
                <div>
                    author:
                <input
                    type="text"
                    value={props.authorValue}
                    name="author"
                    onChange={props.handleAuthorChange}
                />
                </div>
                <div>
                    url:
                <input
                    type="text"
                    value={props.urlValue}
                    name="url"
                    onChange={props.handleUrlChange}
                />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm