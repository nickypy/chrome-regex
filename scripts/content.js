
chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === 'highlight' && message.regex != '') {
        console.log(message.regex);
        let num = highlightWord(document.body, message.regex);
        chrome.runtime.sendMessage({
            from:    'content',
            matches: num
        });
    } else if (message.type === 'remove_highlights') {
        removeHighlights(document.body);
    }
});

function highlightWord(root, word) {
    var re = new RegExp(word, 'g');
    var numMatches = 0;


}

function removeHighlights(root) {

}