# Project Structure & File Guide

This document explains the purpose of each file in the project.

## 📁 Directory Structure

```
lpu-internet-auto-login/
│
├── 📄 README.md                 # Main documentation (START HERE)
├── 📄 QUICK_START.md            # 5-minute setup guide
├── 📄 CONFIGURATION.md          # Advanced settings reference
├── 📄 DEBUGGING_GUIDE.md        # Fix form detection issues
├── 📄 CONTRIBUTING.md           # How to contribute
├── 📄 CHANGELOG.md              # Version history & roadmap
├── 📄 LICENSE                   # MIT License
├── 📄 .gitignore                # Git ignore patterns
│
├── 📁 extension/                # Chrome Extension (MAIN FOLDER)
│   ├── 📄 manifest.json         # Extension configuration
│   ├── 📄 popup.html            # Settings UI
│   ├── 📄 popup.js              # Settings logic
│   ├── 📄 content-script.js     # Form automation
│   └── 📁 icons/
│       └── 🖼️  icon.png         # Extension icon
│
├── 📁 .github/
│   └── 📁 ISSUE_TEMPLATE/
│       ├── bug_report.md        # GitHub bug report template
│       └── feature_request.md   # GitHub feature request template
│
├── 🖥️  INSTALL_WINDOWS.bat       # Windows installation helper
└── 🖥️  SETUP.sh                  # Mac/Linux installation helper
```

## 📄 File Descriptions

### Documentation Files

| File | Purpose |
|------|---------|
| **README.md** | Complete documentation - start here for full information |
| **QUICK_START.md** | Fast 5-minute setup guide |
| **CONFIGURATION.md** | Technical configuration reference |
| **DEBUGGING_GUIDE.md** | How to debug form detection issues |
| **CONTRIBUTING.md** | Guidelines for contributing to the project |
| **CHANGELOG.md** | Version history and planned features |
| **PROJECT_STRUCTURE.md** | This file - explains file organization |

### Extension Files (in `extension/` folder)

| File | Purpose |
|------|---------|
| **manifest.json** | Chrome extension configuration - defines permissions, content scripts, and settings |
| **popup.html** | User interface - what appears when you click the extension icon |
| **popup.js** | Popup logic - handles credential saving and UI interactions |
| **content-script.js** | Form automation - fills login forms and submits them automatically |
| **icons/icon.png** | Extension icon (displayed in Chrome toolbar) |

### Setup/Helper Files

| File | Purpose |
|------|---------|
| **INSTALL_WINDOWS.bat** | Batch script with installation instructions for Windows users |
| **SETUP.sh** | Shell script with installation instructions for Mac/Linux users |
| **.gitignore** | Specifies which files Git should ignore |
| **LICENSE** | MIT License - open source legal document |

### GitHub Configuration

| File | Purpose |
|------|---------|
| **.github/ISSUE_TEMPLATE/bug_report.md** | GitHub template for bug reports |
| **.github/ISSUE_TEMPLATE/feature_request.md** | GitHub template for feature requests |

## 🔧 Key Configuration Details

### What Each Script Does

1. **popup.js**
   - Listens for save button clicks
   - Stores credentials in Chrome's storage
   - Triggers auto-login on current tab

2. **content-script.js**
   - Runs on the login pages
   - Finds form fields using multiple detection methods
   - Fills in credentials
   - Submits the form

3. **popup.html**
   - Styled form for entering credentials
   - Checkbox for auto-login preference
   - Status messages for user feedback

## 📚 Getting Started

1. **First time?** → Read [README.md](README.md)
2. **Need quick setup?** → See [QUICK_START.md](QUICK_START.md)
3. **Want to contribute?** → Check [CONTRIBUTING.md](CONTRIBUTING.md)
4. **Having issues?** → Look at [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md)

## 🔐 Security Notes

All credential handling is in `popup.js` and `content-script.js`:
- Credentials stored only in Chrome's local storage
- No external API calls
- No analytics or tracking
- All code is open source - you can review it

## 📦 Installation for GitHub

To install this extension from GitHub:

```bash
# Clone the repository
git clone https://github.com/your-username/lpu-internet-auto-login.git
cd lpu-internet-auto-login

# Open Chrome and load unpacked extension
# See README.md or QUICK_START.md for detailed steps
```

---

For more information, see [README.md](README.md)
