# Debugging Guide - Form Field Selectors

If the extension isn't auto-filling the form, you may need to find the exact CSS selectors for your form fields. Follow these steps:

## Finding the Form Field Selectors

### Step 1: Open the Login Page
1. Go to one of the login pages:
   - https://internet.lpu.in/24online/webpages/client.jsp, or
   - https://internet.lpu.in/24online/servlet/E24onlineHTTPClient
2. Right-click on the page → Select "Inspect" (or press F12)
3. The Developer Tools panel will open at the bottom

### Step 2: Find the Registration Number Field
1. In Developer Tools, click the "Element Inspector" icon (arrow in a box, top-left)
2. Click on the Registration Number input field
3. In the Inspector, you'll see the HTML for that field
4. Note one of these attributes:
   - `id` attribute (example: `id="userId"`)
   - `name` attribute (example: `name="registration"`)
   - `placeholder` attribute (example: `placeholder="Enter Registration No"`)
   - `class` attribute (example: `class="input-field"`)

Example HTML you might see:
```html
<input type="text" id="userId" name="registration" placeholder="Registration Number">
```

### Step 3: Find the Password Field
1. Click on the Internet Password input field
2. Note its attributes (id, name, placeholder, or class)

Example:
```html
<input type="password" name="password" placeholder="Internet Password">
```

### Step 4: Find the Checkbox (if it exists)
1. Click on the checkbox
2. Note its attributes

Example:
```html
<input type="checkbox" id="terms" name="agree">
```

### Step 5: Find the Login Button
1. Click on the Login button
2. Note its attributes or text content

Example:
```html
<button type="submit" id="loginBtn">LOGIN</button>
<!-- or -->
<input type="submit" value="LOGIN">
```

## Updating the content-script.js

Once you have the selectors, update `extension/content-script.js`:

### For the Registration Number Field:

If the field has an `id`, replace this line in `performLogin()`:
```javascript
let regNoInput = document.getElementById('YOUR_FIELD_ID');
```

If it has a `name` attribute:
```javascript
let regNoInput = document.querySelector('input[name="YOUR_FIELD_NAME"]');
```

### For the Password Field:

```javascript
let passwordInput = document.querySelector('input[name="YOUR_PASSWORD_FIELD_NAME"]');
```

### For the Checkbox:

```javascript
let checkbox = document.getElementById('YOUR_CHECKBOX_ID');
// OR
let checkbox = document.querySelector('input[type="checkbox"]');
```

### For the Login Button:

If it's a button with id:
```javascript
let loginButton = document.getElementById('YOUR_BUTTON_ID');
```

If it's a button with text:
```javascript
let loginButton = Array.from(document.querySelectorAll('button'))
    .find(btn => btn.textContent.includes('LOGIN'));
```

## Example: Complete Update

If you find:
- Registration: `<input type="text" id="loginId">`
- Password: `<input type="password" name="passwd">`
- Checkbox: `<input type="checkbox" id="rememberMe">`
- Button: `<button id="submitBtn">LOGIN</button>`

Update `content-script.js` function to:

```javascript
function performLogin(data) {
    try {
        let regNoInput = document.getElementById('loginId');
        let passwordInput = document.querySelector('input[name="passwd"]');
        let checkbox = document.getElementById('rememberMe');
        let loginButton = document.getElementById('submitBtn');
        
        if (!regNoInput || !passwordInput || !loginButton) {
            console.warn('Could not find all required form elements');
            return;
        }
        
        regNoInput.value = data.regNo;
        regNoInput.dispatchEvent(new Event('input', { bubbles: true }));
        
        passwordInput.value = data.password;
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
        
        if (checkbox && !checkbox.checked) {
            checkbox.click();
        }
        
        setTimeout(() => {
            if (loginButton) {
                loginButton.click();
            }
        }, 500);
        
    } catch (error) {
        console.error('Error during auto-login:', error);
    }
}
```

## Reload the Extension

After updating `content-script.js`:
1. Go to `chrome://extensions/`
2. Find "LPU Internet Auto-Login"
3. Click the refresh icon
4. Try logging in again

## Still Not Working?

1. Open Chrome Developer Tools (F12) on the login page
2. Go to the "Console" tab
3. Look for error messages
4. Copy any errors and use them to troubleshoot

Common CSS Selectors:
- `document.getElementById('id')` - Find by id attribute
- `document.querySelector('input[name="fieldname"]')` - Find by name
- `document.querySelector('input[type="password"]')` - Find by input type
- `document.querySelector('.classname')` - Find by class
- `document.querySelector('button:contains("text")')` - Find button by text
