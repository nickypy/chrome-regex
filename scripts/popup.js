
chrome.commands.onCommand.addListener(function(command) {
  console.log('onCommand event received for message: ', command);
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
                regex: regex
            });
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("send").addEventListener("click", popup);

});

$('#text').on('input', function() {
    document.getElementById("send").click();
});

$(document).keypress(function(e) {
    if(e.which == 13) { // ENTER key
        document.getElementById("send").click();
    }
});

$('send').on('click', function() {
    $(this).prop('disabled', true);
    setTheme('regexpal')
});

$("#idContentEditable").keypress(function(e) {
    return e.which != 13;
});