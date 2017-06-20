
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

// TODO   function freezes page for large pages and numerous matches
// BUG    clearing highlights remoes words
// MAYBE  migrate to mark.js
function highlightWord(root, word) {
    var re = new RegExp(word, 'g');
    var numMatches = 0;

    textNodesUnder(root).forEach(highlightWords);
    return numMatches;

    function textNodesUnder(root) {
        var walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false),
            text = [],
            node;
        while (node = walk.nextNode()) text.push(node);
        return text;
    }

    function highlightWords(n) {
        var match = re.exec(n.nodeValue);
        if (match != null) {
            for (var i; (i = n.nodeValue.indexOf(match[0], match.index)) > -1; n = after) {
                var after = n.splitText(i + match[0].length);
                var highlighted = n.splitText(i);
                var span = document.createElement('span');
                span.className = 'highlighted';
                span.appendChild(highlighted);
                after.parentNode.insertBefore(span, after);
                numMatches += 1;
            }
        }
    }
}

function removeHighlights(root) {
    [].forEach.call(root.querySelectorAll('span.highlighted'), function(el) {
        el.parentNode.replaceChild(el.firstChild, el);
    });
}