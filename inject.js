var s = document.createElement('script');
s.src = chrome.runtime.getURL('script.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

s = document.createElement('script');
s.src = chrome.runtime.getURL('cookie.js');
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);