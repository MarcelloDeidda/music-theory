const Key = require("../../utils/keys/key");

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
}

module.exports = KeyExercises;