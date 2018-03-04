import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    it('should initially display only blog title and author', () => {

        const blog = {
            author: 'Linus',
            title: 'Linux',
            url: 'http://linux.org',
            likes: 333,
            user: {
                name: 'Pekka Pekkala'
            }
        }

        const blogComponent = shallow(<Blog blog={blog}/>)
        const blogContent = blogComponent.find('.blog-content')

        expect(blogContent.text()).toContain('Linus')
        expect(blogContent.text()).toContain('Linux')
        expect(blogContent.text()).not.toContain('333')

        expect(blogContent.text()).not.toContain('http://linux.org')

        expect(blogContent.text()).not.toContain('Pekka Pekkala')

    })

    it('should display all blog data when title is clicked', () => {

        const blog = {
            author: 'Linus',
            title: 'Linux',
            url: 'http://linux.org',
            likes: 333,
            user: {
                name: 'Pekka Pekkala'
            }
        }

        const blogComponent = shallow(<Blog blog={blog}/>)
        const nameDiv = blogComponent.find('span')
        nameDiv.simulate('click')
        const blogContent = blogComponent.find('.blog-content')

        expect(blogContent.text()).toContain('Linus')
        expect(blogContent.text()).toContain('Linux')
        expect(blogContent.text()).toContain('333')

        expect(blogContent.text()).toContain('http://linux.org')

        expect(blogContent.text()).toContain('Pekka Pekkala')


    })
})