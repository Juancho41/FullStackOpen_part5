const CreateBlog = ({handleCreateBlog, title, handleTitle, author, handleAuthor, url,handleUrl}) => (
    <form onSubmit={handleCreateBlog}>
        <div>
            title:
            <input
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
                value={author}
                name="Author"
                onChange={handleAuthor}
            />
        </div>
        <div>
            url:
            <input
                type="text"
                value={url}
                name="Url"
                onChange={handleUrl}
            />
        </div>
        <button type="submit">Create</button>
    </form>
)

export default CreateBlog