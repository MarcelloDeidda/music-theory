const { chromaticScale } = require("../../utils/notes/notes-utils");
const { isNoteHigher, getRandomNoteFromScale, getRandomNote } = require("../../utils/notes/notes-functions");
const { calculateInterval, calculateNoteFromInterval } = require("../../utils/intervals/intervals-functions");

const Note = require("../../utils/notes/note");
const Key = require("../../utils/keys/key");
const Interval = require("../../utils/intervals/interval");

const PitchExercises = class {
    #grade;
    #octaves = [2, 3, 4, 5]

    constructor(grade) {
        this.#grade = grade;
    }

    isNoteHigher(options = { noAcc: false }) {
        if (options.noAcc && this.#grade > 2) {
            throw new Error("The no-accidental version of this exercise is not supported past Grade Two");
        }

        const key = Key.getRandomKey(this.#grade);
        const scale = key.getMode() === "major" ? key.getAscScale(new Note(`${key.getTonic()}4`)) : key.getAscScale(new Note(`${key.getTonic()}4`)).harmonic;

        let note1 = getRandomNoteFromScale(scale);

        while (options.noAcc && note1.getAccidentalInSemitones() !== 0) {
            note1 = getRandomNoteFromScale(scale);
        }

        let note2 = getRandomNoteFromScale(scale);
        let interval = calculateInterval(note1, note2);

        while (
            note1.getNote() === note2.getNote() ||
            interval.getDistance() > 4 ||
            (options.noAcc && note2.getAccidentalInSemitones() !== 0)
        ) {
            note2 = getRandomNoteFromScale(scale);
            interval = calculateInterval(note1, note2);
        }

        let question, answers;

        question = `Is the second note higher than the first? ${note1.getNote()} ${note2.getNote()}`
        answers = [isNoteHigher(note1, note2)];

        return { question, answers }
    }

    findEnharmonicEquivalent() {
        if (this.#grade < 4) {
            throw new Error("The no-accidental version of this exercise is not supported past Grade Two");
        }

        const note1 = getRandomNote(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);

        let enharmonicEquivalents = chromaticScale.filter(notes => notes.includes(note1.getNoteWithoutOctave()))[0];
        enharmonicEquivalents = enharmonicEquivalents.filter(note => note !== note1.getNoteWithoutOctave());

        let question, answers;

        question = `Find the enharmonic equivalent of ${note1.getNote()}`
        answers = enharmonicEquivalents.map(note => note + (note === "B#" || note === "Bx" ? note1.getOctave() - 1: note1.getOctave()));

        return { question, answers }
    }

    isEnharmonicEquivalent() {
        if (this.#grade < 4) {
            throw new Error("This exercise is not supported before Grade Four");
        }

        const note1 = getRandomNote(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);

        const intervals = ["augmented 1", "diminished 2", "minor 2"];
        let asc = Math.floor(Math.random() * 2) === 0 ? false : true;
        let random = Math.floor(Math.random() * 3);
        let isEnharmonic = random === 1 ? true : false;

        let note2 = calculateNoteFromInterval(note1, new Interval(intervals[random]), asc);

        while (note2.getNoteWithoutOctave() === "undefined") {
            asc = Math.floor(Math.random() * 2) === 0 ? false : true;
            random = Math.floor(Math.random() * 3);
            isEnharmonic = random === 1 ? true : false;
            note2 = calculateNoteFromInterval(note1, new Interval(intervals[random]), asc);
        }

        let question, answers;

        question = `Are these two notes enharmonic equivalent? ${note1.getNote()} ${note2.getNote()}`
        answers = [isEnharmonic ? "yes" : "no"];

        return { question, answers }
    }
}

module.exports = PitchExercises;