
document.getElementById("toggleChatButton").addEventListener("click", toggleChat);
document.getElementById("injectButton").addEventListener("click", inject);

function toggleChat(){
    chrome.tabs.executeScript({
        file: 'toggle.js'
    });
    chrome.runtime.getBackgroundPage(function (bg) {
        if(bg.on){
            bg.on = false;
            chrome.browserAction.setIcon({
                path: "/img/icon-inactive16.png"
            });
        }else{
            bg.on = true;
            chrome.browserAction.setIcon({
                path: "/img/icon-autopilot16.png"
            });
        }
    });
}

function inject(){
    chrome.tabs.executeScript({
        file: 'inject.js'
    });
    chrome.browserAction.setIcon({
        path: "/img/icon-inactive16.png"
    });
}