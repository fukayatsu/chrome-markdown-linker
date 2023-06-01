(() => {
  chrome.action.onClicked.addListener(
    
  )
  chrome.runtime.sendMessage({ action: "copyPage" });

  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(`************* request: ${JSON.stringify(request)}`)

      if (request.greeting === "hello"){
        var dark = JSON.stringify(request.greeting)
        console.log(`************* request.greeting: ${request.greeting}`)
        document.getElementById('clipboard_area').textContent = dark
      }



    }
  );
  
})()

// window.addEventListener('keydown', function(event) {
//   // Command + Ctrl + C
//   if (!(event.keyCode == 67 && event.metaKey && event.ctrlKey)) { return; }
//   chrome.runtime.sendMessage({ action: "copyPage" });
// }, true);

// console.log(`***************: CMD + CRTL + C is pressed`)

// document.addEventListener("contextmenu", function (event) {
//   var selection = window.getSelection();

//   var linksInSelection = 0;
//   var text;
//   if (selection.rangeCount == 0) {
//     console.log(`***************: ${selection.rangeCount} is ZERO`)
//     text = $(event.target).text() || $(event.target).parent().text()
//   } else {
//     console.log(`***************: ${selection.rangeCount}`)
//     var clonedSelection = selection.getRangeAt(0).cloneContents();
//     var div = document.createElement('div');
//     div.appendChild(clonedSelection);
//     linksInSelection = $('a[href]', div);
//   }

//   if (linksInSelection.length > 0) {
//     console.log(`***************LinksInSelection: ${linksInSelection.length}`)

//     links = [];
//     linksInSelection.each(function() {
//       links.push({
//         href: $(this).prop('href'),
//         text: $(this).text(),
//         src:  $(this).find('img').attr('src')
//       });
//     });
//     chrome.runtime.sendMessage({ action: "copySelection", links: links });
//   } else {
//     chrome.runtime.sendMessage({ action: "copyElement", text: text });
//   }
// }, true);