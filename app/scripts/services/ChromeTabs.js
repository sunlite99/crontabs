angular.module("crontabs").factory("ChromeTabs", function() {
    return {
        create: chrome.tabs.create,
        get: chrome.tabs.get,
        remove: chrome.tabs.remove,
        reload: chrome.tabs.reload,
        update: chrome.tabs.update,
        query: chrome.tabs.query,
        onRemoved: function(callback) {
            chrome.tabs.onRemoved.addListener(callback);
        }
    }
});