# Configuration Reference

This document explains all configuration options for the LPU Internet Auto-Login Extension.

## Extension Files Structure

```
extension/
├── manifest.json       # Extension configuration (Chrome Web Store settings)
├── popup.html         # Settings UI (what you see when clicking the icon)
├── popup.js           # Settings logic (handles saving credentials)
└── content-script.js  # Login automation (runs on the login page)
```

## manifest.json Configuration

The `manifest.json` file contains the extension metadata:

```json
{
  "manifest_version": 3,              // Chrome extension version (3 is latest)
  "name": "LPU Internet Auto-Login",  // Extension name shown in Chrome
  "version": "1.0",                   // Your extension version
  "description": "...",               // Shown in Chrome extensions page
  "permissions": [...],               // What the extension can access
  "host_permissions": [...],          // Which websites it can interact with
  "content_scripts": [...]            // Scripts that run on web pages
}
```

### Important Settings:

**host_permissions** - Controls which websites the extension works on:
```json
"host_permissions": [
  "https://internet.lpu.in/*"  // Allows all URLs on internet.lpu.in domain
]
```

This permission allows the extension to work on both LPU login endpoints:
- https://internet.lpu.in/24online/webpages/client.jsp
- https://internet.lpu.in/24online/servlet/E24onlineHTTPClient

To add more websites, add another line:
```json
"host_permissions": [
  "https://internet.lpu.in/*",
  "https://another-site.com/*"
]
```

## popup.html - UI Customization

The popup.html controls what appears when you click the extension icon.

### Change the Title:
Look for:
```html
<h2>🔐 LPU Auto-Login</h2>
```
Change to anything you want:
```html
<h2>🔐 My Auto-Login Tool</h2>
```

### Change Button Color:
In the `<style>` section, find:
```css
button {
  background-color: #4CAF50;  /* Green */
}
button:hover {
  background-color: #45a049;  /* Darker green on hover */
}
```

Popular colors:
- Blue: `#2196F3` (hover: `#0b7dda`)
- Red: `#f44336` (hover: `#da190b`)
- Orange: `#ff9800` (hover: `#e68900`)
- Purple: `#9c27b0` (hover: `#7b1fa2`)

## Credentials Storage

Credentials are stored in Chrome's `sync` storage, which means:
- ✅ Encrypted locally on your computer
- ✅ Synced across Chrome browser on other devices if you're signed in
- ❌ Not accessible to website JavaScript
- ❌ Not stored in plain text

To access stored credentials manually (in browser console):
```javascript
chrome.storage.sync.get(['regNo', 'password', 'autoLogin'], function(result) {
    console.log(result);
});
```

## Content Script Configuration

The `content-script.js` is the most important file for form interaction.

### How Form Detection Works:

The script uses multiple strategies to find form fields:

1. **Placeholder matching**: `placeholder*="registration"`
2. **Label matching**: Looks for labels with text like "registration"
3. **Name attribute**: `name="registrationNo"`
4. **Type matching**: `input[type="password"]`
5. **Fallback**: First text input, first password input

### Form Field Timing:

The script waits for the page to load before attempting login:
```javascript
setTimeout(() => {
    performLogin(result);
}, 1000);  // Waits 1000ms (1 second)
```

To increase wait time if the page loads slowly:
```javascript
}, 2000);  // Wait 2 seconds instead
```

## Advanced: Multiple Form Fields

If the page has multiple text inputs and the script fills the wrong one, specify the exact selector:

Current (tries multiple methods):
```javascript
let regNoInput = findInputByPlaceholder('registration') || 
                 findInputByLabel('registration') ||
                 document.querySelector('input[type="text"]:first-of-type');
```

More specific:
```javascript
let regNoInput = document.getElementById('userId');  // Most specific
let regNoInput = document.querySelector('input[name="registration"]');
```

## Advanced: Custom Field Selectors

If you need custom selectors, find your HTML structure first:

1. Open the login page
2. Right-click → Inspect
3. Find the input element
4. Note its attributes

Common examples:
```html
<!-- With ID -->
<input type="text" id="regNumber">
→ let regNoInput = document.getElementById('regNumber');

<!-- With Name -->
<input type="text" name="studentID">
→ let regNoInput = document.querySelector('input[name="studentID"]');

<!-- With Class -->
<input type="text" class="login-field registration">
→ let regNoInput = document.querySelector('input.registration');

<!-- With Data Attribute -->
<input type="text" data-field="registration">
→ let regNoInput = document.querySelector('input[data-field="registration"]');
```

## Performance Tuning

### Reduce Auto-Fill Delay:
In `content-script.js`:
```javascript
setTimeout(() => {
    performLogin(result);
}, 1000);  // Change 1000 to 500 for faster execution
```

### Reduce Submit Delay:
```javascript
setTimeout(() => {
    if (loginButton) {
        loginButton.click();
    }
}, 500);  // Change 500 to 200 for faster submit
```

## Troubleshooting Configuration

### Check if Extension is Running:
1. Open the login page
2. Press F12 (Developer Tools)
3. Go to Console tab
4. Type: `console.log('Content script loaded')`
5. If you see the message, the script is running

### Enable Debug Logging:
Add this at the top of `content-script.js`:
```javascript
const DEBUG = true;

function log(...args) {
    if (DEBUG) console.log('[LPU Auto-Login]', ...args);
}
```

Then use `log()` instead of `console.log()`:
```javascript
log('Form elements found');
log('Registration input:', regNoInput);
```

### Check Stored Credentials:
Run in browser console:
```javascript
chrome.storage.sync.get(null, function(items) {
    console.log('Stored credentials:', items);
});
```

---

For more help, see:
- [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md) - How to find correct form selectors
- [README.md](README.md) - Installation and usage instructions
