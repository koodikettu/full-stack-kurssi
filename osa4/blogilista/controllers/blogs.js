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

blogsRouter.delete('/:id',  async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
    
        response.status(204).end()
      } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
      }
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

blogsRouter.put('/:id', async(request, response) => {
    const body = request.body
  
    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }
  
    Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true } )
      .then(updatedNote => {
        response.json(updatedNote)
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
  })
  

module.exports = blogsRouter