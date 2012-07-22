function copy(text) {
  var clip = document.getElementById("clipboard_area");
  clip.value = text;
  clip.select();
  document.execCommand("copy");
}

function genericOnClick(info, tab) {
  console.log(info);

  if(info.linkUrl == null){
    // page
    chrome.tabs.getSelected(null, function(tab){
      copy("[" + tab.title + "](" + info.pageUrl + ")")
    });
  }else if(info.mediaType != null && info.mediaType == 'image'){
    // image
    copy("![" + "" + "](" + info.linkUrl + ")");
  }else{
    // text link
    copy("[" + info.selectionText + "](" + info.linkUrl + ")");
  }
}

var context = ["page","link","image","video",
                "audio"];
var title = "Copy link with markdown-format";
var id = chrome.contextMenus.create({"title": title, "contexts":context,
                                       "onclick": genericOnClick});

