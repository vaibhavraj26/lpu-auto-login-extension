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
        
        if (!lastLoginAttempt || (now - parseInt(lastLoginAttempt)) > 5000) {
            sessionStorage.setItem('lastAutoLoginAttempt', now.toString());
            
            // Shorter delay for faster filling
            const delay = window.location.href.includes('lpulive.lpu.in') ? 1500 : 500;
            setTimeout(() => {
                performLogin(result);
            }, delay);
        }
    }
});

function performLogin(data) {
    try {
        // Check if this is the UMS LPU page (new logic: fill ID/password, wait for checkbox, then submit)
        if (window.location.href.includes('ums.lpu.in')) {
            let userIdInput = document.querySelector('input[placeholder="User ID"]')
                || document.querySelector('input[name="txtU"]')
                || document.querySelector('#txtU');

            let passwordInput = document.querySelector('input[placeholder="Password"]')
                || document.querySelector('input[name="PWgb5D9PVhp6"]')
                || document.querySelector('#PWgb5D9PVhp6');

            // Fallback: fetch as first and second input in #form1 if not found
            if ((!userIdInput || !passwordInput) && document.querySelector('#form1')) {
                const formInputs = document.querySelectorAll('#form1 input[type="text"], #form1 input[type="password"]');
                if (formInputs.length >= 2) {
                    if (!userIdInput) userIdInput = formInputs[0];
                    if (!passwordInput) passwordInput = formInputs[1];
                }
            }

            if (userIdInput && passwordInput) {
                // Fill user ID and password directly (no events)
                userIdInput.value = data.regNo;
                passwordInput.value = data.umsPassword;

                // Wait for verification (cf-turnstile-response hidden input gets value)
                let loginButton = document.querySelector('button[type="submit"], input[type="submit"], button[name="X4bpcYjbJcn8yr73n4"], input[name="X4bpcYjbJcn8yr73n4"]');
                if (!loginButton) {
                    console.warn('UMS: Login button not found');
                    return;
                }
                const pollInterval = 500;
                const maxWait = 120000; // 2 minutes
                let waited = 0;
                const pollForVerification = setInterval(() => {
                    const cfInput = document.querySelector('input[name="cf-turnstile-response"]');
                    if (cfInput && cfInput.value && cfInput.value.length > 0) {
                        loginButton.click();
                        clearInterval(pollForVerification);
                        console.log('UMS: Verification complete (cf-turnstile-response filled), login submitted');
                    } else {
                        waited += pollInterval;
                        if (waited >= maxWait) {
                            clearInterval(pollForVerification);
                            console.warn('UMS: Verification not detected in time (cf-turnstile-response)');
                        }
                    }
                }, pollInterval);
            } else {
                console.warn('Failed to find UMS input fields');
            }
            return;
        }
        
        // Check if this is the LPULive login page
        if (window.location.href.includes('lpulive.lpu.in') && !window.location.href.includes('/api/')) {
            const userIdInput = document.querySelector('#registrationNumber');
            const passwordInput = document.querySelector('#password');
            const submitButton = document.querySelector('button[type="submit"]');

            if (userIdInput && data.regNo && userIdInput.value !== data.regNo) {
                userIdInput.value = data.regNo;
                userIdInput.dispatchEvent(new Event('input', { bubbles: true }));
                userIdInput.dispatchEvent(new Event('change', { bubbles: true }));
            }

            if (passwordInput && data.umsPassword && passwordInput.value !== data.umsPassword) {
                passwordInput.value = data.umsPassword;
                passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
                passwordInput.dispatchEvent(new Event('change', { bubbles: true }));
            }

            if (!submitButton) {
                console.warn('LPULive: Submit button not found');
                return;
            }

            // Wait for verification (cf-turnstile-response hidden input gets value)
            const pollInterval = 500;
            const maxWait = 120000; // 2 minutes
            let waited = 0;
            const pollForVerification = setInterval(() => {
                const cfInput = document.querySelector('input[name="cf-turnstile-response"]');
                if (cfInput && cfInput.value && cfInput.value.length > 0) {
                    submitButton.click();
                    clearInterval(pollForVerification);
                    console.log('LPULive: Verification complete (cf-turnstile-response filled), login submitted');
                } else {
                    waited += pollInterval;
                    if (waited >= maxWait) {
                        clearInterval(pollForVerification);
                        console.warn('LPULive: Verification not detected in time (cf-turnstile-response)');
                    }
                }
            }, pollInterval);
            return;
        }

        // Check if this is the Internet portal login page
        if (window.location.href.includes('internet.lpu.in') || window.location.href.includes('10.10.0.1')) {
            let usernameInput = document.querySelector('input[name="username"]');
            let passwordInput = document.querySelector('input[name="password"]');
            let checkbox = document.querySelector('input[id="agreepolicy"]') || document.querySelector('input[type="checkbox"]');
            let loginButton = document.querySelector('#loginbtn');

            if (usernameInput && passwordInput && loginButton) {
                usernameInput.value = data.regNo;
                usernameInput.dispatchEvent(new Event('input', { bubbles: true }));
                usernameInput.dispatchEvent(new Event('change', { bubbles: true }));

                passwordInput.value = data.internetPassword;
                passwordInput.dispatchEvent(new Event('input', { bubbles: true }));
                passwordInput.dispatchEvent(new Event('change', { bubbles: true }));

                if (checkbox && !checkbox.checked) {
                    checkbox.click();
                    checkbox.dispatchEvent(new Event('change', { bubbles: true }));
                }

                setTimeout(() => {
                    loginButton.click();
                    console.log('Internet portal login form submitted');
                }, 50);
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
        
    } catch (error) {
        console.error('Error during auto-login:', error);
    }
}
