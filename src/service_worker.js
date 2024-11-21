const clipboardWrite = () => {
  chrome.tabs.query({ 'active': true, 'currentWindow': true }, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, { name: "execCopy" })
  });
}

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.sendMessage(tab.id, { name: "execCopyPage" })
});

// chrome.runtime.onInstalled.addListener(async () => {
  chrome.contextMenus.create({
    id: "copy-link-with-markdown",
    title: "Copy link with markdown-format",
    contexts: ["image", "link", "page", "selection"],
  });

  chrome.contextMenus.onClicked.addListener((info, tab) => {
    clipboardWrite();
  });
// });
