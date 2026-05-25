import { useState, useEffect } from 'react'
import { getJournals, createJournal, updateJournal, deleteJournal } from './api'
import JournalForm from './JournalForm'
import JournalList from './JournalList'

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(handler)
  }, [value, delay])
  return debouncedValue
}

function App() {
  const [journals, setJournals] = useState([])
  const [editingJournal, setEditingJournal] = useState(null)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearch = useDebounce(searchTerm, 300)

  useEffect(() => {
    fetchJournals(debouncedSearch)
  }, [debouncedSearch])

  const fetchJournals = async (query = '') => {
    try {
      const response = await getJournals(query)
      setJournals(response.data)
    } catch (error) {
      console.error('Error fetching journals:', error)
    }
  }

  const handleCreate = async (data) => {
    setLoading(true)
    try {
      await createJournal(data)
      fetchJournals(debouncedSearch)
    } catch (error) {
      console.error('Error creating journal:', error)
    }
    setLoading(false)
  }

  const handleUpdate = async (id, data) => {
    setLoading(true)
    try {
      await updateJournal(id, data)
      setEditingJournal(null)
      fetchJournals(debouncedSearch)
    } catch (error) {
      console.error('Error updating journal:', error)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this journal?')) {
      try {
        await deleteJournal(id)
        fetchJournals(debouncedSearch)
      } catch (error) {
        console.error('Error deleting journal:', error)
      }
    }
  }

  return (
    <div className="container">
      <h1>My Journal</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search journals by title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      <JournalForm 
        onSubmit={editingJournal ? (data) => handleUpdate(editingJournal.id, data) : handleCreate}
        editingJournal={editingJournal}
        onCancel={() => setEditingJournal(null)}
        loading={loading}
      />
      <JournalList 
        journals={journals} 
        onEdit={setEditingJournal} 
        onDelete={handleDelete} 
      />
    </div>
  )
}

export default App