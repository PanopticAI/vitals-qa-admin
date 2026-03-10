import axios from 'axios'

const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:3000/'

const api = axios.create({
  baseURL: apiBase,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Auth token handling
const getToken = () => localStorage.getItem('qa_auth_token')
const setToken = (token) => localStorage.setItem('qa_auth_token', token)
const clearToken = () => localStorage.removeItem('qa_auth_token')

// Request interceptor to add auth header
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers = config.headers || {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor to handle 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response && error.response.status === 401) {
      clearToken()
      // optional: emit an event or use window.location to redirect to login
      window.dispatchEvent(new CustomEvent('qa:unauthorized'))
    }
    return Promise.reject(error)
  }
)

export default {
  // Auth
  login: (email, password) => {
    // service-qa doesn't have an auth lambda; support x-api-key-based admin flows
    // For now, if backend expects x-api-key, store it as token
    // We'll attempt /auth/login POST if present
    return api.post('/auth/login', { email, password }).then((r) => {
      if (r.data && r.data.token) setToken(r.data.token)
      return r.data
    })
  },

  setApiKey: (apiKey) => {
    // helper to set x-api-key as token
    setToken(apiKey)
  },

  logout: () => {
    clearToken()
  },

  // Videos
  listVideos: (status) =>
    api.get('/videos/list', { params: status ? { status } : {} }).then((r) => r.data),
  createUpload: (payload) => api.post('/videos/create-upload', payload).then((r) => r.data),
  finalizeUpload: (payload) => api.post('/videos/finalize', payload).then((r) => r.data),
  updateVideo: (payload) => api.post('/videos/update', payload).then((r) => r.data),
  previewVideo: (payload) => api.post('/videos/preview', payload).then((r) => r.data),
  deleteVideo: (payload) => api.post('/videos/delete', payload).then((r) => r.data),

  // Users - placeholder
  listUsers: () => api.get('/users/list').then((r) => r.data),
}
