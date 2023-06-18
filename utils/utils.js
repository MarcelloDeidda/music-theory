const { notes } = require("./scales");

module.exports.sortNotes = (...noteList) => {
    const newNoteList = noteList.slice();
    newNoteList.sort((a, b) => {
        // Compare octaves
        if (a.octave > b.octave) {
            return 1
        } else if (b.octave > a.octave) {
            return -1
        } else {
            // Compare names
            if (notes.indexOf(a.name) > notes.indexOf(b.name)) {
                return 1;
            } else if (notes.indexOf(a.name) < notes.indexOf(b.name)) {
                return -1;
            } else {
                // Compare alterations
                if (a.alterationInSemitones > b.alterationInSemitones) {
                    return 1;
                } else if (a.alterationInSemitones < b.alterationInSemitones) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    });

    return newNoteList;
}