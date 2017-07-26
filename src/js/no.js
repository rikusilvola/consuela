chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
      return {redirectUrl: chrome.runtime.getURL("no.html")}; 
  },
  {urls: pages},
  ["blocking"]);
