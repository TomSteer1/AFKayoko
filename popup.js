let lastMessageID = 0;
let numberOfMessages = 0;
let last10Messages = []
let sent = true;

$(".CYZUZd").css("background-color","green");

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
            let message = document.querySelectorAll("[class='oIy2qc']")[messageID];
            last10Messages[count] = message.innerHTML;
            count ++
        }
        for(let i = 0;i<10;i++){
            count = countOccurrences(last10Messages,last10Messages[i]);
            console.log(last10Messages.length);
            console.log(`${last10Messages[i]} was said ${count} times`);
            if(count > 5 && last10Messages[i] != undefined){
                chat(last10Messages[i].toLowerCase());
                sent = true;
                break;
            }
        }
        lastMessageID = messageID;
    }
    console.log("Chat Checked");
}

window.addEventListener("keydown", function(event){
    if(event.key == "NumLock"){
        if(chatCheckLoop > 0) {
            clearInterval(chatCheckLoop);
            $(".CYZUZd").css("background-color","red");
            chatCheckLoop = 0;
        }else{
            chatCheckLoop = setInterval(getChat,1000);
            $(".CYZUZd").css("background-color","green");
        }
    }
});

let chatCheckLoop = setInterval(getChat,1000);
