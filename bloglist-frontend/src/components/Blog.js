import { useState } from 'react'
import blogService from '../services/blogs'
import InfoBlog from './InfoBlog'

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
      <div style={blogStyle} className='blog'>
        <p>{blog.title}</p><p>{blog.author}</p><button onClick={() => setShowInfo(!showInfo)}>show</button>
      </div>

    )

  }
  return (
    <InfoBlog blog={blog} user={user}
    blogStyle={blogStyle} handleLike={handleLike}
    setShowInfo={setShowInfo} showInfo={showInfo}
    handleDelete={handleDelete}  />
  )


}

export default Blog