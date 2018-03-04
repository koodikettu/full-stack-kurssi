import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
    it('should contain blog author, title and number of likes', () => {

        const blog = {
            author: 'Linus',
            title: 'Linux',
            likes: 333
        }

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog}/>)
        const blogHeader = simpleBlogComponent.find('.blog-header')
        const blogContent = simpleBlogComponent.find('.blog-content')

        expect(blogHeader.text()).toContain('Linus')
        expect(blogHeader.text()).toContain('Linux')
        expect(blogContent.text()).toContain('333')

    })

    it('should call click handler twice if button is clicked twice', () => {
        const blog = {
            author: 'Linus',
            title: 'Linux',
            likes: 333
        }

        const mockHandler = jest.fn()

        const simpleBlogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)

        const button = simpleBlogComponent.find('button')
        button.simulate('click')
        button.simulate('click')

        expect(mockHandler.mock.calls.length).toBe(2)

    })
})