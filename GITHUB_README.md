# LPU Internet Auto-Login Extension

A Chrome extension that automatically logs you into the LPU internet portal with one click.

## ✨ Features

- 🔐 Secure credential storage using Chrome's encrypted storage
- ⚡ Auto-fills login forms in seconds
- 🚀 Optional auto-login on page load
- 🔄 Works with both LPU login endpoints
- 💻 No external dependencies
- 🛡️ All data stays local on your computer

## 🚀 Quick Start

### Installation

1. **Download or Clone** this repository
2. **Open Chrome** and go to `chrome://extensions/`
3. **Enable** "Developer mode" (toggle in top-right)
4. **Click** "Load unpacked"
5. **Select** the `extension` folder from this project
6. **Done!** The extension is now installed

### First Use

1. Click the extension icon in your Chrome toolbar
2. Enter your:
   - Registration Number
   - Internet Password
3. Check "Auto-login when page loads" (optional)
4. Click "Save & Auto-Login"

## 📖 Documentation

- [README.md](README.md) - Full documentation
- [QUICK_START.md](QUICK_START.md) - Get started in 5 minutes
- [CONFIGURATION.md](CONFIGURATION.md) - Advanced settings
- [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md) - Fix form detection issues
- [CONTRIBUTING.md](CONTRIBUTING.md) - How to contribute

## 🔗 Supported URLs

The extension works with both LPU login endpoints:

- `https://internet.lpu.in/24online/webpages/client.jsp`
- `https://internet.lpu.in/24online/servlet/E24onlineHTTPClient`

## 🛡️ Security

- ✅ Credentials stored **locally** only
- ✅ Chrome **encrypts** your data automatically
- ✅ No data sent to external servers
- ✅ Extension is **open-source** - verify the code yourself
- ⚠️ Don't use on shared computers without disabling auto-login

## 🤝 Contributing

We welcome contributions! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## ❓ Troubleshooting

### Form not filling?

1. Check you're on the correct URL (see above)
2. Open DevTools (F12) and check the Console for errors
3. See [DEBUGGING_GUIDE.md](DEBUGGING_GUIDE.md) for detailed help

### Auto-login not working?

1. Make sure auto-login is enabled in the popup
2. Clear browser cache: Ctrl+Shift+Delete
3. Reload the extension in `chrome://extensions/`

### More issues?

Check [README.md](README.md#troubleshooting) for additional solutions.

## ⚠️ Disclaimer

- This extension is for personal use only
- The developer is not affiliated with LPU
- Use at your own risk
- Never share your credentials or extension with others

## 📞 Support

- 📝 Open an issue on GitHub for bugs or features
- 💬 Check existing issues - your question might be answered
- 📚 Read the documentation files for detailed help

---

Made with ❤️ for LPU students
