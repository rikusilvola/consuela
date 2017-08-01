function blockAction() {
  return {redirectUrl: chrome.runtime.getURL("no.html")};
}
function blockPages(sendResponse) {
  chrome.webRequest.onBeforeRequest.removeListener(blockAction);
  chrome.storage.sync.get({
    blockedPages: ''
  },
  function(items) {
    var response = {error:false};
    if (items.blockedPages.length <= 0) {
      sendResponse({});
      return;
    }
    chrome.webRequest.onBeforeRequest.addListener(
      blockAction,
      {urls: items.blockedPages},
      ["blocking"]);
      sendResponse({});
    }
  );
}
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.consuela == "updatedBlockedUrls") {
      blockPages(sendResponse);
    }
  }
);
blockPages(function(arg){});
