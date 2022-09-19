import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setErrorMessage, setRefreshKey, refreshKey, user }) => {

  const [showInfo, setShowInfo] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async () => {
    const blogObject = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1

    }

    try {
      const likedBlog = await blogService.update(blogObject, blog.id)

      setErrorMessage(
        `${likedBlog.title} updated`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setRefreshKey(!refreshKey)

    } catch (exception) {
      setErrorMessage(
        `${exception}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const handleDelete = async () => {
    if (window.confirm(`do you really want to delete ${blog.title}`)) {
      try {
        await blogService.deleteBlog(blog.id)
        setErrorMessage(
          `${blog.title} deleted`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setRefreshKey(!refreshKey)
      } catch (exception) {
        setErrorMessage(
          `${exception}`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      }
    }

  }

  if (!showInfo) {
    return (
      <div style={blogStyle}>
        {blog.title} - {blog.author} <button onClick={() => setShowInfo(!showInfo)}>show</button>
      </div>

    )

  }
  if (user.username === blog.user.username) {
    return (
      <div style={blogStyle}>
        <p>{blog.title} <button onClick={() => setShowInfo(!showInfo)}>hide</button></p>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>{blog.author}</p>
        <button onClick={handleDelete}>Delete</button>

      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} <button onClick={() => setShowInfo(!showInfo)}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
      <p>{blog.author}</p>

    </div>
  )

}

export default Blog