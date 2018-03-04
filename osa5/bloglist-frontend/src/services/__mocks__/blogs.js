let token = null

const setToken = () => {}

const blogs = [
  {
    _id: "5a451df7571c224a31b5c8ce",
    author: "Pekka Mattila",
    title: "HTML tricks",
    url: 'http://css-tricks.com',
    likes: 11,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  },
  {
    _id: "5a451e21e0b8b04a45638211",
    author: "Matti Pekkala",
    title: "CSS tricks",
    url: 'http://html-tricks.com',
    likes: 10031,
    user: {
      _id: "5a437a9e514ab7f168ddf138",
      username: "mluukkai",
      name: "Matti Luukkainen"
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll, setToken, blogs }