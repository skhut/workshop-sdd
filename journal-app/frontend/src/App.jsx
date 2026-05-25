import { useState, useEffect } from 'react'
import { getJournals, createJournal, updateJournal, deleteJournal } from './api'
import JournalForm from './JournalForm'
import JournalList from './JournalList'

function App() {
  const [journals, setJournals] = useState([])
  const [editingJournal, setEditingJournal] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchJournals()
  }, [])

  const fetchJournals = async () => {
    try {
      const response = await getJournals()
      setJournals(response.data)
    } catch (error) {
      console.error('Error fetching journals:', error)
    }
  }

  const handleCreate = async (data) => {
    setLoading(true)
    try {
      await createJournal(data)
      fetchJournals()
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
      fetchJournals()
    } catch (error) {
      console.error('Error updating journal:', error)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this journal?')) {
      try {
        await deleteJournal(id)
        fetchJournals()
      } catch (error) {
        console.error('Error deleting journal:', error)
      }
    }
  }

  return (
    <div className="container">
      <h1>My Journal</h1>
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