# Changelog

All notable changes to this project are documented here.

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
