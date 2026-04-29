document.getElementById('saveBtn').addEventListener('click', saveCredentials);

// Load saved credentials when popup opens
document.addEventListener('DOMContentLoaded', loadCredentials);

function saveCredentials() {
    const regNo = document.getElementById('regNo').value.trim();
    const password = document.getElementById('password').value.trim();
    const autoLogin = document.getElementById('autoLogin').checked;
    
    if (!regNo || !password) {
        showStatus('Please fill in all fields', 'error');
        return;
    }
    
    const data = {
        regNo: regNo,
        password: password,
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
    chrome.storage.sync.get(['regNo', 'password', 'autoLogin'], function(result) {
        if (result.regNo) {
            document.getElementById('regNo').value = result.regNo;
        }
        if (result.password) {
            document.getElementById('password').value = result.password;
        }
        if (result.autoLogin !== undefined) {
            document.getElementById('autoLogin').checked = result.autoLogin;
        }
    });
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
