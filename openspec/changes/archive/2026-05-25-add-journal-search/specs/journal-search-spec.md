# Journal Search Capability

## ADDED Requirements

### Requirement: Search journals by title
The system SHALL allow users to search journal entries by title using a case-insensitive partial match.

#### Scenario: Search with results
- **WHEN** user provides search term "meeting"
- **THEN** system returns journals with "meeting" in title (case-insensitive)

#### Scenario: Search with no results
- **WHEN** user provides search term "xyznonexistent"
- **THEN** system returns empty list

#### Scenario: Search with empty query
- **WHEN** user provides empty or no search term
- **THEN** system returns all journals

### Requirement: Search via query parameter
The system SHALL support searching via URL query parameter q.

#### Scenario: Search from URL
- **WHEN** user navigates to /?q=journal
- **THEN** system displays journals matching "journal" in title
