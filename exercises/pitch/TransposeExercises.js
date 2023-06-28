const { writeRandomMelody } = require("../../utils/melody/melody-functions");
const { transpose } = require("../../utils/notes/transpose-functions");
const { tamperMelodyNoDouble } = require("../exercises-functions");

const Interval = require("../../utils/intervals/interval");

const TransposeExercises = class {
    #grade;
    #transposingIntervals = [
        "major 2",
        "minor 3",
        "perfect 5"
    ];

    constructor(grade) {
        this.#grade = grade;
    }
    
    transposeMelodyByOctave() {
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
}

module.exports = TransposeExercises;