window.addEventListener('keydown', function(event) {
  if (!(event.keyCode == 67 && event.metaKey && event.ctrlKey)) { return; }
  chrome.extension.sendMessage({ action: "copyPage" });
}, true);

document.addEventListener("contextmenu", function (event) {
  var selection = window.getSelection();
  var selectionText = selection.toString();

  var linksInSelection = 0;
  if (selection.rangeCount > 0) {
    var clonedSelection = selection.getRangeAt(0).cloneContents();
    var div = document.createElement('div');
    div.appendChild(clonedSelection);
    linksInSelection = $('a[href]', div);
  }

  if (linksInSelection.length > 0) {
    links = [];
    linksInSelection.each(function() {
      links.push({
        href: $(this).attr('href'),
        text: $(this).text(),
        src:  $(this).find('img').attr('src')
      });
    });
    chrome.extension.sendMessage({ action: "copySelection", links: links });
  } else {
    // var $elem = $(event.srcElement);
    // var text  = $elem.text();
    // var href  = $elem.attr('href') || $elem.parent('a[href]').attr('href')
    // var src   = $elem.attr('src')
    // chrome.extension.sendMessage({ action: "copyElement", href: href, text: text, src: src });
    chrome.extension.sendMessage({ action: "copyElement" });
  }
}, true);