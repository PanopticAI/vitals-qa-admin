import axios from 'axios'
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from 'amazon-cognito-identity-js'

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

// Cognito setup
const POOL_DATA = {
  UserPoolId: import.meta.env.VITE_COG_USER_POOL_ID || 'ap-southeast-1_bcok6ybJZ',
  ClientId: import.meta.env.VITE_COG_CLIENT_ID || '1e5n8panikosgap84vcmiugjge',
}
const userPool = new CognitoUserPool(POOL_DATA)

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
      window.dispatchEvent(new CustomEvent('qa:unauthorized'))
    }
    return Promise.reject(error)
  }
)

// Cognito login (same pattern as vitals-v2-qa-vue)
async function cognitoLogin(email, password) {
  return new Promise((resolve, reject) => {
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    })

    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    })

    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (res) => {
        const token = res.getIdToken().getJwtToken()
        setToken(token)
        resolve({ ok: true, token })
      },
      onFailure: (err) => {
        reject(err)
      },
      newPasswordRequired: () => {
        reject(new Error('New password required. Use AWS console or CLI to set permanent password.'))
      },
    })
  })
}

export default {
  // Auth - use Cognito directly (no backend auth endpoint)
  login: async (email, password) => {
    return cognitoLogin(email, password)
  },

  logout: () => {
    const user = userPool.getCurrentUser()
    if (user) {
      user.signOut()
    }
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
