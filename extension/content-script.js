// console.log('Content script loaded on:', window.location.href);

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'autoLogin') {
        performLogin(request.data);
        sendResponse({status: 'login initiated'});
    }
});

// Auto-login on page load if enabled
chrome.storage.sync.get(['regNo', 'internetPassword', 'umsPassword', 'autoLogin'], function(result) {
    if (result.autoLogin && result.regNo && (result.internetPassword || result.umsPassword)) {
        // Prevent multiple auto-login attempts within 5 seconds
        const lastLoginAttempt = sessionStorage.getItem('lastAutoLoginAttempt');
        const now = Date.now();
        
        if (!lastLoginAttempt || (now - parseInt(lastLoginAttempt)) > 4000) {
            sessionStorage.setItem('lastAutoLoginAttempt', now.toString());
            
            // Shorter delay for faster filling
            const delay = window.location.href.includes('ums.lpu.in') ? 300 : 200;
            setTimeout(() => {
                performLogin(result);
            }, delay);
        }
    }
});

function performLogin(data) {
    try {
        // Check if this is the UMS LPU page (has captcha, so only fill, don't submit)
        if (window.location.href.includes('ums.lpu.in')) {
            // // console.log('UMS page detected, attempting to fill credentials');
            
            let userIdInput = document.querySelector('input[name="txtU"]') || document.querySelector('#txtU');
            let passwordInput = document.querySelector('input[name="TxtpwdAutoId_8767"]') || document.querySelector('#TxtpwdAutoId_8767');
            
            if (userIdInput && passwordInput) {
                // Fill user ID
                userIdInput.value = data.regNo;
                userIdInput.dispatchEvent(new Event('input', { bubbles: true }));
                
                // Fill password
                passwordInput.value = data.umsPassword;
                passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
                
                // // console.log('✓ UMS page: User ID =', userIdInput.value);
                // // console.log('✓ UMS page: Password filled');
            } else {
                console.warn('Failed to find UMS input fields');
            }
            return;
        }
        
        // Check if this is the My Account Internet login page
        if (window.location.href.includes('myaccountinternet.lpu.in')) {
            let usernameInput = document.querySelector('#username');
            let passwordInput = document.querySelector('#password');
            let loginButton = document.querySelector('#Go');
            
            if (usernameInput && passwordInput && loginButton) {
                // Fill username as regNo@lpu.com
                usernameInput.value = data.regNo + '@lpu.com';
                usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
                usernameInput.dispatchEvent(new Event('change', { bubbles: true }));
                
                // Fill password
                passwordInput.value = data.internetPassword;
                passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
                passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
                
                // Submit the form
                setTimeout(() => {
                    loginButton.click();
                    console.log('My Account login form submitted');
                }, 50);
            } else {
                console.warn('Failed to find My Account login fields');
            }
            return;
        }
        
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
            // // console.log('Registration input found:', !!regNoInput);
            // // console.log('Password input found:', !!passwordInput);
            // // console.log('Login button found:', !!loginButton);
            return;
        }
        
        // Fill in the form
        regNoInput.value = data.regNo;
        regNoInput.dispatchEvent(new Event('input', { bubbles: true }));
        regNoInput.dispatchEvent(new Event('change', { bubbles: true }));
        
        passwordInput.value = data.internetPassword;
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
        }, 50);
        
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
