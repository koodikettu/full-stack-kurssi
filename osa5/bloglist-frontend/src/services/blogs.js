import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const clearToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const save = (blog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const request = axios.post(baseUrl, blog, config)
  return request.then(response => response.data)
}

export default { setToken, clearToken, getAll, save }