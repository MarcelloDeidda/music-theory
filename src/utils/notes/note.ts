import { accidentalsInSemitones } from "./notes-utils.js";
import { values } from "../rhythm/rhythm-utils.js";
import { NoteInterface } from "../../ts/interfaces/interfaces.js";

const Note = class implements NoteInterface {
    // This object is initialised with a string containing Letter name,
    // Accidental and Octave number.
    constructor(
        private note: string,
        private value: string = "semibreve",
        private dotted: boolean = false) {
    }

    getNote(): string {
        return this.note;
    }

    getNoteWithoutOctave(): string {
        return this.note.slice(0, this.note.length - 1);
    }

    getLetterName(): string {
        return this.note[0];
    }

    getOctave(): number {
        return parseInt(this.note.slice(this.note.length - 1));
    }

    getAccidental(): string | null {
        return this.note.length === 3 ? this.note[1] : null;
    }

    // This methods return an integer representing the alteration in semitones
    // E.g. # => 1, b => -1
    getAccidentalInSemitones(): number {
        let accidental = this.getAccidental();
        return accidental !== null ? accidentalsInSemitones[accidental] : 0;
    }

    getValue(): string {
        return `${this.dotted ? "dotted " : ""}${this.value}`;
    }

    getBeats(): number {
        let value = values[this.value];
        
        if (this.dotted) {
            value *= 1.5;
        }

        return value;
    }
}

export default Note;