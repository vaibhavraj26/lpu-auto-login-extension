// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'autoLogin') {
        performLogin(request.data);
        sendResponse({status: 'login initiated'});
    }
});

// Auto-login on page load if enabled
chrome.storage.sync.get(['regNo', 'password', 'autoLogin'], function(result) {
    if (result.autoLogin && result.regNo && result.password) {
        // Wait a bit for the page to fully load
        setTimeout(() => {
            performLogin(result);
        }, 1000);
    }
});

function performLogin(data) {
    try {
        // Common selectors for the login form - adjust these based on actual HTML
        // You may need to inspect the page to get the exact selectors
        
        // Try to find input fields by various methods
        let regNoInput = findInputByPlaceholder('registration') || 
                         findInputByLabel('registration') ||
                         findInputByName('registrationNo') ||
                         findInputByName('regNo') ||
                         findInputByName('userid') ||
                         findInputByName('username') ||
                         document.querySelector('input[type="text"]:first-of-type');
        
        let passwordInput = findInputByPlaceholder('password') ||
                           findInputByLabel('password') ||
                           findInputByName('password') ||
                           document.querySelector('input[type="password"]');
        
        let checkbox = document.querySelector('input[type="checkbox"]');
        let loginButton = document.querySelector('button[type="submit"]') ||
                         document.querySelector('input[type="submit"]') ||
                         findButtonByText('login') ||
                         findButtonByText('submit');
        
        if (!regNoInput || !passwordInput || !loginButton) {
            console.warn('Could not find all required form elements');
            console.log('Registration input found:', !!regNoInput);
            console.log('Password input found:', !!passwordInput);
            console.log('Login button found:', !!loginButton);
            return;
        }
        
        // Fill in the form
        regNoInput.value = data.regNo;
        regNoInput.dispatchEvent(new Event('input', { bubbles: true }));
        regNoInput.dispatchEvent(new Event('change', { bubbles: true }));
        
        passwordInput.value = data.password;
        passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
        passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
        
        // Click checkbox if found
        if (checkbox && !checkbox.checked) {
            checkbox.click();
            checkbox.dispatchEvent(new Event('change', { bubbles: true }));
        }
        
        // Submit the form
        setTimeout(() => {
            if (loginButton) {
                loginButton.click();
                console.log('Login form submitted');
            }
        }, 500);
        
    } catch (error) {
        console.error('Error during auto-login:', error);
    }
}

// Helper functions to find form elements
function findInputByPlaceholder(text) {
    return document.querySelector(`input[placeholder*="${text}"], input[placeholder*="${text.toUpperCase()}"]`);
}

function findInputByLabel(text) {
    const labels = document.querySelectorAll('label');
    for (let label of labels) {
        if (label.textContent.toLowerCase().includes(text.toLowerCase())) {
            const inputId = label.getAttribute('for');
            if (inputId) {
                return document.getElementById(inputId);
            }
        }
    }
    return null;
}

function findInputByName(name) {
    return document.querySelector(`input[name="${name}"], input[name*="${name}"]`);
}

function findButtonByText(text) {
    const buttons = document.querySelectorAll('button, input[type="submit"]');
    for (let button of buttons) {
        if (button.textContent.toLowerCase().includes(text.toLowerCase())) {
            return button;
        }
    }
    return null;
}
