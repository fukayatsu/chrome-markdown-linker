document.addEventListener("contextmenu", function (e) {
    var elem = e.srcElement;
    if (elem instanceof HTMLImageElement) {
        chrome.extension.sendRequest({
          alt: elem.alt
          //src: elem.src,
          //width: elem.width,
          //height: elem.height
        });
    }else{
      if(elem.href && elem.text){
        chrome.extension.sendRequest({
          text: elem.text
          //href: elem.href,
        });
      }
    }
}, true);