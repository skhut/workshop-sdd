# Journal Entry Capability Specification

## Overview

This spec documents the journal entry capability as it exists in the current implementation.

## Requirements

### Requirement: Create Journal Entry
The system SHALL allow users to create new journal entries with title and content.

#### Scenario: Successful creation
- **WHEN** user submits valid title and content
- **THEN** new journal entry is created with unique ID and timestamps

### Requirement: Read Journal Entries
The system SHALL allow users to view all their journal entries. The default view SHALL display all journals. Search SHALL filter by title using case-insensitive partial match.

#### Scenario: List entries
- **WHEN** user requests journal list with no search term
- **THEN** all entries are returned in reverse chronological order

#### Scenario: Search entries
- **WHEN** user provides search term
- **THEN** only entries with matching title are returned

### Requirement: Update Journal Entry
The system SHALL allow users to edit existing journal entries.

#### Scenario: Successful update
- **WHEN** user modifies title or content and submits
- **THEN** the journal entry is updated with new values and updated_at timestamp

### Requirement: Delete Journal Entry
The system SHALL allow users to delete journal entries.

#### Scenario: Successful deletion
- **WHEN** user confirms deletion
- **THEN** the journal entry is removed from the database
