const { accidentalsInSemitones } = require("./notes-utils");

const Note = class {
    #note;

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

    getAccidentalInSemitones() {
        let accidental = this.getAccidental();
        return accidental !== null ? accidentalsInSemitones[accidental] : 0;
    }
}

module.exports = Note;