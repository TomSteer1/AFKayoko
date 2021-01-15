function chat(message){
    sendButton = document.querySelector("[data-tooltip='Send message']");
    textBox = document.querySelector("[aria-label='Send a message to everyone']");
    textBox.value = message;
    textBox.dispatchEvent(new MouseEvent("input", { bubbles: true, cancelable: true, view: window }));
    sendButton.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
}

function getChat(){
    let chatList = document.querySelectorAll("[class='oIy2qc']");
    for(message in chatList){
        console.log(chatList[message].innerHTML);
    }
}

