export default function JournalList({ journals, onEdit, onDelete }) {
  if (journals.length === 0) {
    return <p className="no-journals">No journals yet. Create your first journal!</p>
  }

  return (
    <div className="journal-list">
      <h2>Your Journals</h2>
      {journals.map((journal) => (
        <div key={journal.id} className="journal-card">
          <h3>{journal.title}</h3>
          <p>{journal.content}</p>
          <small>
            Created: {new Date(journal.created_at).toLocaleString()}
            {journal.updated_at && ` | Updated: ${new Date(journal.updated_at).toLocaleString()}`}
          </small>
          <div className="journal-actions">
            <button onClick={() => onEdit(journal)}>Edit</button>
            <button onClick={() => onDelete(journal.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  )
}