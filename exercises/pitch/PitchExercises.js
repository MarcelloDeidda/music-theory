const { isNoteHigher, getRandomNoteFromScale } = require("../../utils/notes/notes-functions");
const { calculateInterval } = require("../../utils/intervals/intervals-functions");

const Note = require("../../utils/notes/note");
const Key = require("../../utils/keys/key");

const PitchExercises = class {
    #grade;

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
}

module.exports = PitchExercises;