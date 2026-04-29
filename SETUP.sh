#!/bin/bash
# Quick setup guide for LPU Internet Auto-Login Extension

echo "================================"
echo "LPU Internet Auto-Login Setup"
echo "================================"
echo ""

# Check if extension folder exists
if [ ! -d "extension" ]; then
    echo "❌ Error: 'extension' folder not found!"
    echo "Make sure you're running this from the project root directory."
    exit 1
fi

echo "✓ Extension folder found"
echo ""
echo "Next steps:"
echo "1. Open Chrome and go to: chrome://extensions/"
echo "2. Enable 'Developer mode' (toggle in the top-right corner)"
echo "3. Click 'Load unpacked'"
echo "4. Select the 'extension' folder from this project"
echo "5. The extension will appear in your Chrome"
echo ""
echo "Then use the extension:"
echo "1. Click the extension icon in Chrome toolbar"
echo "2. Enter your registration number"
echo "3. Enter your internet password"
echo "4. Click 'Save & Auto-Login'"
echo ""
echo "================================"
