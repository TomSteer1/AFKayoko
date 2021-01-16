
document.getElementById("toggleChatButton").addEventListener("click", toggleChat);

function toggleChat(){
    chrome.tabs.executeScript({
        file: 'toggle.js'
    });
}