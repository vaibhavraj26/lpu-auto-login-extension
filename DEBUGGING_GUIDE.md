# Debugging Guide

## How the Extension Works

The extension works in **3 simple steps**:

1. **Detect** - Checks the website URL to identify which login portal you're on
2. **Find** - Searches the page HTML to find the username, password, and submit button fields
3. **Fill** - Puts your credentials into those fields and clicks submit

If any of these steps fail, the auto-login won't work.

## Understanding Form Fields

Every login form has HTML elements. For example:

```html
<input type="text" id="username" placeholder="Enter username">
<input type="password" id="password" placeholder="Enter password">
<button id="loginBtn">Login</button>
```

Each element has **attributes** that identify it:
- `id` - Unique identifier (like an ID card)
- `name` - Field name
- `placeholder` - Hint text shown in the field
- `class` - CSS class for styling
- `type` - What kind of input (text, password, checkbox, etc.)

## How the Extension Finds Fields

The extension uses these attributes as a **"search address"** to locate fields on the page:

```javascript
// "Find an input with id='username'"
document.querySelector('#username')

// "Find an input with name='pwd'"
document.querySelector('input[name="pwd"]')

// "Find the first password input"
document.querySelector('input[type="password"]')
```

## When Auto-Login Fails

**Reason 1: Wrong Selector**
- The extension is looking for `#username` but the actual field is `#loginId`
- The field exists, but the extension can't find it

**Reason 2: Fields Don't Exist Yet**
- The page is still loading
- JavaScript on the page hasn't created the fields yet
- The extension tries to fill fields that aren't there

**Reason 3: Wrong Website**
- The extension only works on websites it's configured for
- You need to add the website to the manifest first

## How to Add a New Website

### Understanding the Process

1. **Inspect the page** - Look at the HTML to find field selectors
2. **Write a detector** - Add code to check if you're on that website
3. **Write a filler** - Add code to fill the fields with your credentials
4. **Register the website** - Tell the extension it can access that domain

### The Code Structure

Every login portal needs this pattern in `content-script.js`:

```javascript
// Step 1: Detect (check the URL)
if (window.location.href.includes('example-site.com')) {
    
    // Step 2: Find (locate the fields)
    let username = document.querySelector('#YOUR_USERNAME_SELECTOR');
    let password = document.querySelector('#YOUR_PASSWORD_SELECTOR');
    let button = document.querySelector('#YOUR_BUTTON_SELECTOR');
    
    // Step 3: Fill and Submit
    if (username && password && button) {
        username.value = 'YOUR_USERNAME_VALUE';
        password.value = 'YOUR_PASSWORD_VALUE';
        button.click();
    }
    
    return;
}
```

## Step-by-Step: Finding Your Selectors

### 1. Open the Login Page
- Visit the website you want to add
- Right-click on the username field
- Select "Inspect" (or press F12)

### 2. Read the HTML
Look at the HTML code in the Inspector window. Find:
- **Username field** - What are its `id`, `name`, `placeholder`, or `class`?
- **Password field** - Same as above
- **Submit button** - What is its `id`, `name`, or text content?

### 3. Write the Selector
Use what you found to create a selector:

If the HTML is: `<input id="user" type="text">`
Write: `document.querySelector('#user')`

If the HTML is: `<input name="email" type="text">`
Write: `document.querySelector('input[name="email"]')`

If the HTML is: `<button>Sign In</button>`
Write: `document.querySelector('button')`

## Common Selector Patterns

```javascript
// By ID (most reliable)
document.querySelector('#elementId')
document.getElementById('elementId')

// By Name
document.querySelector('input[name="fieldName"]')

// By Type
document.querySelector('input[type="password"]')

// By Class
document.querySelector('.className')

// By Placeholder Text
document.querySelector('input[placeholder*="word"]')

// Any Button
document.querySelector('button')

// First Input
document.querySelector('input')
```

## Testing Your Changes

After adding a new website:

1. Go to `chrome://extensions/`
2. Find the extension
3. Click the **Reload** button ↻
4. Visit the login page
5. Open DevTools (F12) → Console
6. Look for error messages or success logs

## Troubleshooting

**Problem:** Fields are found but not filled
- Solution: Check if the website uses JavaScript to validate inputs. You might need to dispatch more events like 'blur' or 'change'

**Problem:** Form doesn't submit
- Solution: The button selector might be wrong. Try clicking it manually to verify it's the right button

**Problem:** Extension runs but shows "Failed to find fields"
- Solution: Your selectors don't match the actual HTML. Use Inspect again and verify the `id`, `name`, etc.

**Problem:** Nothing happens at all
- Solution: The website URL might not be in `manifest.json` host_permissions. Add it.

## Key Concepts

| Concept | Meaning |
|---------|---------|
| **DOM** | The HTML structure of a webpage |
| **Selector** | A way to find an element in the HTML |
| **querySelector** | A function to find an element using a selector |
| **Event** | Something that happens (user types, clicks, form submits) |
| **dispatchEvent** | Simulating an event to trigger validation/changes |

## When to Ask for Help

If you:
- Can't find the right selectors after inspecting
- Understand the concept but unsure about syntax
- Need support for a new website

Share:
1. The website URL
2. Screenshot of the HTML (from Inspect)
3. What you've tried so far
