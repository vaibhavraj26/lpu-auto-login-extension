# LPU Internet Auto-Login Extension

This Chrome extension automatically logs you into the LPU portals. It supports all login endpoints:

## Features

- ✅ Saves your registration number and password securely
- ✅ Auto-fills the login form
- ✅ Automatically clicks the checkbox
- ✅ Submits the login form with one click
- ✅ Optional automatic login when the page loads

## Installation

### Step 1: Prepare the Extension
1. The extension is located in the `extension` folder
2. All required files are already in place:
   - `manifest.json` - Extension configuration
   - `popup.html` - Settings UI
   - `popup.js` - Settings logic
   - `content-script.js` - Login automation

### Step 2: Install in Chrome

1. Open Chrome and go to `chrome://extensions/`
2. Enable **"Developer mode"** (toggle in top right)
3. Click **"Load unpacked"**
4. Navigate to and select the `extension` folder from this project
5. The extension should now appear in your extensions list

### Step 3: Use the Extension

1. Click the extension icon in your Chrome toolbar
2. Enter your:
   - **Registration Number** (your student/user ID)
   - **Internet Password**
3. Check "Auto-login when page loads" if you want automatic login
4. Click **"Save & Auto-Login"**

## How It Works

1. **First Use**: Enter your credentials in the popup and click Save
2. **Auto-Login**: The extension will automatically:
   - Navigate to the login page (optional, if auto-login is enabled)
   - Fill in your registration number
   - Fill in your internet password
   - Check the required checkbox
   - Click the login button

3. **Subsequent Uses**: 
   - If auto-login is enabled, just visit the login page and the form fills automatically
   - Or click the extension icon and click "Save & Auto-Login" button

## Security Notes

- ⚠️ Your credentials are stored locally in Chrome's encrypted storage
- ⚠️ Never share your extension with others
- ⚠️ Your credentials are only used for the LPU internet portal
- ⚠️ Disable auto-login if using a shared computer

## Troubleshooting

### Form not filling?
The extension uses smart detection to find form elements. If it doesn't work:

1. Open either login page:
   - https://internet.lpu.in/24online/webpages/client.jsp, or
   - https://internet.lpu.in/24online/servlet/E24onlineHTTPClient
2. Right-click on the registration number field → "Inspect"
3. Note the field's name, id, or placeholder attribute
4. Edit `content-script.js` and update the selector logic

Example: If the registration field has `name="userid"`, ensure the selector includes that.

### Not logging in automatically?
1. Check if auto-login is enabled in the extension popup
2. Clear browser cache/cookies and try again
3. Open Developer Tools (F12) and check the Console for any error messages

### Chrome says "This extension is not from Chrome Web Store"?
This is normal for unpacked extensions during development. It's safe to use.

## Uninstall

1. Go to `chrome://extensions/`
2. Find "LPU Internet Auto-Login"
3. Click the trash icon to uninstall

## Support

If you encounter issues:
1. Check that you're on the correct URL: https://internet.lpu.in/24online/servlet/E24onlineHTTPClient
2. Clear your browser cache (Ctrl+Shift+Delete)
3. Reload the extension in `chrome://extensions/`
4. Try re-entering your credentials

---

**Note**: This extension is for personal use only. Do not share your credentials or extension installation.
