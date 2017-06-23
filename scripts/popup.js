document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("keypress", function(e) {
        if (e.which == 13) { // ENTER key
            document.getElementById("send").click();
        }
    });

    document.getElementById("send").addEventListener("click", function() {
        var regexp = document.getElementById("regex").value;
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
                file: "scripts/content.js"
            }, function() {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: "highlight",
                    regex: regexp
                });
            });
        });
    });

    document.getElementById("remove").addEventListener("click", function() {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, {
                file: "scripts/content.js"
            }, function() {
                chrome.tabs.sendMessage(tabs[0].id, {
                    type: "remove_highlights"
                });
            });
        });
    });

    chrome.runtime.onMessage.addListener(function(message) {
        if (message.from === 'content' && message.matches != 0) {
            document.getElementById('matches').innerHTML = 'Matches: ' + message.matches;
        }
    });
});
