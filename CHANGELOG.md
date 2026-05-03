# Changelog

All notable changes to the LPU Internet Auto-Login Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-05

### Added
- Support for **UMS Portal** (https://ums.lpu.in/lpuums/)
  - Fills User ID (#txtU) and Password (#TxtpwdAutoId_8767)
  - Does not auto-submit (handles CAPTCHA requirement)
- Support for **My Account Internet Portal** (https://myaccountinternet.lpu.in/)
  - Fills username as `regNo@lpu.com` format
  - Auto-fills password and submits form
- Support for **LPULive Portal** (https://lpulive.lpu.in/)
  - Fills registration number and UMS password
  - Submits when the login button becomes enabled (e.g., after CAPTCHA)
- **Separate password fields** for UMS and Internet logins
- **"Same password" checkbox** for convenience when credentials match
- **Password visibility toggle** (eye icon) - click and hold to reveal password
- **Duplicate login prevention** - prevents multiple auto-login attempts on page reload

### Improved
- Optimized auto-fill delays for faster login:
  - UMS: 1500ms → 300ms ⚡
  - Internet: 1000ms → 200ms ⚡
  - Button submit: 100ms → 50ms ⚡
- Cleaner console output - removed debug logs, kept only error warnings
- Better form field detection with smarter selectors

### Changed
- UMS password is now the primary field (Internet password is secondary)
- Form field detection is page-aware (different strategies for each portal)
- Increased manifest version to 3.0.1

### Fixed
- Page reload issue after filling regNo on UMS page
- Console errors from duplicate auto-login attempts
- Password field visibility on UMS page

### Technical Details
- Added support for 3 different domain hosts in manifest
- Implemented sessionStorage for login attempt throttling
- Smart event dispatching to avoid triggering page-reload handlers

## [1.0.0] - 2026-04

### Added
- Initial release of LPU Internet Auto-Login Extension
- Support for both login endpoints:
  - https://internet.lpu.in/24online/webpages/client.jsp
  - https://internet.lpu.in/24online/servlet/E24onlineHTTPClient
- Secure credential storage using Chrome's encrypted storage
- Auto-login functionality with optional auto-fill on page load
- Smart form field detection with multiple fallback strategies
- Popup UI for entering and managing credentials
- Comprehensive documentation and debugging guides
- Setup scripts for Windows, Mac, and Linux

### Features
- ✅ Automatic form filling
- ✅ Checkbox automation
- ✅ Login button submission
- ✅ Credential caching
- ✅ Developer mode support for unpacked installation
- ✅ Error logging in browser console for debugging

## Roadmap

### Planned for Future Versions
- [ ] Chrome Web Store publishing
- [ ] Firefox extension support
- [ ] Multiple credential profiles
- [ ] Auto-logout on idle timer
- [ ] Session detection
- [ ] Keyboard shortcuts
- [ ] Dark mode in popup UI

---

For bug reports and feature requests, please open an issue on GitHub.
