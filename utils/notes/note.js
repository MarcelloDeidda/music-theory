const { accidentalsInSemitones } = require("./notes-utils");

const Note = class {
    #note;

    // This object is initialised with a string containing Letter name,
    // Accidental and Octave number.
    constructor(note) {
        this.#note = note;
    }

    getNote() {
        return this.#note;
    }

    getNoteWithoutOctave() {
        return this.#note.slice(0, this.#note.length - 1);
    }

    getLetterName() {
        return this.#note[0];
    }

    getOctave() {
        return this.#note.slice(this.#note.length - 1);
    }

    getAccidental() {
        return this.#note.length === 3 ? this.#note[1] : null;
    }

    // This methods return an integer representing the alteration in semitones
    // E.g. # => 1, b => -1
    getAccidentalInSemitones() {
        let accidental = this.getAccidental();
        return accidental !== null ? accidentalsInSemitones[accidental] : 0;
    }
}

module.exports = Note;