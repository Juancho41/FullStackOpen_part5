import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import userEvent from '@testing-library/user-event'
import InfoBlog from './InfoBlog'

describe('component displaying a blog tests', () => {



    test('blog renders title and author but not ulr and likes', () => {
        const blog = {
            title: 'New prueba with user',
            url: 'asdfasdf.com',
            author: 'Juan',
            likes: 12
        }

        const { container } = render(<Blog blog={blog} />)
        const div = container.querySelector('.blog')
        expect(div).toHaveTextContent(
            'New prueba with user'
        )
        expect(div).toHaveTextContent(
            'Juan'
        )
        expect(div).not.toHaveTextContent(
            'asdfasdf.com'
        )
        expect(div).not.toHaveTextContent(
            '12'
        )
    })
    test('the blogs url and number of likes are shown when the button controlling the shown details has been clicked',
        async () => {
            const blog = {
                title: 'New prueba with user',
                url: 'asdfasdf.com',
                author: 'Juan',
                likes: 12,
                user: {
                    username: 'Juan'
                }
            }
            const user = {
                username: 'Prueba'
            }

            const { container } = render(<Blog blog={blog} user={user} />)

            const userPC = userEvent.setup()
            const button = screen.getByText('show')
            await userPC.click(button)

            const div = container.querySelector('.blog2')
            expect(div).toHaveTextContent(
                'asdfasdf.com'
            )
            expect(div).toHaveTextContent(
                '12'
            )
        }
    )

    test('if the like button is clicked twice, the event handler the component received as props is called twice',
        async () => {

            const user = {
                username: 'Juan'
            }
            const blog = {
                title: 'prueba',
                author: 'blog.author',
                url: 'blog.url',
                likes: 0,
                user: {
                    username: 'Juancho'
                }
            }
            const showInfo = false
            const setShowInfo = false
            const handleDelete = false
            const blogStyle = {
                paddingTop: 10,
                paddingLeft: 2,
                border: 'solid',
                borderWidth: 1,
                marginBottom: 5
            }
            const mockHandler = jest.fn()

            render(<InfoBlog blog={blog} user={user}
                blogStyle={blogStyle} handleLike={mockHandler}
                setShowInfo={setShowInfo} showInfo={showInfo}
                handleDelete={handleDelete} />)
            const userPC = userEvent.setup()
            const button = screen.getByText('like')
            await userPC.click(button)
            await userPC.click(button)
            expect(mockHandler.mock.calls).toHaveLength(2)
        })



    test('the new blog form calls the event handler it received as props with the right details when a new blog is created',
        async () => {

            const mockHandler = jest.fn()

            render(<CreateBlog handleCreateBlog={mockHandler} />)

            const input = screen.getAllByRole('textbox')

            const userPC = userEvent.setup()
            const button = screen.getByText('Create')
            await userPC.type(input[0], 'testing blogs title')
            await userPC.type(input[1], 'testing blogs author')
            await userPC.type(input[2], 'testing blogs url')
            await userPC.click(button)
            expect(mockHandler.mock.calls).toHaveLength(1)
            expect(mockHandler.mock.calls[0][0].title).toBe('testing blogs title')
            expect(mockHandler.mock.calls[0][0].author).toBe('testing blogs author')
            expect(mockHandler.mock.calls[0][0].url).toBe('testing blogs url')

        }
    )

})
