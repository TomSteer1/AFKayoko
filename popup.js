let on;
let checkEvery;
let unSortedCookies = document.cookie.split(";");
let sortedCookies = {};

document.getElementById("toggleChatButton").addEventListener("click", toggleChat);
document.getElementById("injectButton").addEventListener("click", inject);
function getCookie(domain, name,callback){
    chrome.cookies.getAll({"url": domain}, function(cookie) {
        callback(cookie);
    });
}

for(x in unSortedCookies){
    let cookie = unSortedCookies[x].split("=");
    console.log(sortedCookies);
    sortedCookies[cookie[0]] = cookie[1];
}
if(sortedCookies[" on"] != undefined){
    on = cookie["on"];
    alert(on);
}else{
    alert(sortedCookies[" on"]);
    chrome.cookies.set({ url: "https://meet.google.com/", name: "on", value: "false" });
}



function toggleChat(){
    chrome.tabs.executeScript({
        file: 'toggle.js'
    });
    chrome.runtime.getBackgroundPage(function (bg) {
        if(on){
            chrome.cookies.set({ url: "https://meet.google.com/", name: "on", value: "false" });
            chrome.browserAction.setIcon({
                path: "/img/icon-inactive16.png"
            });
        }else{
            chrome.cookies.set({ url: "https://meet.google.com/", name: "on", value: "true" });
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