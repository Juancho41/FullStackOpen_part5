import { useState, useEffect, useRef  } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import LoguinForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [refreshKey, setRefreshKey] = useState(true)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [refreshKey])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)

    }
  }, [])

  const handleUsername = (event) => {
    setUsername(event.target.value)
  }

  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setErrorMessage(
        'Logged in successful'
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      console.log('Wrong credentials', exception)
      setErrorMessage(
        `Wrong credentials - ${exception}`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }



  const handleCreateBlog = async (blogObject) => {

    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      setErrorMessage(
        `${newBlog.title} added`
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

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <LoguinForm handleLogin={handleLogin} handleUsername={handleUsername} handlePassword={handlePassword} username={username} password={password} />
      </div>
    )
  }
  console.log(1)
  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <h4>{user.name} loged in</h4>
      <button onClick={handleLogout}>LogOut</button>
      <Togglable buttonLabel='create new' ref={blogFormRef}>
        <CreateBlog handleCreateBlog={handleCreateBlog} />
      </Togglable>


      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog}
          setErrorMessage={setErrorMessage}
          setRefreshKey={setRefreshKey}
          refreshKey={refreshKey}
          user={user} />
      )}
    </div>
  )
}


export default App
