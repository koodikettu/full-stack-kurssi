import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {

    let app

    beforeEach(() => {
        localStorage.clear()
    })

    describe('when not logged in', () => {


        beforeEach(() => {
            localStorage.clear()
            app = mount(<App />)

        })



        it('renders only login form when user is not logged in', () => {



            const user = localStorage.getItem('loggedBlogAppUser')

            expect(user).toEqual(undefined)

            app.update()
        
            const form = app.find('.loginform')
            expect(form.length).toEqual(1)
            const blogs = app.find(Blog)
            expect(blogs.length).toBe(0)
        
        
          })
    })

    describe('when logged in', () => {



        beforeEach(() => {
            const user = {
                username: 'tester',
                token: '1231231214',
                name: 'Teuvo Testaaja'
            }
              
            localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
    
            app = mount(<App />)

        })


        it('renders only login form when user is not logged in', () => {


            app.update()

            const loginForm = app.find('.loginform')
            expect(loginForm.length).toBe(0)
        
        
            const blogs = app.find(Blog)
            expect(blogs.length).toBe(2)
        
        
          })
    })

})