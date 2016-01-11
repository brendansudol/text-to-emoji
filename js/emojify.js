import parseWord from "./word-parse.js";
import emojis from "./word-to-emojis.js";


function getEmoji(word) {
    var len = word.length;

    if (!word || word === '' || len < 2) return '';

    // try (naive) singular derivation
    var singular = len > 2 && word.endsWith('s') ? word.slice(0, len - 1) : '';

    // get matches and return first one
    var matches = emojis[word] || emojis[singular];
    return matches ? matches[0].char : '';
};


function emojifyText(text) {
    var lines = text.split('\n'),
        lines_translated = [];

    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (line == '') continue;

        var words = line.split(' '),
            words_translated = [];

        for (var j = 0; j < words.length; j++) {
            var word = parseWord(words[j]),
                emoji = getEmoji(word.clean);

            var result;
            if (emoji === '') result = word.orig;
            else result = word.pre + emoji + word.post;

            words_translated.push(result)
        }

        lines_translated.push(words_translated.join(' '));
    }

    return lines_translated.join('\n');
}


module.exports = emojifyText
