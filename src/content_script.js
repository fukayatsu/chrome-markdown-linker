window.addEventListener('keydown', function(event) {
  // Command + Ctrl + C
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
    chrome.extension.sendMessage({ action: "copyElement" });
  }
}, true);