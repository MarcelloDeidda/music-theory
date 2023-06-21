const KeyBuilder = require("../../utils/keys/key-builder");

const ScaleExercises = class {
    constructor(grade) {
        this.grade = grade;
        this.keys = KeyBuilder.availableKeys(grade)
    }

    #getRandomKey() {
        let random = Math.floor(Math.random() * this.keys.length);
        return this.keys[random];
    }

    nameScale() {
        const key = this.#getRandomKey();

        let question, answers;
        let scale, random;

        if (key.mode === "major") {
            random = Math.floor(Math.random() * 2);
            scale = random === 0 ? key.getAscScale() : key.getDescScale();

            const options = [
                `${key.name} ascending`,
                `${key.name} descending`
            ]

            answers = [options[random]];
        } else {
            random = Math.floor(Math.random() * 5);

            const scales = [
                key.getAscScale().natural,
                key.getAscScale().harmonic,
                key.getAscScale().melodic,
                key.getAscDesc().natural,
                key.getAscDesc().harmonic,
            ];

            const options = [
                `${key.tonic} natural ${key.mode} ascending`,
                `${key.tonic} harmonic ${key.mode} ascending`,
                `${key.tonic} melodic ${key.mode} ascending`,
                `${key.tonic} natural ${key.mode} descending`,
                `${key.tonic} harmonic ${key.mode} descending`
            ]

            scale = scales[random];
            answers = [options[random]];

            if (random === 3) {
                answers.push(`${key.tonic} melodic ${key.mode} descending`)
            }
        }

        let notes = scale.map(note => note.fullNote);
        question = `Find the key of this scale:\n${scale.join(" ")}`

        return {
            question,
            answers
        }
    }
}

module.exports = ScaleExercises;