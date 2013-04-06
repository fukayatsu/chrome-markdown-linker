window.addEventListener('keydown', shortcut, true);

function shortcut(e) {
  if (e.keyCode != 67) { return; }
  if (!e.metaKey || !e.ctrlKey) { return; }

  chrome.extension.sendMessage({
    method: "copyPage"
  });
}


document.addEventListener("contextmenu", function (e) {
    var elem = e.srcElement;
    if (elem instanceof HTMLImageElement) {
        chrome.extension.sendMessage({
          method: "copyImage",
          alt: elem.alt
          //src: elem.src,
          //width: elem.width,
          //height: elem.height
        });
    } else {
      chrome.extension.sendMessage({
        method: "copyLink",
        text: $(elem).text()
        //href: elem.href,
      });
    }
}, true);