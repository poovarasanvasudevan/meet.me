const matchUrl = [
    "*://localhost/*"
]


chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
});


chrome.webRequest.onBeforeRequest.addListener(function (details) {
    chrome.tabs.query({ active: true }, function (tabs) {
        tabId = tabs[0].id;

        chrome.tabs.setZoom(tabId, 0.90 ,function (zoomFactor) {
            console.log(zoomFactor); //or alert(zoomFactor);
        });
    });
}, {
    urls: matchUrl
}, []);
