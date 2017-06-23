
chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === 'highlight' && message.regex != '') {
        var re = new RegExp(message.regex, 'g'),
            context = document.querySelector("html"),
            instance = new Mark(context);
        instance.unmark();
        instance.markRegExp(re);
        chrome.runtime.sendMessage({
            from:    'content'
        });
    } else if (message.type === 'remove_highlights' || message.regex === '') {
        var context = document.querySelector("html"),
            instance = new Mark(context);
        instance.unmark();
    }
});