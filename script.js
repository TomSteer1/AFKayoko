let lastMessageID = 0;
let numberOfMessages = 0;
let last10Messages = [];
let sent = true;
let on = false;
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
    let chatList = document.querySelectorAll("[class='oIy2qc']");
    numberOfMessages = chatList.length-1;
    if(numberOfMessages > lastMessageID + 10 || !sent){;
        sent = false;
        let messageID = numberOfMessages - 9;
        if(messageID < 1)messageID = 1;
        let count = 0;
        for(messageID; messageID <= numberOfMessages ;messageID++){
            let message = chatList[messageID];
            message.style.backgroundColor = "pink";
            last10Messages[count] = message.innerHTML;
            count ++
        }
        for(let i = 0;i<10;i++){
            count = countOccurrences(last10Messages,last10Messages[i]);
            console.log(last10Messages.length);
            console.log(`${last10Messages[i]} was said ${count} times`);
            if(count > 5 && last10Messages[i] != undefined){
                sent = true;
                if(last10Messages[i].toLowerCase().includes("yes") || last10Messages[i].toLowerCase().includes("no")){
                    if(last10Messages[9].toLowerCase().includes("yes") || last10Messages[i].toLowerCase().includes("yes")){
                        chat("yes");
                        lastMessage = "yes";
                    }else if(last10Messages[9].toLowerCase().includes("no") || last10Messages[i].toLowerCase().includes("no")){
                        chat("no");
                        lastMessage = "no";
                    }
                }else if(last10Messages[i] != lastMessage){
                    lastMessage = last10Messages[i];
                    chat(last10Messages[i].toLowerCase());
                }
                console.log(lastMessage);
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
        on = false;
        chatCheckLoop = 0;
    }else{
        let chatList = document.querySelectorAll("[class='oIy2qc']");
        lastMessageID = chatList.length-1;
        on = true;
        chatCheckLoop = setInterval(getChat,1000);
        document.getElementsByClassName("CYZUZd")[0].style.backgroundColor = "green";
    }
}

document.getElementsByClassName("CYZUZd")[0].style.backgroundColor = "red";
let chatCheckLoop = setInterval(getChat,1000);
clearInterval(chatCheckLoop);