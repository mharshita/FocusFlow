const URL = chrome.runtime.getURL("options.html");

//TODO: This needs to be fixed. Page getting redirected to invalid chrome extension page.
function redirectThePage() {
  window.location.replace(URL);
}

redirectThePage();
