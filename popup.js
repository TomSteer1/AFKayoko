
document.getElementById("toggleChatButton").addEventListener("click", toggleChat);
document.getElementById("injectButton").addEventListener("click", inject);

function toggleChat(){
    chrome.tabs.executeScript({
        file: 'toggle.js'
    });
}

function inject(){
    chrome.tabs.executeScript({
        file: 'inject.js'
    });
}