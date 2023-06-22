const KeyBuilder = require("../../utils/keys/key-builder");

const KeyExercises = class {
    constructor(grade) {
        this.grade = grade;
        this.keys = KeyBuilder.availableKeys(grade)
    }

    #getRandomKey() {
        let random = Math.floor(Math.random() * this.keys.length);
        return this.keys[random];
    }

    findKeyFromSignature() {
        const key = this.#getRandomKey();

        let question, answers, keySignature;

        if (key.keySignature.length > 0) {
            keySignature = key.keySignature.join(" ");
        } else {
            keySignature = "none";
        }

        question = `Name the ${key.mode} key that has this key signature: ${keySignature}`;
        answers = [key.name];

        return {
            question,
            answers
        }
    }

    findSignatureFromKey() {
        const key = this.#getRandomKey();

        let question, answers, keySignature;

        if (key.keySignature.length > 0) {
            keySignature = key.keySignature.join(" ");
        } else {
            keySignature = "none";
        }

        question = `Write the accidentals in the key signature of ${key.name}`;
        answers = [keySignature];

        return {
            question,
            answers
        }
    }

    findRelative() {
        const key = this.#getRandomKey();

        let question = `What is the ${key.mode === "major" ? "minor" : "major"} relative of ${key.name}?`;
        let answers = [key.relative];

        return { question, answers };
    }
}

module.exports = KeyExercises;