const IntervalCalculator = require("../../utils/intervals/interval-calculator");
const Note = require("../../utils/notes/note");
const NoteBuilder = require("../../utils/notes/note-builder");
const KeyBuilder = require("../../utils/keys/key-builder");

const { sortNotes } = require("../../utils/notes/notes-utils");
const { qualities } = require("../../utils/intervals/interval-utils");

const noteBuilder = new NoteBuilder(2, 5);

const IntervalExercises = class {
    constructor(grade = 1) {
        this.grade = grade;
        this.numberOnly = true;
        this.octaves = [2, 3, 4, 5];

        this.keys = KeyBuilder.availableKeys(grade);

        this.availableQualities = [
            qualities.minor,
            qualities.perfect,
            qualities.major
        ];

        if (grade > 2) {
            this.numberOnly = false;
        }

        if (grade > 3) {
            this.availableQualities = this.availableQualities.concat(
                [qualities.augmented, qualities.diminished]
            );
        }
    }

    #generateInterval() {
        let note1, note2, interval;

        if (this.grade === 5) {
            note1 = noteBuilder.getRandomNote();
            note2 = noteBuilder.getRandomNote();
            interval = IntervalCalculator.calculateInterval(note1, note2);

            while (interval.unclassified || interval.distance > 15) {
                note1 = noteBuilder.getRandomNote();
                note2 = noteBuilder.getRandomNote();
                interval = IntervalCalculator.calculateInterval(note1, note2);
            }

            return { note1, note2, interval };
        }

        if (this.grade === 4) {
            let key = this.keys[Math.floor(Math.random() * this.keys.length)];

            let tonic = new Note(`${key.tonic}${this.octaves[Math.floor(Math.random() * this.octaves.length)]}`);

            note1 = noteBuilder.getRandomNoteFromScale(key.mode === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
            note2 = noteBuilder.getRandomNoteFromScale(key.mode === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
            interval = IntervalCalculator.calculateInterval(note1, note2);

            while (interval.unclassified || interval.compound) {
                note1 = noteBuilder.getRandomNoteFromScale(key.mode === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
                note2 = noteBuilder.getRandomNoteFromScale(key.mode === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic);
                interval = IntervalCalculator.calculateInterval(note1, note2);
            }

            return { note1, note2, interval };
        }

        let key = this.keys[Math.floor(Math.random() * this.keys.length)];
        note1 = new Note(`${key.tonic}${this.octaves[Math.floor(Math.random() * this.octaves.length)]}`);
        note2 = noteBuilder.getRandomNoteFromScale(key.mode === "major" ? key.getAscScale(note1) : key.getAscScale(note1).harmonic);

        interval = IntervalCalculator.calculateInterval(note1, note2);
        let sortedNotes = sortNotes(note1, note2);

        while (interval.compound || note1.fullNote !== sortedNotes[0].fullNote) {
            note1 = new Note(`${key.tonic}${this.octaves[Math.floor(Math.random() * this.octaves.length)]}`);
            note2 = noteBuilder.getRandomNoteFromScale(key.mode === "major" ? key.getAscScale(note1) : key.getAscScale(note1).harmonic);

            interval = IntervalCalculator.calculateInterval(note1, note2);
            sortedNotes = sortNotes(note1, note2);
        }

        return { note1, note2, interval, key };
    }

    findIntervalFromTwoNotes() {
        const { note1, note2, interval } = this.#generateInterval();

        let question = `Find the interval between ${note1.fullNote} and ${note2.fullNote}.`
        let answers;

        if (this.grade < 3) {
            answers = [interval.distance.toString()];
        } else if (this.grade < 5) {
            answers = [`${interval.quality} ${interval.distance}`];
        } else {
            answers = [
                `${interval.compound ? "compound " : ""}${interval.quality} ${interval.simpleDistance}`,
                `${interval.quality} ${interval.distance}`
            ]
        }

        return { question, answers }
    }

    findNoteFromInterval() {
        const { note1, note2, interval, key } = this.#generateInterval();
        const sortedNotes = sortNotes(note1, note2);
        let asc = note1.fullNote === sortedNotes[0].fullNote;

        let question, answers;

        if (this.grade < 3) {
            question = `Find the note a ${interval.simpleDistance} higher from ${note1.fullNote}, where the key is ${key.name}`
        } else if (this.grade < 4) {
            question = `Find the note a ${interval.simpleDistance} ${interval.quality} higher from ${note1.fullNote}`
        } else {
            question = `Find the note a ${interval.simpleDistance} ${interval.quality} ${asc ? "higher" : "lower"} from ${note1.fullNote}`
        }
        answers = [note2.fullNote];

        return { question, answers }
    }
}

module.exports = IntervalExercises;