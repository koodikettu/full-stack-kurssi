import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const clearToken = () => {
  token = null
}

const getConfig = () => {
  const config = {
    headers: { 'Authorization': token }
  }
  return config
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const save = (blog) => {
  const request = axios.post(baseUrl, blog, getConfig())
  return request.then(response => response.data)
}

const update = (blog) => {
  const updatedBlog = Object.assign(blog)
  if (updatedBlog.user) {
    updatedBlog.user = updatedBlog.user._id
  }
  delete updatedBlog.id
  const request = axios.put(baseUrl + '/' + blog._id, updatedBlog, getConfig())
  return request.then(response => response.data)
}

const remove = (blogId) => {
  const request = axios.delete(baseUrl + '/' + blogId, getConfig())
  return request.then(response => response.data)
}

export default { setToken, clearToken, getAll, save, update, remove }