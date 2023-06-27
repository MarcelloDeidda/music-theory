const { writeRandomMelody } = require("../../utils/melody/melody-functions");
const { removeAccidentals } = require("../exercises-functions");

const Key = require("../../utils/keys/key");
const Note = require("../../utils/notes/note");

const KeyExercises = class {
    #grade;

    constructor(grade) {
        this.#grade = grade;
    }

    findKeyFromSignature() {
        const key = Key.getRandomKey(this.#grade);

        let question, answers, keySignature;

        if (key.getKeySignature().length > 0) {
            keySignature = key.getKeySignature().join(" ");
        } else {
            keySignature = "none";
        }

        question = `Name the ${key.getMode()} key that has this key signature: ${keySignature}`;
        answers = [key.getName()];

        return {
            question,
            answers
        }
    }

    findSignatureFromKey() {
        const key = Key.getRandomKey(this.#grade);

        let question, answers, keySignature;

        if (key.getKeySignature().length > 0) {
            keySignature = key.getKeySignature().join(" ");
        } else {
            keySignature = "none";
        }

        question = `Write the accidentals in the key signature of ${key.getName()}`;
        answers = [keySignature];

        return {
            question,
            answers
        }
    }

    findRelative() {
        const key = Key.getRandomKey(this.#grade);

        let question = `What is the ${key.getMode() === "major" ? "minor" : "major"} relative of ${key.getName()}?`;
        let answers = [key.getRelative()];

        return { question, answers };
    }

    findKeyOfMelody() {
        const { melody } = writeRandomMelody(this.#grade, 3, 8);
        const allKeys = Key.getAllKeys();

        let question;
        const answers = [];

        question = `Name a possible key for this melody:\n${melody.map(note => note.getNote()).join(" ")}`;

        for (let key of allKeys) {
            const scale = key.getMode() === "major" ? key.getAscScale(new Note(`${key.getTonic()}3`)) : key.getAscScale(new Note(`${key.getTonic()}3`)).harmonic;
            let scaleIsValid = melody.every(melodyNote => {
                return scale.map(scaleNote => scaleNote.getNoteWithoutOctave()).includes(melodyNote.getNoteWithoutOctave());
            })

            if (scaleIsValid) { answers.push(key.getName()) }
        }

        return { question, answers }
    }

    addAccidentalsToMelody() {
        const { melody, key } = writeRandomMelody(this.#grade, 3, 8);

        let naturalMelody = removeAccidentals(melody);

        let differentNotes = melody.filter(note => {
            for (let naturalNote of naturalMelody) {
                if (naturalNote.getNote() === note.getNote()) {
                    return false;
                }
            }
            return true;
        });

        let question = `Add the accidentals to this melody in the key of ${key.getName()}:\n${naturalMelody.map(note => note.getNote()).join(" ")}`
        let answers = [differentNotes.map(note => note.getNote()).join(" ")];

        if (answers[0] === "") { answers = ["none"] }

        return {
            question,
            answers
        }
    }
}

module.exports = KeyExercises;