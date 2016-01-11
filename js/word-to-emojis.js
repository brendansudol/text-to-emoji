var emojis = require("emojilib");


function wordToEmojis() {
    var results = Object.create(null);

    for (var key in emojis) {
        var emoji = emojis[key];
        if (!emoji.char) continue;

        var words = [key].concat(emoji.keywords || []);
        words.forEach(function(word) {
            if (!results[word]) results[word] = [];
            results[word].push(emoji);
        });
    }

    return results;
}


module.exports = wordToEmojis()
