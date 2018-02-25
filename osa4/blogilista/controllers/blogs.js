const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

const formatBlog = (blog) => {
  return {
    id: blog._id,
    title: note.title,
    author: note.author,
    url: note.url,
    likes: note.likes
  }
}

blogsRouter.get('/',  async (request, response) => {
    const blogs =  await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
    })

module.exports = blogsRouter