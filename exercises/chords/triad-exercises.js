const KeyBuilder = require("../../utils/keys/key-builder");
const Note = require("../../utils/notes/note");
const ExerciseHandler = require("../exercise");

const TriadExercises = class {
    constructor(grade = 1) {
        this.keys = KeyBuilder.availableKeys(grade);
        this.grade = grade;
    }

    #generateTriad() {
        let index = Math.floor(Math.random() * this.keys.length);
        let key = this.keys[index];
        let tonic = new Note(key.tonic + 4);
        let triad = key.getTriad(1, tonic);

        return {
            triad,
            key
        }
    }

    #generatePrimaryTriads() {
        const index = Math.floor(Math.random() * this.keys.length);
        const key = this.keys[index];
        const tonic = new Note(key.tonic + 4);
        const triads = {};

        [1, 2, 4, 5].map(degree => triads[degree] = key.getTriad(degree, tonic));

        if (this.grade < 5) { delete triads["2"] }

        return {
            triads,
            key
        }
    }

    recogniseTonicTriad() {
        const { triad, key } = this.#generateTriad();

        let question = `Enter the key of the following chord: ${triad[0].fullNote} ${triad[1].fullNote} ${triad[2].fullNote}:`
        let answers = [key.name];

        return {
            question,
            answers
        }
    }

    addNoteToCompleteTonicTriad() {
        const { triad, key } = this.#generateTriad();

        let answers = [triad.splice(Math.floor(Math.random() * 3), 1)[0].fullNote];
        let question = `Add note to complete the tonic triad of ${key.name}: ${triad[0].fullNote} ${triad[1].fullNote}:`

        return {
            question,
            answers
        }
    }

    addAccidentalsToTonicTriad() {
        const { triad, key } = this.#generateTriad();

        let naturalTriad = ExerciseHandler.removeAccidentals(triad);
        let differentNotes = triad.filter(note => {
            for (let naturalNote of naturalTriad) {
                if (naturalNote.fullNote === note.fullNote) {
                    return false;
                }
            }
            return true;
        });

        let question = `Add the accidentals to complete the tonic triad of ${key.name}: ${naturalTriad[0].fullNote} ${naturalTriad[1].fullNote} ${naturalTriad[2].fullNote}:`
        let answers = [differentNotes.map(note => note.fullNote).join(" ")];

        if (answers[0] === "") { answers = ["none"] }

        return {
            question,
            answers
        }
    }

    isThisTonicTriadRight() {
        let { triad, key } = this.#generateTriad();
        let triadIsCorrect = true;

        let random = Math.ceil(Math.random() * 2);

        if (random === 1) {
            triad = ExerciseHandler.tamperChordNoDouble(triad);
            triadIsCorrect = false;
        }

        let question = `Is this the tonic triad of ${key.name}? ${triad[0].fullNote} ${triad[1].fullNote} ${triad[2].fullNote}:`
        let answers = [triadIsCorrect ? "yes" : "no"];

        return {
            question,
            answers
        }
    }

    recogniseKeyFromPrimaryTriads(numberOfTriads = 3) {
        const { triads, key } = this.#generatePrimaryTriads();

        while (Object.entries(triads).length > numberOfTriads) {
            const degrees = Object.keys(triads);
            let random = Math.floor(Math.random() * Object.entries(triads).length);

            delete triads[degrees[random]];
        }

        let question = `Find the key of the following primary triads:${Object.entries(triads).map(([degree, triad]) => {
            return `\n${degree} - ${triad[0].fullNote} ${triad[1].fullNote} ${triad[2].fullNote}`
        })}`

        let answers = [key.name];

        if (Object.entries(triads).length === 1 && Object.keys(triads)[0] === "5") {
            const otherKey = `${key.tonic} ${key.mode === "major" ? "minor" : "major"}`
            answers.push(otherKey);
        }

        return {
            question,
            answers
        };
    }

    recognisePrimaryTriadsDegree() {
        const { triads, key } = this.#generatePrimaryTriads();

        let random = Math.floor(Math.random() * Object.entries(triads).length);
        const degree = Object.keys(triads)[random];
        const triad = triads[degree];

        let question = `Find the degree of the this primary triad in ${key.name}: ${triad[0].fullNote} ${triad[1].fullNote} ${triad[2].fullNote}`

        let answers = [degree];

        return {
            question,
            answers
        };
    }

    buildPrimaryTriads() {
        const { triads, key } = this.#generatePrimaryTriads();

        let random = Math.floor(Math.random() * Object.entries(triads).length);
        const degree = Object.keys(triads)[random];
        const triad = triads[degree];

        let question = `Find the ${degree} triad of ${key.name}: `

        let answers = [`${triad[0].note} ${triad[1].note} ${triad[2].note}`];

        return {
            question,
            answers
        };
    }

    completePrimaryTriad() {
        const { triads, key } = this.#generatePrimaryTriads();

        let random = Math.floor(Math.random() * Object.entries(triads).length);
        const degree = Object.keys(triads)[random];
        const triad = triads[degree];

        random = Math.floor(Math.random() * 3);
        const missingNote = triad.splice(random, 1)[0];

        let question = `Find the missing note of the ${degree} triad of ${key.name}: ${triad[0].fullNote} ${triad[1].fullNote}`

        let answers = [missingNote.fullNote];

        return {
            question,
            answers
        };
    }
}

module.exports = TriadExercises;