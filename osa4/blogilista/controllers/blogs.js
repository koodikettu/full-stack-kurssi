const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }
}

blogsRouter.get('/',  async (request, response) => {
    const blogs =  await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const blogObject = request.body

    if (!Object.getOwnPropertyNames(blogObject).includes('likes')) {
        blogObject.likes = 0
    }

    if (!Object.getOwnPropertyNames(blogObject).includes('title')) {
        response.status(400).send()
        return
    }

    if (!Object.getOwnPropertyNames(blogObject).includes('url')) {
        response.status(400).send()
        return
    }

    const blog = new Blog(blogObject)

    const result = await blog.save()
        
    response.status(201).json(result)
        
})

module.exports = blogsRouter