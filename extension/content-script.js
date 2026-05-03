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
        
        // Check if this is the LPULive login page
        if (window.location.href.includes('lpulive.lpu.in') && !window.location.href.includes('/api/')) {
            const fillAndSubmitWhenEnabled = () => {
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

                // if (!submitButton) {
                //     return;
                // }

                const isEnabled = submitButton.disabled === false && !submitButton.hasAttribute('disabled');
                if (isEnabled) {
                    submitButton.click();
                    console.log('LPULive login form submitted');
                    clearInterval(submitWatcher);
                }
            };

            const submitWatcher = setInterval(fillAndSubmitWhenEnabled, 300);
            setTimeout(() => {
                clearInterval(submitWatcher);
                console.log('LPULive submit watcher stopped after 2 minutes');
            }, 120000);
            fillAndSubmitWhenEnabled();
            return;
        }

        // Check if this is the Internet portal login page
        if (window.location.href.includes('internet.lpu.in/24online/') ||
            window.location.href.includes('10.10.0.1/24online/')) {
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
        
    } catch (error) {
        console.error('Error during auto-login:', error);
    }
}
