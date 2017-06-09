document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("send").addEventListener("click", popup);
    document.getElementById("remove").addEventListener("click", remove);
    document.getElementById("cycle").addEventListener("click", cycle);

    chrome.commands.onCommand.addListener(function(command) {
        console.log('onCommand event received for message: ', command);
    });

    chrome.runtime.onMessage.addListener(function (message) {
        if (msg.from === 'content' && msg.numMatches != 0) {
            document.getElementById('matches').innerHTML = 'Matches ' + message.numMatches;
        }
    });
});

function popup() {
    var regex = document.getElementById("regex").value;
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            file: "scripts/content.js"
        }, function() {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "highlight",
                regex: regex
            });
        });
    });
}

function remove() {
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
}

function cycle() {
    var regex = document.getElementById("regex").value;
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.executeScript(tabs[0].id, {
            file: "scripts/content.js"
        }, function() {
            chrome.tabs.sendMessage(tabs[0].id, {
                type: "cycle",
                regex: regex
            });
        });
    });
}

$('#text').on('input', function() {
    document.getElementById("send").click();
});

$(document).keypress(function(e) {
    if (e.which == 13) { // ENTER key
        document.getElementById("send").click();
    }
});
