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

// Cognito setup (fallback)
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
    // If token looks like an API key (no spaces, no dots), send as X-Api-Key
    if (!token.includes(' ') && !token.includes('.') && token.length < 100) {
      config.headers['x-api-key'] = token
    } else {
      config.headers.Authorization = `Bearer ${token}`
    }
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

async function cognitoSignIn(email, password) {
  return new Promise((resolve, reject) => {
    const authDetails = new AuthenticationDetails({ Username: email, Password: password })
    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool })
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: (res) => {
        try {
          const token = res.getIdToken().getJwtToken()
          setToken(token)
          resolve({ ok: true, token })
        } catch (e) {
          reject(e)
        }
      },
      onFailure: (err) => reject(err),
      newPasswordRequired: () => reject(new Error('New password required')),
    })
  })
}

export default {
  // Auth
  login: async (email, password) => {
    // Try backend auth endpoint first
    try {
      const res = await api.post('/auth/login', { email, password })
      if (res.data && res.data.token) {
        setToken(res.data.token)
        return res.data
      }
    } catch (e) {
      // ignore and try Cognito
    }

    // Try Cognito
    try {
      const cog = await cognitoSignIn(email, password)
      return cog
    } catch (e) {
      // ignore and try env fallback
    }

    // Fallback: env-provided API key (useful for local dev)
    const envApiKey = import.meta.env.VITE_QA_API_KEY
    const fallbackEmail = 'master@panoptic.ai'
    const fallbackPassword = 'PanopticAI123!'
    if (envApiKey && email === fallbackEmail && password === fallbackPassword) {
      setToken(envApiKey)
      return { ok: true, token: envApiKey }
    }

    // Final fallback: reject with a helpful message
    return Promise.reject({ message: 'Authentication failed. Configure VITE_QA_API_KEY or check Cognito credentials.' })
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
