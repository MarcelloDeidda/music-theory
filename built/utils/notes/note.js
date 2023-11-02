"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notes_utils_js_1 = require("./notes-utils.js");
const rhythm_utils_js_1 = require("../rhythm/rhythm-utils.js");
const Note = class {
    // This object is initialised with a string containing Letter name,
    // Accidental and Octave number.
    constructor(note, value = "semibreve", dotted = false) {
        this.note = note;
        this.value = value;
        this.dotted = dotted;
    }
    getNote() {
        return this.note;
    }
    getNoteWithoutOctave() {
        return this.note.slice(0, this.note.length - 1);
    }
    getLetterName() {
        return this.note[0];
    }
    getOctave() {
        return parseInt(this.note.slice(this.note.length - 1));
    }
    getAccidental() {
        return this.note.length === 3 ? this.note[1] : null;
    }
    // This methods return an integer representing the alteration in semitones
    // E.g. # => 1, b => -1
    getAccidentalInSemitones() {
        let accidental = this.getAccidental();
        return accidental !== null ? notes_utils_js_1.accidentalsInSemitones[accidental] : 0;
    }
    getValue() {
        return `${this.dotted ? "dotted " : ""}${this.value}`;
    }
    getBeats() {
        let value = rhythm_utils_js_1.values[this.value];
        if (this.dotted) {
            value *= 1.5;
        }
        return value;
    }
};
exports.default = Note;
