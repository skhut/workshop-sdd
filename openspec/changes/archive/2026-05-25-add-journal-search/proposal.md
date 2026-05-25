# Add Journal Search Feature

## Why

Users need a way to quickly find specific journal entries among potentially many entries. Currently, all journals are displayed without any filtering or search capability, making it difficult to locate specific entries. This feature will serve as the default home page and improve user experience.

## What Changes

- Add search functionality to filter journal entries by title
- Make the search page the default home page
- Display all journals when no search criteria is provided
- Add search input component to the frontend
- Add search query parameter support to the backend API

## Capabilities

### New Capabilities
- journal-search: Search and filter journal entries by title with optional query parameter

### Modified Capabilities
- journal-entry: Update to specify search behavior as primary entry point

## Impact

- Frontend: App.jsx will use search page as default; new Search component
- Backend: GET /journals/ endpoint will support optional query parameter
- API: No breaking changes; new optional query parameter
