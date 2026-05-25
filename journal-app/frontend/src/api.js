import axios from 'axios'

const API_URL = 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_URL
})

export const getJournals = (query = '') => {
  const params = query ? { q: query } : {}
  return api.get('/journals/', { params })
}
export const getJournal = (id) => api.get(`/journals/${id}`)
export const createJournal = (data) => api.post('/journals/', data)
export const updateJournal = (id, data) => api.put(`/journals/${id}`, data)
export const deleteJournal = (id) => api.delete(`/journals/${id}`)