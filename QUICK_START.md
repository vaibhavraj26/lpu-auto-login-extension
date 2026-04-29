# 🚀 LPU Internet Auto-Login Extension - Quick Start

## What You Have

I've created a **Chrome Extension** that automatically logs you into the LPU internet portal. Here's what was created:

```
Internet Ext/
├── extension/                  # ← This is the actual extension
│   ├── manifest.json          # Extension settings
│   ├── popup.html             # UI that appears when you click the icon
│   ├── popup.js               # Logic for saving your credentials
│   └── content-script.js      # Logic that fills in the login form
│
├── README.md                  # Main documentation
├── QUICK_START.md            # This file!
├── CONFIGURATION.md          # Advanced settings
├── DEBUGGING_GUIDE.md        # Fix issues with form detection
├── INSTALL_WINDOWS.bat       # Windows installation helper
└── SETUP.sh                  # Mac/Linux installation helper
```

## Installation (5 minutes)

### For Windows Users:
1. Double-click `INSTALL_WINDOWS.bat` - it will show you step-by-step instructions
2. Or follow the manual steps below

### Manual Installation:
1. **Open Chrome** and go to `chrome://extensions/`
2. **Enable Developer Mode** (toggle in top-right corner)
3. Click **"Load unpacked"**
4. **Select the "extension" folder** from this project
5. ✅ The extension is now installed!

## Using the Extension

### First Time:
1. Click the extension icon in your Chrome toolbar (top right)
2. Enter your:
   - **Registration Number** (your student/user ID)
   - **Internet Password**
3. Check "Auto-login when page loads" if you want automatic login
4. Click **"Save & Auto-Login"**

### From Now On:
- The extension automatically fills and submits the login form
- If auto-login is enabled, it happens automatically when you visit the page
- Or just click the extension icon and click "Save & Auto-Login"

## How It Works

```
You              Extension           Login Page
│                    │                    │
├─ Click Icon ──────→│                    │
│                    │                    │
├─ Enter Creds ──────→│                    │
│                    │                    │
├─ Click Save ──────→│                    │
│                    ├─ Visit Page ──────→│
│                    │                    │
│                    ├─ Fill Form ───────→│ (Reg No)
│                    │                    │
│                    ├─ Fill Form ───────→│ (Password)
│                    │                    │
│                    ├─ Check Box ───────→│
│                    │                    │
│                    ├─ Click Login ─────→│
│                    │                    │
│                ✅ You're logged in!
```

## Security & Privacy

- ✅ Your credentials are **stored locally** on your computer only
- ✅ Chrome encrypts them for you
- ✅ They're **only used** to login to the LPU portal
- ✅ No data is sent to external servers
- ⚠️ Don't share this extension with others
- ⚠️ If using a shared computer, disable auto-login

## Troubleshooting

### "Extension not filling the form"

The extension uses smart detection to find the form fields. If it doesn't work:

1. **Check the URL**: Make sure you're on one of these URLs:
   - https://internet.lpu.in/24online/webpages/client.jsp
   - https://internet.lpu.in/24online/servlet/E24onlineHTTPClient
2. **Open DevTools**: Press F12, go to Console tab
3. **Check for errors**: Any red messages?
4. **See DEBUGGING_GUIDE.md** for detailed instructions to find the correct form selectors

### "Not logging in automatically"

1. Check if auto-login is enabled in the extension popup
2. Clear your browser cache: Ctrl+Shift+Delete
3. Reload the extension: Go to chrome://extensions and click refresh
4. Try again

### "Chrome says extension not from Web Store"

This is normal for unpacked extensions during development. It's safe to use.

## File Descriptions

| File | Purpose |
|------|---------|
| `manifest.json` | Extension configuration for Chrome |
| `popup.html` | The UI you see when clicking the icon |
| `popup.js` | Saves your credentials when you click the button |
| `content-script.js` | Fills in the login form automatically |
| `README.md` | Complete documentation |
| `DEBUGGING_GUIDE.md` | How to fix form detection issues |
| `CONFIGURATION.md` | Advanced settings and customization |

## Need Help?

1. **Installation**: See `README.md`
2. **Form not filling**: See `DEBUGGING_GUIDE.md`
3. **Customize colors/text**: See `CONFIGURATION.md`
4. **Extension not working**: 
   - Check the console (F12)
   - Reload the extension
   - Clear browser cache

## Features

✅ Auto-fill registration number  
✅ Auto-fill internet password  
✅ Auto-check the checkbox  
✅ Auto-submit the login form  
✅ Optional auto-login on page load  
✅ Secure local credential storage  
✅ Simple, clean UI  

## Next Steps

1. **Install**: Follow the Installation section above
2. **Save Credentials**: Click the extension icon, enter your info, click Save
3. **Done!**: The extension will handle the rest automatically

---

**Questions?** Check `README.md` for detailed documentation or `DEBUGGING_GUIDE.md` if something isn't working.
