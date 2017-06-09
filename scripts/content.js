var currentHighlight = 0;
var matches = 0;
chrome.runtime.onMessage.addListener(function (message) {
    removeHighlights(document.body);
    if (message.type === 'highlight' && message.regex != '') {
        highlightWord(document.body, message.regex);
    } else if (message.type === 'remove_highlights') {
        removeHighlights(document.body);
    } else if (message.type === 'cycle') {
        if (currentHighlight > matches) {
            currentHighlight = 0;
        }
        cycleHighlight(document.body);
    }
});

function highlightWord(root, word) {
    var re = new RegExp(word, 'g');
    var numMatches = 0;
    matches = numMatches;
    textNodesUnder(root).forEach(highlightWords);
    chrome.runtime.sendMessage({
        from:    'content',
        numMatches: numMatches
    });

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

                if (numMatches === currentHighlight) {
                    span.className = 'current';
                    span.appendChild(highlighted);
                } else {
                    span.className = 'highlighted';
                    span.appendChild(highlighted);
                }
                after.parentNode.insertBefore(span, after);
                numMatches += 1;
            }
        }
    }
}

function removeHighlights(root) {
    [].forEach.call(root.querySelectorAll('span.highlighted, span.current'), function(el) {
        el.parentNode.replaceChild(el.firstChild, el);
    });
}

function cycleHighlight(root) {
    var span = root.querySelector('span.current')
    if (span != null) {
        span.className = 'highlighted';
    }
}