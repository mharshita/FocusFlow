//*: This file handles the basic functionalities of the chrome extension

chrome.runtime.onInstalled.addListener(function () {
  // Redirect to index.html when the extension is installed or updated
  chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
});

chrome.action.onClicked.addListener(function (tab) {
  // Redirect to index.html when the extension icon is clicked
  chrome.tabs.create({ url: "index.html" });
});
