chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === 'highlight' && message.regex != '') {
        var re = new RegExp(message.regex, 'g'),
            context = document.querySelector("body"),
            instance = new Mark(context);
        instance.unmark();
        instance.markRegExp(re);
    } else if (message.type === 'remove_highlights') {
        var context = document.querySelector('body'),
            instance = new Mark(context);
        instance.unmark();
    }
});