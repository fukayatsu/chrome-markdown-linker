var REQUEST = null;
var CONTEXT = null;

function copy(text) {
  var clip = document.getElementById("clipboard_area");
  clip.value = text;
  clip.select();
  document.execCommand("copy");
}

(function () {
  var props = {
    //"title": chrome.i18n.getMessage('title'),
    "title": "Copy link with markdown-format",
    "contexts": ["image", "link", "page"],
    "onclick": function (info, tab) {
      var alt, text;
      if(REQUEST != null){
        alt = REQUEST.alt || "";
        text = REQUEST.text || "";
        REQUEST = null;
      }

      if(info.srcUrl != null){
        // image
        copy("![" + alt + "](" + info.srcUrl + ")");

      }else if(info.linkUrl != null){
        // text link
        //var text = info.selectionText || ""
        copy("[" + text + "](" + info.linkUrl + ")");

      }else{
        // page
        chrome.tabs.getSelected(null, function(tab){
          copy("[" + tab.title + "](" + info.pageUrl + ")")
        });
      }
    }
  }
  if(CONTEXT){
    chrome.contextMenus.update(CONTEXT, props);
  }else{
    CONTEXT = chrome.contextMenus.create(props);
  }
}());

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.method == "copyPage") {
      chrome.tabs.getSelected(null, function(tab){
        copy("[" + tab.title + "](" + tab.url + ")");
      });
    } else {
      REQUEST = request;
    }
  }
);