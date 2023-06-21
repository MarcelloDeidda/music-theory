const KeyBuilder = require("../../utils/keys/key-builder");
const { scaleDegrees } = require("../../utils/keys/keys-utils");

const Note = require("../../utils/notes/note");
const { sortNotes } = require("../../utils/notes/notes-utils");

const ScaleExercises = class {
    constructor(grade) {
        this.grade = grade;
        this.keys = KeyBuilder.availableKeys(grade)
        this.octaves = [2, 3, 4, 5];
    }

    #getRandomScale() {
        let key = this.keys[Math.floor(Math.random() * this.keys.length)];
        const tonic = new Note(`${key.tonic}${this.octaves[Math.floor(Math.random() * this.octaves.length)]}`);

        let scale, scaleName, random;

        if (key.mode === "major") {
            random = Math.floor(Math.random() * 2);
            scale = random === 0 ? key.getAscScale(tonic) : key.getDescScale(tonic);

            const options = [
                `${key.name} ascending`,
                `${key.name} descending`
            ]

            scaleName = [options[random]];
        } else {
            random = Math.floor(Math.random() * 5);

            const scales = [
                key.getAscScale(tonic).natural,
                key.getAscScale(tonic).harmonic,
                key.getAscScale(tonic).melodic,
                key.getDescScale(tonic).natural,
                key.getDescScale(tonic).harmonic,
            ];

            const options = [
                `${key.tonic} natural ${key.mode} ascending`,
                `${key.tonic} harmonic ${key.mode} ascending`,
                `${key.tonic} melodic ${key.mode} ascending`,
                `${key.tonic} natural ${key.mode} descending`,
                `${key.tonic} harmonic ${key.mode} descending`
            ]

            scale = scales[random];
            scaleName = [options[random]];

            if (random === 3) {
                scaleName.push(`${key.tonic} melodic ${key.mode} descending`)
            }
        }

        return {
            scale,
            scaleName,
            key
        }
    }

    #getRandomDegree() {
        const { scale, scaleName, key } = this.#getRandomScale();

        const ascendingScale = sortNotes(...scale).slice(0, 7);

        let random = Math.floor(Math.random() * 7);
        let degree;

        if (this.grade > 3) {
            degree = scaleDegrees[random];
            if (random + 1 === 7 && scaleName[0].split(" ").includes("natural")) {
                degree = "subtonic";
            }
        } else {
            degree = random + 1;
        }

        return {
            note: ascendingScale[random],
            degree,
            scaleName,
            key
        }
    }

    nameScale() {
        const { scale, scaleName } = this.#getRandomScale();
        let question, answers;

        question = `Name this scale:\n${scale.map(note => note.fullNote).join(" ")}`
        answers = scaleName;

        return {
            question,
            answers
        }
    }

    findDegreeOfScale() {
        const {note, degree, scaleName, key } = this.#getRandomDegree();

        let question = `Find the ${degree}${this.grade > 3 ? " " : " degree "}of ${key.mode === "major" ? key.name : scaleName[scaleName.length - 1]}.`
        let answers = [note.note];

        return {
            question,
            answers
        }
    }

    nameDegreeOfScale() {
        const {note, degree, scaleName, key } = this.#getRandomDegree();

        let question = `Name the degree of ${note.note} in ${key.mode === "major" ? key.name : scaleName[scaleName.length - 1]}.`
        let answers = [degree.toString()];

        return {
            question,
            answers
        }
    }
}

module.exports = ScaleExercises;