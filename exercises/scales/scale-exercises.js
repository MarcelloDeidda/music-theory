const { removeAccidentals, tamperChromaticScale } = require("../exercises-functions");
const { sortNotes, getRandomNoteNoDouble, printKeyboard } = require("../../utils/notes/notes-functions");
const { scaleDegrees } = require("../../utils/keys/keys-utils");
const { createChromaticScale } = require("../../utils/keys/scales-functions");

const Note = require("../../utils/notes/note");
const Key = require("../../utils/keys/key");


const ScaleExercises = class {
    #grade;
    #octaves;

    constructor(grade) {
        this.#grade = grade;
        this.#octaves = [2, 3, 4];
    }

    #getRandomScale() {
        let key = Key.getRandomKey(this.#grade);
        const tonic = new Note(`${key.getTonic()}${this.#octaves[Math.floor(Math.random() * this.#octaves.length)]}`);

        let scale, scaleNames, random;

        let mode = key.getMode();

        if (mode === "major") {
            random = Math.floor(Math.random() * 2);
            scale = random === 0 ? key.getAscScale(tonic) : key.getDescScale(tonic);

            const options = [
                `${key.getName()} ascending`,
                `${key.getName()} descending`
            ]

            scaleNames = [options[random]];
        } else {

            const scales = [
                key.getAscScale(tonic).natural,
                key.getDescScale(tonic).natural,
                key.getAscScale(tonic).harmonic,
                key.getDescScale(tonic).harmonic
            ];

            const options = [
                `${key.getTonic()} natural minor ascending`,
                `${key.getTonic()} natural minor descending`,
                `${key.getTonic()} harmonic minor ascending`,
                `${key.getTonic()} harmonic minor descending`
            ]

            if (this.#grade >= 3) {
                scales.push(key.getAscScale(tonic).melodic);
                options.push(`${key.getTonic()} melodic minor ascending`);
            }

            random = Math.floor(Math.random() * scales.length);
            scale = scales[random];
            scaleNames = [options[random]];

            if (random === 1 && this.#grade >= 3) {
                scaleNames.push(`${key.getTonic()} melodic minor descending`)
            }
        }

        return {
            scale,
            scaleNames,
            key
        }
    }

    #getRandomDegree() {
        const { scale, scaleNames, key } = this.#getRandomScale();

        const ascendingScale = sortNotes(...scale).slice(0, 7);

        let random = Math.floor(Math.random() * 7);
        let degree;

        if (this.grade > 3) {
            degree = scaleDegrees[random];
            if (random + 1 === 7 && scaleNames[0].split(" ").includes("natural")) {
                degree = "subtonic";
            }
        } else {
            degree = random + 1;
        }

        return {
            note: ascendingScale[random],
            degree,
            scaleNames,
            key
        }
    }

    nameScale() {
        const { scale, scaleNames } = this.#getRandomScale();
        let question, answers;

        question = `Name this scale:\n${scale.map(note => note.getNote()).join(" ")}`
        answers = scaleNames;

        return {
            question,
            answers
        }
    }

    findDegreeOfScale() {
        const { note, degree, scaleNames, key } = this.#getRandomDegree();

        let scaleName = scaleNames.length > 1 ? scaleNames[scaleNames.length - 1] : scaleNames[0];

        if (!scaleName.split(" ").includes("melodic")) {
            if (key.getMode() === "major") {
                scaleName = scaleName.split(" ").slice(0, 2).join(" ");
            } else {
                scaleName = scaleName.split(" ").slice(0, 3).join(" ");
            }
        }

        let question = `Find the ${degree}${this.grade > 3 ? " " : " degree "}of ${scaleName}.`
        let answers = [note.getNoteWithoutOctave()];

        return {
            question,
            answers
        }
    }

    nameDegreeOfScale() {
        const { note, degree, scaleNames, key } = this.#getRandomDegree();

        let scaleName = scaleNames.length > 1 ? scaleNames[scaleNames.length - 1] : scaleNames[0];

        if (!scaleName.split(" ").includes("melodic")) {
            if (key.getMode() === "major") {
                scaleName = scaleName.split(" ").slice(0, 2).join(" ");
            } else {
                scaleName = scaleName.split(" ").slice(0, 3).join(" ");
            }
        }

        let question = `Name the degree of ${note.getNoteWithoutOctave()} in ${scaleName}.`
        let answers = [degree.toString()];

        return {
            question,
            answers
        }
    }

    completeScale() {
        const { scale, scaleNames } = this.#getRandomScale();
        const randomIndex = [];

        for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * 8);

            while (randomIndex.includes(random)) {
                random = Math.floor(Math.random() * 8);
            }

            randomIndex.push(random);
        }

        randomIndex.sort();
        const missingNotes = [];

        randomIndex.map(num => {
            missingNotes.push(scale[num].getNote());
        });

        const incompleteScale = scale.filter(note => !missingNotes.includes(note.getNote()));

        let question = `Write the missing notes from this ${scaleNames[scaleNames.length - 1]} scale:\n${incompleteScale.map(note => note.getNote()).join(" ")}`;
        let answers = [missingNotes.join(" ")];

        return { question, answers };
    }

    addAccidentalsToScale() {
        const { scale, scaleNames } = this.#getRandomScale();

        let naturalScale = removeAccidentals(scale);

        let differentNotes = scale.filter(note => {
            for (let naturalNote of naturalScale) {
                if (naturalNote.getNote() === note.getNote()) {
                    return false;
                }
            }
            return true;
        });

        let question = `Add the accidentals to complete ${scaleNames[scaleNames.length - 1]}:\n${naturalScale.map(note => note.getNote()).join(" ")}`
        let answers = [differentNotes.map(note => note.getNote()).join(" ")];

        if (answers[0] === "") { answers = ["none"] }

        return {
            question,
            answers
        }
    }

    findWrongNoteInChromaticScale() {
        if (this.#grade < 4) {
            throw new Error("This exercise is not supported before Grade Four");
        }

        const startingNote = getRandomNoteNoDouble(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);

        const chromaticScale = createChromaticScale(startingNote, Math.floor(Math.random() * 2) === 0 ? false : true);

        const { scale: wrongChromaticScale, index } = tamperChromaticScale(chromaticScale);

        let question, answers;

        question = `Find the wrong note in the following chromatic scale:
        ${wrongChromaticScale.map(note => note.getNote()).join(" ")}`

        answers = [wrongChromaticScale[index].getNote()];

        return { question, answers }
    }

    isChromaticScaleCorrect() {
        if (this.#grade < 4) {
            throw new Error("This exercise is not supported before Grade Four");
        }

        const startingNote = getRandomNoteNoDouble(this.#octaves[0], this.#octaves[this.#octaves.length - 1]);

        let chromaticScale = createChromaticScale(startingNote, Math.floor(Math.random() * 2) === 0 ? false : true);
        let isScaleCorrect = true;

        let random = Math.floor(Math.random() * 2);

        if (random) {
            const { scale: wrongChromaticScale } = tamperChromaticScale(chromaticScale);
            chromaticScale = wrongChromaticScale;
            isScaleCorrect = false;
        }

        let question, answers;

        question = `Is this chromatic scale correct?:
        ${chromaticScale.map(note => note.getNote()).join(" ")}`

        answers = [isScaleCorrect ? "yes" : "no"];

        return { question, answers }
    }
}

module.exports = ScaleExercises;