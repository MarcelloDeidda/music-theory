const { writeRandomMelody } = require("../../utils/melody/melody-functions");
const { transpose } = require("../../utils/notes/transpose-functions");
const { tamperMelodyNoDouble } = require("../exercises-functions");
const { calculateNoteFromInterval } = require("../../utils/intervals/intervals-functions");
const { getRandomNote } = require("../../utils/notes/notes-functions");
const { keys } = require("../../utils/keys/keys-utils");

const Interval = require("../../utils/intervals/interval");
const Key = require("../../utils/keys/key");
const Note = require("../../utils/notes/note");
const { transposingInstruments } = require("../../utils/notes/transpose-utils");

const TransposeExercises = class {
    #grade;
    #octaves = [2, 3, 4, 5];
    #transposingIntervals = [
        "major 2",
        "minor 3",
        "perfect 5"
    ];

    constructor(grade) {
        this.#grade = grade;
    }

    transposeMelodyByOctave() {
        if (this.#grade < 3) {
            throw new Error("This exercise is not available before Grade Three");
        }

        const { melody } = writeRandomMelody(this.#grade, 4, 8);

        let interval = new Interval("perfect 8");
        let asc = Math.floor(Math.random() * 2) === 0 ? false : true;

        const transposedMelody = transpose(melody, interval, asc);

        let question, answers;

        question = `Transpose the following melody an octave ${asc ? "higher" : "lower"}:
        ${melody.map(note => note.getNote()).join(" ")}`;
        answers = [transposedMelody.map(note => note.getNote()).join(" ")];

        return { question, answers }
    }

    checkTransposedMelodyByOctave() {
        if (this.#grade < 3) {
            throw new Error("This exercise is not available before Grade Three");
        }

        const { melody } = writeRandomMelody(this.#grade, 4, 8);

        let interval = new Interval("perfect 8");
        let asc = Math.floor(Math.random() * 2) === 0 ? false : true;

        let transposedMelody = transpose(melody, interval, asc);

        let random = Math.floor(Math.random() * 4);
        let melodyIsCorrect = true;

        if (random === 1) {
            transposedMelody = tamperMelodyNoDouble(transposedMelody);
            melodyIsCorrect = false;
        } else if (random === 2) {
            asc = !asc;
            melodyIsCorrect = false;
        }

        let question, answers;

        question = `Is the following melody correctly transposed an octave ${asc ? "higher" : "lower"}?:
        ${melody.map(note => note.getNote()).join(" ")}
        ${transposedMelody.map(note => note.getNote()).join(" ")}`;

        answers = [melodyIsCorrect ? "yes" : "no"];

        return { question, answers }
    }

    transposeMelody() {
        if (this.#grade < 5) {
            throw new Error("This exercise is not available before Grade Five");
        }

        const { melody } = writeRandomMelody(this.#grade, 4, 8);

        let random = Math.floor(Math.random() * 3);
        let interval = new Interval(this.#transposingIntervals[random]);

        let asc = Math.floor(Math.random() * 2) === 0 ? false : true;

        const transposedMelody = transpose(melody, interval, asc);

        let question, answers;

        question = `Transpose the following melody a ${interval.getInterval()} ${asc ? "higher" : "lower"}:
        ${melody.map(note => note.getNote()).join(" ")}`;

        answers = [transposedMelody.map(note => note.getNote()).join(" ")];

        return { question, answers }
    }

    checkTransposedMelody() {
        if (this.#grade < 5) {
            throw new Error("This exercise is not available before Grade Five");
        }

        const { melody } = writeRandomMelody(this.#grade, 4, 8);

        let random = Math.floor(Math.random() * 3);
        let interval = new Interval(this.#transposingIntervals[random]);

        let asc = Math.floor(Math.random() * 2) === 0 ? false : true;

        let transposedMelody = transpose(melody, interval, asc);

        random = Math.floor(Math.random() * 4);
        let melodyIsCorrect = true;

        if (random === 1) {
            transposedMelody = tamperMelodyNoDouble(transposedMelody);
            melodyIsCorrect = false;
        } else if (random === 2) {
            asc = !asc;
            melodyIsCorrect = false;
        }

        let question, answers;

        question = `Is the following melody correctly transposed a ${interval.getInterval()} ${asc ? "higher" : "lower"}?:
        ${melody.map(note => note.getNote()).join(" ")}
        ${transposedMelody.map(note => note.getNote()).join(" ")}`;

        answers = [melodyIsCorrect ? "yes" : "no"];

        return { question, answers }
    }

    transposeKeySignature() {
        if (this.#grade < 5) {
            throw new Error("This exercise is not available before Grade Five");
        }

        let key1 = Key.getRandomKey(this.#grade);

        while (key1.getMode() === "minor") {
            key1 = Key.getRandomKey(this.#grade);
        }
        
        const keySignature1 = key1.getKeySignature();

        let random = Math.floor(Math.random() * 3);
        let interval = new Interval(this.#transposingIntervals[random]);

        let asc = Math.floor(Math.random() * 2) === 0 ? false : true;

        let newTonic = calculateNoteFromInterval(new Note(`${key1.getTonic()}3`), interval, asc);

        while (!Object.keys(keys).includes(newTonic.getNoteWithoutOctave())) {
            random = Math.floor(Math.random() * 3);
            interval = new Interval(this.#transposingIntervals[random]);
    
            asc = Math.floor(Math.random() * 2) === 0 ? false : true;
            newTonic = calculateNoteFromInterval(new Note(`${key1.getTonic()}3`), interval, asc);
        }

        const key2 = new Key(`${newTonic.getNoteWithoutOctave()} ${key1.getMode()}`);
        const keySignature2 = key2.getKeySignature();

        let question, answers;

        question = `Transpose the following key signature a ${interval.getInterval()} ${asc ? "higher" : "lower"}:
        ${keySignature1.join(" ")}`

        answers = [keySignature2.length > 0 ? keySignature2.join(" ") : "none"];

        return { question, answers }
    }

    transposingInstrumentSoundingNote() {
        if (this.#grade < 5) {
            throw new Error("This exercise is not available before Grade Five");
        }

        let note = getRandomNote(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);

        let random = Math.floor(Math.random() * 5);
        let transposingInstrument = Object.keys(transposingInstruments)[random];
        let transposingInterval = new Interval(transposingInstruments[transposingInstrument]);
        
        let transposedNote;

        let question, answers;

        random = Math.floor(Math.random() * 2);

        if (random === 0) {
            transposedNote = calculateNoteFromInterval(note, transposingInterval, false);
            question = `Find the sounding note when played by a ${transposingInstrument} (${transposingInterval.getInterval()} lower): ${note.getNote()}`
            answers = [transposedNote.getNote()];
        } else {
            transposedNote = calculateNoteFromInterval(note, transposingInterval);
            question = `Find the writing note when played by a ${transposingInstrument} (${transposingInterval.getInterval()} higher): ${note.getNote()}`
            answers = [transposedNote.getNote()];
        }

        return { question, answers }
    }
}

module.exports = TransposeExercises;