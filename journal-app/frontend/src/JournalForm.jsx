import { useState, useEffect } from 'react'

export default function JournalForm({ onSubmit, editingJournal, onCancel, loading }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (editingJournal) {
      setTitle(editingJournal.title)
      setContent(editingJournal.content)
    }
  }, [editingJournal])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title, content })
    if (!editingJournal) {
      setTitle('')
      setContent('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="journal-form">
      <h2>{editingJournal ? 'Edit Journal' : 'New Journal'}</h2>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          required
          disabled={loading}
        />
      </div>
      <div className="form-actions">
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : editingJournal ? 'Update' : 'Create'}
        </button>
        {editingJournal && (
          <button type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
      </div>
    </form>
  )
}