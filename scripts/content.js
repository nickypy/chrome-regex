document.onload = function() {
    var markjs = document.createElement("script");
    markjs.src = "mark.min.js";

    var jquery = document.createElement("script");
    jquery.src = "jquery-3.2.1.min.js";

    var style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "../styles/content.css";

    document.body.appendChild(markjs);
    document.body.appendChild(styles);
    document.body.appendChild(jquery);
};

var context = document.querySelector("body"),
    instance = new Mark(context),
    currentClass = "current",
    currentIndex = 0,
    results;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.type === "highlight" && message.regex != "") {
        let re = new RegExp(message.regex, "g");
        instance.unmark();
        instance.markRegExp(re);
        results = document.querySelectorAll("mark");
        currentIndex = 0;
        jumpTo();
    } else if (message.type === "remove_highlights") {
        instance.unmark();
    } else if (message.type === "next") {
        if (results.length) {
            results[currentIndex].classList.remove("current");
            currentIndex += 1;
            currentIndex = currentIndex % results.length;
        }
        jumpTo();
    }
});

function jumpTo() {
    if (results.length) {
        var position,
            current = results[currentIndex];
        current.classList.add("current");
        position = current.offsetTop;
        window.scrollTo(0, position);
    }
}
