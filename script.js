function getCookie(request){
    let documentCookies = document.cookie;
    let splitCookies = documentCookies.split("; ");
    for(x in splitCookies){
        let cookie = splitCookies[x].split("=");
        if(cookie[0] == request){
            return cookie[1];
        }
    }
}

// Failed attempt at a set cookie function
// Would like to come back to it later and fix it
// I couldnt get the document.cookie to set to newCookies even tho newCookies was 

// function setCookie(name,value){
//     let documentCookies = document.cookie;
//     let splitCookies = documentCookies.split("; ");
//     for(x in splitCookies){
//         let cookie = splitCookies[x].split("=");
//         if(cookie[0] == name){
//             cookie[1] = value;
//         }
//         splitCookies[x] = cookie.join("=");
//     }
//     let newCookies = splitCookies.join("; ");
//     document.cookie = newCookies;
// }



let lastMessageID = 0;
let numberOfMessages = 0;
let last10Messages = [];
let sent = true;
let on = false;
let checkEvery = 10
let numberOfMatches = 6;
let lastMessage = "";



function countOccurrences (arr, val){
    let count = 0;
    for(let i = 0; i < arr.length ; i++){
        let value = val.toUpperCase();
        let arrayValue = arr[i].toUpperCase();
        if(arrayValue == value)count++;
    }
    return count;
}

function chat(message){
    sendButton = document.querySelector("[data-tooltip='Send message']");
    textBox = document.querySelector("[aria-label='Send a message to everyone']");
    textBox.value = message;
    textBox.dispatchEvent(new MouseEvent("input", { bubbles: true, cancelable: true, view: window }));
    sendButton.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
}

function getChat(){
    checkEvery = parseInt(getCookie("checkEvery"));
    matchCount = parseInt(getCookie("matchCount"));
    last10Messages = [];
    let chatList = document.querySelectorAll("[class='oIy2qc']");
    numberOfMessages = chatList.length-1;
    if(numberOfMessages >= lastMessageID + checkEvery || !sent){;
        sent = false;
        let messageID = numberOfMessages - checkEvery - 1;
        if(messageID < 1)messageID = 1;
        let count = 0;
        for(messageID; messageID <= numberOfMessages ;messageID++){
            let message = chatList[messageID];
            if(getCookie("highlighting") == "true") message.style.backgroundColor = "pink";
            last10Messages[count] = message.innerHTML;
            count ++
        }
        for(let i = 0;i<checkEvery;i++){
            count = countOccurrences(last10Messages,last10Messages[i]);
            console.log(`${last10Messages[i]} was said ${count} times`);
            if(count >= matchCount && last10Messages[i] != undefined){
                if(last10Messages[i].toLowerCase().includes("yes") || last10Messages[i].toLowerCase().includes("no")){
                    if(last10Messages[last10Messages.length-1].toLowerCase().includes("yes") || last10Messages[i].toLowerCase().includes("yes")){
                        chat("yes");
                        lastMessage = "yes";
                        sent = true;
                    }else if(last10Messages[last10Messages.length-1].toLowerCase().includes("no") || last10Messages[i].toLowerCase().includes("no")){
                        chat("no");
                        lastMessage = "no";
                        sent = true;
                    }
                }else if(last10Messages[i] != lastMessage){
                    lastMessage = last10Messages[i];
                    chat(last10Messages[i].toLowerCase());
                    sent = true;
                }else{
                    sent = true;
                }
                break;
            }
        }
        lastMessageID = messageID;
    }
    console.log("Chat Checked");
}

function toggle(){
    if(on){
        clearInterval(chatCheckLoop);
        document.getElementsByClassName("CYZUZd")[0].style.backgroundColor = "red";
        Cookies.set("on","false");
        on = false;
        chatCheckLoop = 0;
    }else{
        let chatList = document.querySelectorAll("[class='oIy2qc']");
        lastMessageID = chatList.length-1;
        on = true;
        Cookies.set("on","true");
        chatCheckLoop = setInterval(getChat,1000);
        document.getElementsByClassName("CYZUZd")[0].style.backgroundColor = "green";
    }
}

document.getElementsByClassName("CYZUZd")[0].style.backgroundColor = "red";
let chatCheckLoop = setInterval(getChat,1000);
clearInterval(chatCheckLoop);