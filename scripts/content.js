chrome.runtime.onMessage.addListener(updateString);

function updateString(message) {
    removeHighlights(document.body);
    if (message.regex != '') {
        highlightWord(document.body, message.regex);
    }
}

function highlightWord(root, word) {
    var re = new RegExp(word, 'g');
    textNodesUnder(root).forEach(highlightWords);

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
            }
        }
    }
}

function removeHighlights(root) {
    [].forEach.call(root.querySelectorAll('span.highlighted'), function(el) {
        el.parentNode.replaceChild(el.firstChild, el);
    });
}