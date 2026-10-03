# Changelog

All notable changes to this project are documented here.

## [1.1] - 2026-10-03

### Added
- Version badge next to the extension name in the popup header
- Clickable popup footer that opens the GitHub page from `homepage_url`
- Indonesian (`id`) translations alongside English
- `locales.js` for translations instead of `_locales` folder

### Fixed
- `TypeError: Cannot read properties of undefined (reading 'sendMessage')` in the
  content script when the extension context was invalidated (after reload/update)
- Settings now fall back safely to defaults when the extension API is unavailable
- Message listener guarded with optional chaining to avoid crashes

### Changed
- Removed `_locales` folder; manifest name and description are now plain text

## [1.0] - 2026-05-19

### Added
- Replace the YouTube logo with the YouTube Premium logo
- Support for desktop (`#logo-icon`) and mobile (`ytm-home-logo`) layouts
- Popup settings with **Premium Logo** toggle
- Settings saved to `chrome.storage.sync`
- Extension icon auto-disabled when not on a YouTube tab
- i18n support via `_locales/en`
- MIT License

### Fixed
- Logo not showing when navigating between YouTube pages (SPA)
- Logo injected multiple times when `load()` was called repeatedly
- Logo injection now covers all `#logo-icon` elements, not just the first
