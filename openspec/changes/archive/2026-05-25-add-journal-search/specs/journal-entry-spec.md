# Journal Entry Capability Delta

## MODIFIED Requirements

### Requirement: Read Journal Entries
The system SHALL allow users to view all their journal entries. The default view SHALL display all journals. Search SHALL filter by title.

#### Scenario: List entries
- **WHEN** user requests journal list with no search term
- **THEN** all entries are returned in reverse chronological order

#### Scenario: Search entries
- **WHEN** user provides search term
- **THEN** only matching entries are returned
