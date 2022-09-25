import { useState } from 'react'

const CreateBlog = ({ handleCreateBlog }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleUrl = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        handleCreateBlog({
            title: title,
            author: author,
            url: url,
            likes: 0
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={addBlog}>
            <div>
                title:
                <input
                    id='title'
                    type="text"
                    value={title}
                    name="Title"
                    onChange={handleTitle}
                />
            </div>
            <div>
                author:
                <input
                    type="text"
                    id='author'
                    value={author}
                    name="Author"
                    onChange={handleAuthor}
                />
            </div>
            <div>
                url:
                <input
                    type="text"
                    id='url'
                    value={url}
                    name="Url"
                    onChange={handleUrl}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default CreateBlog