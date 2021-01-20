let on;
let checkEvery;
let matchCount;
let highlighting;
let sortedCookies = {};

document.getElementById("toggleChatButton").addEventListener("click", toggleChat);
document.getElementById("injectButton").addEventListener("click", inject);
document.getElementById("checkEvery").oninput = function(){
    document.getElementById("checkEveryCount").innerHTML = this.value;
    chrome.cookies.set({ url: "https://meet.google.com/", name: "checkEvery", value: this.value.toString() });
}
document.getElementById("matchCount").oninput = function(){
    document.getElementById("matchCountCount").innerHTML = this.value;
    chrome.cookies.set({ url: "https://meet.google.com/", name: "matchCount", value: this.value.toString() });
}

document.getElementById("highlighting").oninput = function(){
    chrome.cookies.set({ url: "https://meet.google.com/", name: "highlighting", value: this.checked.toString() });
}


function getCookie(domain,callback){
    chrome.cookies.getAll({"url": domain}, function(cookie) {
        callback(cookie);
    });
}
function updateCookies(){
    chrome.cookies.getAll({url: "https://meet.google.com/"},function(allCookies){
        for(x in allCookies){
            let cookie = allCookies[x];
            sortedCookies[cookie["name"]] = cookie["value"];
        }

        // Checks for on cookie and if not present sets up to default value
        console.log(sortedCookies["on"]);
        if(sortedCookies["on"] != undefined){
            on = sortedCookies["on"];
        }else{
            chrome.cookies.set({ url: "https://meet.google.com/", name: "on", value: "false" });
        }
        if(sortedCookies["checkEvery"] != undefined){
            checkEvery = sortedCookies["checkEvery"];
        }else{
            chrome.cookies.set({ url: "https://meet.google.com/", name: "checkEvery", value: "10" });
        }
        if(sortedCookies["highlighting"] != undefined){
            highlighting = sortedCookies["highlighting"];
            console.log(highlighting);
        }else{
            chrome.cookies.set({ url: "https://meet.google.com/", name: "highlighting", value: "false" });
        }
        if(sortedCookies["matchCount"] != undefined){
            matchCount = sortedCookies["matchCount"];
        }else{
            chrome.cookies.set({ url: "https://meet.google.com/", name: "matchCount", value: "6" });
        }

        document.getElementById("checkEvery").value = checkEvery;
        document.getElementById("checkEveryCount").innerHTML = checkEvery;
        document.getElementById("matchCount").value = matchCount;
        document.getElementById("matchCountCount").innerHTML = matchCount;
        document.getElementById("matchCountCount").value = matchCount;
        if(highlighting == "false"){
            document.getElementById("highlighting").checked = false;
        }else{
            document.getElementById("highlighting").checked = true;
        }
        if(on == "true"){
            console.log(on);
            chrome.browserAction.setIcon({
                path: "/img/icon-autopilot16.png"
            });
        }else if(on == "false"){
            console.log(on);
            chrome.browserAction.setIcon({
                path: "/img/icon-inactive16.png"
            });
        }

    });
}


function toggleChat(){
    chrome.tabs.executeScript({
        file: 'toggle.js'
    });
    if(on == "true"){
        on = "false";
        chrome.browserAction.setIcon({
            path: "/img/icon-inactive16.png"
        });
    }else{
        on = "true";
        chrome.browserAction.setIcon({
            path: "/img/icon-autopilot16.png"
        });
    }
}

function inject(){
    chrome.cookies.set({ url: "https://meet.google.com/", name: "on", value: "false" });
    chrome.tabs.executeScript({
        file: 'inject.js'
    });
    chrome.browserAction.setIcon({
        path: "/img/icon-inactive16.png"
    });
}

updateCookies();