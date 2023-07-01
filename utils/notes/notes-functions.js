const { notes, accidentals } = require("./notes-utils");

const Note = require("./note");

// This function returns the white keys of a keyboard
module.exports.printKeyboard = () => {
    let keyboard = []

    for (let i = 0; i <= 8; i++) {
        for (let note of notes) {
            if (i == 0 && notes.slice(0, notes.indexOf("A")).includes(note)) { continue }

            keyboard.push(`${note}${i}`)
            if (note == "C" && i == 8) { break }
        }
    }

    return keyboard;
}

// This function sorts a list of notes
module.exports.sortNotes = (...noteList) => {
    const newNoteList = noteList.slice();
    newNoteList.sort((a, b) => {
        // Compare octaves
        if (a.getOctave() > b.getOctave()) {
            return 1
        } else if (b.getOctave() > a.getOctave()) {
            return -1
        } else {
            // Compare names
            if (notes.indexOf(a.getLetterName()) > notes.indexOf(b.getLetterName())) {
                return 1;
            } else if (notes.indexOf(a.getLetterName()) < notes.indexOf(b.getLetterName())) {
                return -1;
            } else {
                // Compare alterations
                if (a.getAccidentalInSemitones() > b.getAccidentalInSemitones()) {
                    return 1;
                } else if (a.getAccidentalInSemitones() < b.getAccidentalInSemitones()) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    });

    return newNoteList;
}

// This function checks that the second note is higher than the first
module.exports.isNoteHigher = (note1, note2) => {
    const sortedNotes = this.sortNotes(note1, note2);

    return note1.getNote() === sortedNotes[0].getNote();
}

// This function returns a random note
module.exports.getRandomNote = (lowOctave, highOctave) => {
    let octave = Math.floor(Math.random() * (highOctave - lowOctave + 1)) + lowOctave;
    let note = notes[Math.floor(Math.random() * 7)];
    let accidental = accidentals[Math.floor(Math.random() * 5)];

    return new Note(`${note}${accidental}${octave}`);
}

// This function returns a random note avoiding double accidentals
module.exports.getRandomNoteNoDouble = (lowOctave, highOctave) => {
    let octave = Math.floor(Math.random() * (highOctave - lowOctave + 1)) + lowOctave;
    let note = notes[Math.floor(Math.random() * 7)];
    let accidental = accidentals[Math.ceil(Math.random() * 3)];

    return new Note(`${note}${accidental}${octave}`);
}

// This function returns a random note avoiding accidentals
module.exports.getRandomNaturalNote = (lowOctave, highOctave) => {
    let octave = Math.floor(Math.random() * (highOctave - lowOctave + 1)) + lowOctave;
    let note = notes[Math.floor(Math.random() * 7)];

    return new Note(`${note}${octave}`);
}

// This function returns a random note from a scale (list of Note objects)
module.exports.getRandomNoteFromScale = scale => {
    let random = Math.floor(Math.random() * 8);

    return scale[random];
}