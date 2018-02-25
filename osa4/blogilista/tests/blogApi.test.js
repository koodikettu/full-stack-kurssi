const supertest = require('supertest')
const Blog = require('../models/blog')
const { app, server } = require('../index')
const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7
      },
      {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12
      },
      {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10
      },
      {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0
      },
      {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2
      }  
  ]
  
  beforeAll(async () => {
    await Blog.remove({})
  
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are five notes', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body.length).toBe(2)
  })
  
test('the first note is about React patterns', async () => {
    const response = await api
      .get('/api/blogs')
  
    expect(response.body[0].title).toBe('React patterns')
  })

test('a valid blog can be added', async () => {
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

    const response = await api
        .get('/api/blogs')
    
    expect(response.body.length).toBe(3)

    expect(response.body[2].title).toBe('New blog title')

})

test('if new blog does not have likes property, it is set to 0', async () => {
    const newBlog = {
        title: 'New blog without likes title',
        author: 'Markku',
        url: 'cs.helsinki.fi'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api
        .get('/api/blogs')
    
    expect(response.body.length).toBe(4)

    expect(response.body[3].likes).toBe(0)

})

test('if new blog does not have title property, should return bad request 400', async () => {
    const newBlog = {
        author: 'Markku',
        url: 'cs.helsinki.fi'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

})

test('if new blog does not have url property, should return bad request 400', async () => {
    const newBlog = {
        title: 'New blog without url',
        author: 'Markku'
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .expect(400)

})

afterAll(() => {
  server.close()
})