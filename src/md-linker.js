function copy(text) {
  var clip = document.getElementById("clipboard_area");
  clip.value = text;
  clip.select();
  document.execCommand("copy");
}

function genericOnClick(info, tab) {
  console.log(info);

  if(info.srcUrl != null){
    // image
    // TODO get alt text
    copy("![" + "alt" + "](" + info.srcUrl + ")");

  }else if(info.linkUrl != null){
    // text link
    var text = info.selectionText || ""
    copy("[" + text + "](" + info.linkUrl + ")");

  }else{
    // page
    chrome.tabs.getSelected(null, function(tab){
      copy("[" + tab.title + "](" + info.pageUrl + ")")
    });

  }
}

var context = ["page","link","image","video",
                "audio"];
var title = "Copy link with markdown-format";
var id = chrome.contextMenus.create({"title": title, "contexts":context,
                                       "onclick": genericOnClick});

