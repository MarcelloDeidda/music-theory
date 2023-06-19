const Note = require("./note");
const { notes, accidentals } = require("./notes-utils");

const NoteBuilder = class {
    constructor(lowOctave, highOctave) {
        this.octaveRange = [lowOctave, highOctave];
    }

    getRandomNote() {
        let octave = Math.floor(Math.random() * (this.octaveRange[1] - this.octaveRange[0] + 1)) + this.octaveRange[0];
        let note = notes[Math.floor(Math.random() * 7)];
        let accidental = accidentals[Math.floor(Math.random() * 5)];

        return new Note(`${note}${accidental}${octave}`);
    }

    getRandomNoteNoDouble() {
        let octave = Math.floor(Math.random() * (this.octaveRange[1] - this.octaveRange[0] + 1)) + this.octaveRange[0];
        let note = notes[Math.floor(Math.random() * 7)];
        let accidental = accidentals[Math.ceil(Math.random() * 3)];

        return new Note(`${note}${accidental}${octave}`);
    }

    getRandomNaturalNote() {
        let octave = Math.floor(Math.random() * (this.octaveRange[1] - this.octaveRange[0] + 1)) + this.octaveRange[0];
        let note = notes[Math.floor(Math.random() * 7)];

        return new Note(`${note}${octave}`);
    }

    getRandomNoteFromScale(scale) {
        let octave = Math.floor(Math.random() * (this.octaveRange[1] - this.octaveRange[0] + 1)) + this.octaveRange[0];
        let note = scale[Math.floor(Math.random() * 8)]

        return new Note(`${note}${octave}`);
    }
}

module.exports = NoteBuilder;