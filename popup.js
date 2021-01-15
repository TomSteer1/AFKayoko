function chat(message){
    sendButton = document.querySelector("[data-tooltip='Send message']");
    textBox = document.querySelector("[aria-label='Send a message to everyone']");
    textBox.value = message;
    textBox.dispatchEvent(new MouseEvent("input", { bubbles: true, cancelable: true, view: window }));
    sendButton.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
}
'use strict';
// i copied this from the chrome extension samples, i am yet to work out all of it
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({number: 1}, function() {
    console.log('The number is set to 1.');
  });
});

function updateIcon() {
  chrome.storage.sync.get('number', function(data) {
    var current = data.number;
    chrome.browserAction.setIcon({path: 'icon' + current + '.png'});
    current++;
    if (current > 5)
      current = 1;
    chrome.storage.sync.set({number: current}, function() {
      console.log('The number is set to ' + current);
    });
  });
};

chrome.browserAction.onClicked.addListener(updateIcon);
updateIcon();