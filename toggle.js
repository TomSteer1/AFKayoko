var code = `toggle()`;

var script = document.createElement('script');
script.textContent = code;
(document.head||document.documentElement).appendChild(script);
script.remove();