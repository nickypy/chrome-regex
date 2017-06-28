var current,
    results,
    currentIndex = 0;


chrome.runtime.onMessage.addListener(function (message) {
    if (message.type === 'highlight' && message.regex != '') {
        var re = new RegExp(message.regex, 'g'),
            context = document.querySelector("html"),
            instance = new Mark(context);
        instance.unmark();
        instance.markRegExp(re);
        // chrome.runtime.sendMessage({
        //     from:    'content'
        // });
        results = content.find('mark');
        currentIndex = 0;

        markCurrentAndJump();
    } else if (message.type === 'remove_highlights') {
        var context = document.querySelector("html"),
            instance = new Mark(context);
        instance.unmark();
    } else if (message.type === 'next') {
        currentIndex += 1;
        if (currentIndex < 0) {
            currentIndex = results.length - 1;
        }
        if (currentIndex > results.length - 1) {
            currentIndex = 0;
        }

        markCurrentAndJump();
    }
});

function markCurrentAndJump() {
    if (results.length) {
        var position,
        current = results.eq(currentIndex);
        results.removeClass(currentClass);
        if (current.length) {
            current.addClass(currentClass);
            position = current.offset().top - offsetTop;
            window.scrollTo(0, position);
        }
    }
}