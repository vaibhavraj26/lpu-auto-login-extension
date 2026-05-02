document.getElementById('saveBtn').addEventListener('click', saveCredentials);
document.getElementById('samePassword').addEventListener('change', toggleUmsPasswordField);
document.getElementById('umsToggle').addEventListener('mousedown', () => togglePasswordVisibility('umsPassword', true));
document.getElementById('umsToggle').addEventListener('mouseup', () => togglePasswordVisibility('umsPassword', false));
document.getElementById('umsToggle').addEventListener('mouseleave', () => togglePasswordVisibility('umsPassword', false));
document.getElementById('internetToggle').addEventListener('mousedown', () => togglePasswordVisibility('internetPassword', true));
document.getElementById('internetToggle').addEventListener('mouseup', () => togglePasswordVisibility('internetPassword', false));
document.getElementById('internetToggle').addEventListener('mouseleave', () => togglePasswordVisibility('internetPassword', false));

// Load saved credentials when popup opens
document.addEventListener('DOMContentLoaded', loadCredentials);

function saveCredentials() {
    const regNo = document.getElementById('regNo').value.trim();
    const umsPassword = document.getElementById('umsPassword').value.trim();
    const samePassword = document.getElementById('samePassword').checked;
    const autoLogin = document.getElementById('autoLogin').checked;
    
    if (!regNo || !umsPassword) {
        showStatus('Please fill in all fields', 'error');
        return;
    }
    
    let internetPassword = umsPassword;
    if (!samePassword) {
        internetPassword = document.getElementById('internetPassword').value.trim();
        if (!internetPassword) {
            showStatus('Please fill in all fields', 'error');
            return;
        }
    }
    
    const data = {
        regNo: regNo,
        internetPassword: internetPassword,
        umsPassword: umsPassword,
        autoLogin: autoLogin
    };
    
    chrome.storage.sync.set(data, function() {
        showStatus('✓ Credentials saved!', 'success');
        
        // Trigger auto-login on the current tab if it's the login page
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (tabs[0].url.includes('internet.lpu.in')) {
                setTimeout(() => {
                    chrome.tabs.sendMessage(tabs[0].id, {action: 'autoLogin', data: data});
                }, 500);
            }
        });
    });
}

function loadCredentials() {
    chrome.storage.sync.get(['regNo', 'internetPassword', 'umsPassword', 'autoLogin'], function(result) {
        if (result.regNo) {
            document.getElementById('regNo').value = result.regNo;
        }
        if (result.umsPassword) {
            document.getElementById('umsPassword').value = result.umsPassword;
        }
        
        // Check if both passwords are the same
        const samePassword = result.internetPassword === result.umsPassword;
        document.getElementById('samePassword').checked = samePassword;
        
        if (result.internetPassword && !samePassword) {
            document.getElementById('internetPassword').value = result.internetPassword;
        }
        
        if (result.autoLogin !== undefined) {
            document.getElementById('autoLogin').checked = result.autoLogin;
        }
        
        // Update UI based on checkbox state
        updateInternetPasswordVisibility();
    });
}

function toggleUmsPasswordField() {
    updateInternetPasswordVisibility();
}

function updateInternetPasswordVisibility() {
    const samePassword = document.getElementById('samePassword').checked;
    const internetPasswordGroup = document.getElementById('internetPasswordGroup');
    const internetPasswordInput = document.getElementById('internetPassword');
    
    if (samePassword) {
        internetPasswordGroup.style.display = 'none';
        internetPasswordInput.value = '';
    } else {
        internetPasswordGroup.style.display = 'block';
    }
}

function togglePasswordVisibility(fieldId, show) {
    const input = document.getElementById(fieldId);
    if (show) {
        input.type = 'text';
    } else {
        input.type = 'password';
    }
}

function showStatus(message, type) {
    const statusEl = document.getElementById('status');
    statusEl.textContent = message;
    statusEl.className = type;
    
    if (type === 'success') {
        setTimeout(() => {
            statusEl.style.display = 'none';
        }, 3000);
    }
}
