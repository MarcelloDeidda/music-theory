module.exports.notes = ["C", "D", "E", "F", "G", "A", "B"];

module.exports.accidentals = ["B", "b", "", "#", "x"];

module.exports.chromaticScale = [
    ["B#", "C", "DB"],
    ["Bx", "C#", "Db"],
    ["Cx", "D", "EB"],
    ["D#", "Eb", "FB"],
    ["Dx", "E", "Fb"],
    ["E#", "F", "GB"],
    ["Ex", "F#", "Gb"],
    ["Fx", "G", "AB"],
    ["G#", "Ab"],
    ["Gx", "A", "BB"],
    ["A#", "Bb", "CB"],
    ["Ax", "B", "Cb"]
]

module.exports.printKeyboard = () => {
    let keyboard = []

    for (let i = 0; i <= 8; i++) {
        for (let note of this.notes) {
            if (i == 0 && this.notes.slice(0, this.notes.indexOf("A")).includes(note)) { continue }

            keyboard.push(`${note}${i}`)
            if (note == "C" && i == 8) { break }
        }
    }

    return keyboard;
}

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
            if (this.notes.indexOf(a.name) > this.notes.indexOf(b.name)) {
                return 1;
            } else if (this.notes.indexOf(a.name) < this.notes.indexOf(b.name)) {
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