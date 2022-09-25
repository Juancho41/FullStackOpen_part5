
const InfoBlog = ({ blog, blogStyle, setShowInfo, showInfo, handleDelete, handleLike, user }) => {
    if (user.username === blog.user.username) {
        return (

          <div style={blogStyle} className='blog'>
            <p>{blog.title} </p><button onClick={() => setShowInfo(!showInfo)}>hide</button>
            <p>{blog.url}</p>
            <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
            <p>{blog.author}</p>
            <button onClick={handleDelete}>Delete</button>

          </div>
        )
    }

    return (
        <div style={blogStyle} className='blog2 blog'>
            <p><span>{blog.title}</span><button onClick={() => setShowInfo(!showInfo)}>hide</button></p>
            <p>{blog.url}</p>
            <p>likes {blog.likes} <button onClick={handleLike}>like</button></p>
            <p>{blog.author}</p>

        </div>
    )
}

export default InfoBlog