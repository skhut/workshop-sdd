# Design: Journal Search Feature

## Context

Current state: The journal app displays all journals without any search/filter capability. The App.jsx shows journals in order of creation (newest first) with no way to narrow down the list.

Constraints:
- Must work with existing SQLite database
- Should not require database migration
- Must maintain backward compatibility with existing API

## Goals / Non-Goals

**Goals:**
- Users can search journals by title (case-insensitive partial match)
- Search page is the default home page
- All journals shown when no search term provided
- Smooth UX with instant filtering

**Non-Goals:**
- Full-text search in content field
- Search by date range
- Category/tag filtering

## Decisions

1. **Search in title only**: Case-insensitive LIKE query on title field
   - Rationale: Simpler implementation, matches common expectations
   - Alternative considered: Full-text search (rejected - overkill for this app)

2. **Query parameter via URL**: ?q=searchterm
   - Rationale: Allows bookmarking/sharing searches, browser back button works
   - Alternative considered: Local state only (rejected - cannot share/bookmark)

3. **Frontend debounce**: 300ms debounce on search input
   - Rationale: Prevents excessive API calls while typing
   - Alternative considered: No debounce (rejected - too many API calls)

## User Flow

[User opens app]
        |
        v
[Display all journals]     No query param
        |
        v Has ?q=
[Filter by title case-insensitive]
