function patternIsValid(str) {
  // modified from http://forums.devshed.com/javascript-development-115/regexp-match-url-pattern-493764.html
  // tests for this regex https://regex101.com/r/MIsZON/3/tests
  if (!/^(<all_urls>|((\*|(https?)):\/\/)((\*|(((\*|[a-z\d])([a-z\d-]*[a-z\d])*)\.)+(\*|([a-z]{2,})))|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/(\*|([-a-z\d%_.~+]*))))$/.test(str)) {
    return false;
  } else {
    return true;
  }
}
function save_options() {
  var status = document.getElementById('status');
  status.textContent = '';
  var blocked_urls = document.getElementById('1p').value;
  var pages = blocked_urls.split("\n");
  var pages_f = pages.filter(function(element) {
    return element.length > 0;
  });
  if (!pages_f.every(patternIsValid)) {
    status.textContent = "Invalid URL pattern."
    return;
  }
  chrome.storage.sync.set({
    blockedPages: pages_f
  }, function() {
    chrome.runtime.sendMessage({consuela: "updatedBlockedUrls"},
    function(response) {
      status.textContent = 'Options saved.';
    });
  });
}
function restore_options() {
  chrome.storage.sync.get({
    blockedPages: []
  }, function(items) {
    var pages = items.blockedPages.join("\n");
    document.getElementById('1p').value = pages;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);
