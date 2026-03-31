// In its own file to avoid circular dependencies
export const FILE_EDIT_TOOL_NAME = 'Edit'

// Permission pattern for granting session-level access to the project's .clawd/ folder
export const CLAWD_FOLDER_PERMISSION_PATTERN = '/.clawd/**'

// Permission pattern for granting session-level access to the global ~/.clawd/ folder
export const GLOBAL_CLAWD_FOLDER_PERMISSION_PATTERN = '~/.clawd/**'

export const FILE_UNEXPECTEDLY_MODIFIED_ERROR =
  'File has been unexpectedly modified. Read it again before attempting to write it.'
