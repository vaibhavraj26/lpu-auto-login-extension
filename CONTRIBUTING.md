# Contributing to LPU Internet Auto-Login Extension

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful and inclusive
- No harassment or discriminatory language
- Constructive criticism only

## How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in Issues
2. Provide a clear title and description
3. Include steps to reproduce the bug
4. Specify your Chrome version
5. Include any error messages from the browser console (F12 → Console tab)

**Bug Report Template:**
```
Title: Brief description of the bug

Environment:
- Chrome Version: [e.g., 120.0.1234.5678]
- Extension Version: [e.g., 1.0]
- Operating System: [Windows/Mac/Linux]

Steps to Reproduce:
1. Go to [URL]
2. Click on [element]
3. Observe the bug

Expected Behavior:
[What should happen]

Actual Behavior:
[What actually happens]

Console Errors:
[Any error messages from F12 → Console]
```

### Requesting Features

1. Check if the feature has already been requested
2. Provide a clear title and description
3. Explain why this feature would be useful
4. Include any relevant examples

### Making Changes

1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly:
   - Test on both login URLs
   - Open DevTools console and check for errors
   - Test with auto-login enabled and disabled
5. Commit with clear messages: `git commit -m "Add feature description"`
6. Push to your fork: `git push origin feature-name`
7. Create a Pull Request with a clear description

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/lpu-internet-auto-login.git
cd lpu-internet-auto-login

# Install the extension in Chrome:
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Click "Load unpacked"
# 4. Select the extension/ folder
```

## Testing Guidelines

Before submitting a PR, test:

- [ ] Extension loads without errors in Chrome
- [ ] Form fills correctly on https://internet.lpu.in/24online/webpages/client.jsp
- [ ] Form fills correctly on https://internet.lpu.in/24online/servlet/E24onlineHTTPClient
- [ ] Auto-login works when enabled
- [ ] Credentials save and persist
- [ ] Console (F12) shows no errors
- [ ] Extension doesn't interfere with other sites

## Code Style

- Use clear, descriptive variable names
- Add comments for complex logic
- Keep functions focused on single responsibilities
- Test edge cases

## File Structure

```
extension/
├── manifest.json          # Don't modify permission structure
├── popup.html            # UI updates should maintain accessibility
├── popup.js              # Keep credential handling secure
├── content-script.js     # Critical file for form detection
└── icons/                # Icon files (don't change format)
```

## Security Considerations

⚠️ **Important**: This extension handles user credentials

- Never log credentials to console
- Never send credentials to external servers
- Keep all data local to the browser
- Use Chrome's storage APIs for credential storage
- Review all changes to `content-script.js` carefully

## Documentation

When adding features, update:
- `README.md` - If user-facing changes
- `CONFIGURATION.md` - If configuration options change
- `DEBUGGING_GUIDE.md` - If form detection changes
- Code comments - For complex logic

## Pull Request Process

1. Update documentation
2. Test on both login endpoints
3. Describe your changes clearly
4. Reference any related issues
5. Be open to feedback and iterate if needed

## Questions?

Open an issue with the `question` label or tag maintainers for clarification.

---

**Thank you for contributing!** 🎉
