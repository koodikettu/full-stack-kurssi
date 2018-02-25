const supertest = require('supertest')
const Blog = require('../models/blog')
const { app, server } = require('../index')
const api = supertest(app)
const testHelper = require('./testHelper')


  
  beforeEach(async () => {
    await Blog.remove({})
  
    const blogObjects = testHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are six notes', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body.length).toBe(6)
  })
  
test('one is about React patterns', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body.find(b => b.title ==='React patterns').author).toBe('Michael Chan')
  })

test('a valid blog can be added', async () => {

    const blogsBefore = await testHelper.blogsInDb()

    const newBlog = {
        title: 'New blog title',
        author: 'Markku',
        url: 'cs.helsinki.fi',
        likes: 100
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfter = await testHelper.blogsInDb()
    
    expect(blogsAfter.length).toBe(blogsBefore.length + 1)

    expect(blogsAfter.map(b => b.title)).toContain('New blog title')

})

test('if new blog does not have likes property, it is set to 0', async () => {

    const blogsBefore = await testHelper.blogsInDb()

    const newBlog = {
        title: 'New blog without likes property',
        author: 'Markku',
        url: 'cs.helsinki.fi'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfter = await testHelper.blogsInDb()
    
    expect(blogsAfter.length).toBe(blogsBefore.length + 1)

    expect(blogsAfter.find(b => b.title === 'New blog without likes property').likes).toBe(0)

})

test('if new blog does not have title property, should return bad request 400', async () => {
    
    const blogsBefore = await testHelper.blogsInDb()

    
    const newBlog = {
        author: 'Markku',
        url: 'cs.helsinki.fi'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAfter = await testHelper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length)



})

test('if new blog does not have url property, should return bad request 400', async () => {
    
    const blogsBefore = await testHelper.blogsInDb()

    
    const newBlog = {
        title: 'New blog without url',
        author: 'Markku'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

    const blogsAfter = await testHelper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length)

})

test('should remove blog with given id', async () => {
    
    const blogsBefore = await testHelper.blogsInDb()

    const id = blogsBefore[0].id;

    await api.delete('/api/blogs/' + id)
        .expect(204)

    const blogsAfter = await testHelper.blogsInDb()

    expect(blogsAfter.length).toBe(blogsBefore.length - 1)

    expect(blogsAfter.map(b => b.id)).not.toContain(id)


})

test('should update blog with given id', async () => {
    
    const blogsBefore = await testHelper.blogsInDb()

    const blog = blogsBefore[0]

    const originalLikes = blog.likes
    blog.likes += 10

    await api.put('/api/blogs/' + blog.id)
        .send(blog)

    const blogsAfter = await testHelper.blogsInDb()

    expect(blogsAfter.length).toBe(6)

    expect(blogsAfter.find(b => {
        return b.id + '' === blog.id. 
    })
        .author).toBe(originalLikes + 10)


})

afterAll(() => {
  server.close()
})