let preparedText = null;

const clipboardWrite = () => {
  navigator.clipboard.writeText(preparedText).then(function() {
    /* clipboard successfully set */
    console.log('clipboard successfully set: ' + preparedText);
  }, function() {
    console.error('clipboard write failed');

    const textarea = document.createElement('textarea');
    textarea.value = preparedText;
    document.body.appendChild(textarea);
    textarea.select();
    const result = document.execCommand('copy');
    document.body.removeChild(textarea);
    console.log('fallback copy: ' + result);
  });
}

chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
  if (message.name === "execCopy") {
    clipboardWrite();

  } else if (message.name === "execCopyPage") {
    prepareCopyPage();
    clipboardWrite();
  }
});

const prepareCopy = (text) => {
  console.log('prepareCopy: ' + text);
  preparedText = text;
}

const prepareCopyPage = () => {
  prepareCopy(`[${document.title}](${document.location.href})`);
}

document.addEventListener("contextmenu", function (event) {
  const selection = window.getSelection();
  let linksInSelection = [];
  let text = null;
  const src  = event.target.src;
  const url  = event.target.href;

  if (selection.isCollapsed) {
    text = event.target.textContent || event.target.parentNode?.textContent
  } else {
    const clonedSelection = selection.getRangeAt(0).cloneContents();
    const div = document.createElement('div');
    div.appendChild(clonedSelection);
    linksInSelection = div.querySelectorAll('a[href]')
  }

  if (linksInSelection.length > 0) {
    links = [];
    linksInSelection.forEach((link) => {
      links.push({
        href: link.href,
        text: link.textContent,
        src:  link.querySelector('img')?.src
      });
    });

    let str = "";
    links.forEach((link) => {
      let text = link.text;
      if (link.src) { text = "![](" + link.src + ")" }
      str += "- [" + text +"](" + (link.href || '') + ")\n"
    });
    prepareCopy(str);
  } else if (text) {
    if (!url && !text && !src) {
      prepareCopyPage();
      return;
    }

    if (url && !src) {
      prepareCopy(`[${text}](${url})`);
      return;
    }

    text = "![](" + src + ")"
    if (url) {
      prepareCopy(`[${text}](${url})`);
    } else {
      prepareCopyPage();
    }
  } else if (event.target.src){
    text = "![](" + src + ")"
    prepareCopy(text);
  } else {
    prepareCopyPage();
  }
});
