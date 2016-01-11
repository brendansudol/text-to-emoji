var NON_CHARS = '!"#$%&\'()*+,-./:;<=>?@[]^_`{|}~';


function parseWord(word_in) {
    var pre = '';
    var post = '';
    var word = word_in;

    word = word.trim().toLowerCase();

    while (NON_CHARS.indexOf(word[0]) > -1) {
        pre += word[0];
        word = word.slice(1, word.length);
    }

    while (NON_CHARS.indexOf(word[word.length - 1]) > -1) {
        post += word[word.length - 1];
        word = word.slice(0, word.length - 1);
    }

    return {
        orig: word_in,
        clean: word,
        pre: pre,
        post: post,
        extra: (pre + post).length > 0
    }
}


module.exports = parseWord
