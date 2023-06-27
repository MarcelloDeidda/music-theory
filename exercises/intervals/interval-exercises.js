const Note = require("../../utils/notes/note");
const Key = require("../../utils/keys/key");

const { getRandomNote, getRandomNoteFromScale, sortNotes } = require("../../utils/notes/notes-functions");
const { calculateInterval } = require("../../utils/intervals/intervals-functions");

const IntervalExercises = class {
    #grade;
    #octaves;

    constructor(grade = 1) {
        this.#grade = grade;
        this.#octaves = [2, 3, 4, 5];
    }

    #generateInterval() {
        let note1, note2, interval;

        if (this.#grade === 5) {
            note1 = getRandomNote(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);
            note2 = getRandomNote(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);
            interval = calculateInterval(note1, note2);

            while (!interval.isClassified() || interval.getDistance() > 15) {
                note1 = getRandomNote(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);
                note2 = getRandomNote(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);
                interval = calculateInterval(note1, note2);
            }

            return { note1, note2, interval };
        }

        const key = Key.getRandomKey(this.#grade);

        if (this.#grade === 4) {
            let tonic = new Note(`${key.getTonic()}${this.#octaves[Math.floor(Math.random() * this.#octaves.length)]}`);

            note1 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
            note2 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
            interval = calculateInterval(note1, note2);

            while (!interval.isClassified() || interval.isCompound()) {
                note1 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
                note2 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
                interval = calculateInterval(note1, note2);
            }

            return { note1, note2, interval };
        }

        note1 = new Note(`${key.getTonic()}${this.#octaves[Math.floor(Math.random() * this.#octaves.length)]}`);
        note2 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(note1) : key.getAscScale(note1).harmonic);

        interval = calculateInterval(note1, note2);
        let sortedNotes = sortNotes(note1, note2);

        while (interval.isCompound() || note1.getNote() !== sortedNotes[0].getNote()) {
            note1 = new Note(`${key.getTonic()}${this.#octaves[Math.floor(Math.random() * this.#octaves.length)]}`);
            note2 = getRandomNoteFromScale(key.getMode() === "major" ? key.getAscScale(note1) : key.getAscScale(note1).harmonic);

            interval = calculateInterval(note1, note2);
            sortedNotes = sortNotes(note1, note2);
        }

        return { note1, note2, interval, key };
    }

    findIntervalFromTwoNotes() {
        const { note1, note2, interval } = this.#generateInterval();

        let question = `Find the interval between ${note1.getNote()} and ${note2.getNote()}.`
        let answers;

        if (this.#grade < 3) {
            answers = [interval.getDistance().toString()];
        } else if (this.#grade < 5) {
            answers = [`${interval.getQuality()} ${interval.getDistance()}`];
        } else {
            answers = [
                `${interval.isCompound() ? "compound " : ""}${interval.getQuality()} ${interval.getSimpleDistance()}`,
                `${interval.getQuality()} ${interval.getDistance()}`
            ]
        }

        return { question, answers }
    }

    findNoteFromInterval() {
        const { note1, note2, interval, key } = this.#generateInterval();
        const sortedNotes = sortNotes(note1, note2);
        let asc = note1.getNote() === sortedNotes[0].getNote();

        let question, answers;

        if (this.#grade < 3) {
            question = `Find the note a ${interval.getSimpleDistance()} higher from ${note1.getNote()}, where the key is ${key.getName()}`
        } else if (this.#grade < 4) {
            question = `Find the note a ${interval.getSimpleDistance()} ${interval.getQuality()} higher from ${note1.getNote()}`
        } else {
            question = `Find the note a ${interval.getSimpleDistance()} ${interval.getQuality()} ${asc ? "higher" : "lower"} from ${note1.getNote()}`
        }
        answers = [note2.getNote()];

        return { question, answers }
    }
}

module.exports = IntervalExercises;