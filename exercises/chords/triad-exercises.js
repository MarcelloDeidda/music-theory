const { removeAccidentals, tamperChordNoDouble } = require("../exercises-functions");

const Note = require("../../utils/notes/note");
const Key = require("../../utils/keys/key");

const TriadExercises = class {
    #grade;
    #octaves;

    constructor(grade = 1) {
        this.#grade = grade;
        this.#octaves = [2, 3, 4];
    }

    #generateTonicTriad() {
        const key = Key.getRandomKey(this.#grade);

        let tonic = new Note(key.getTonic() + this.#octaves[Math.floor(Math.random() * this.#octaves.length)]);
        let triad = key.getTriad(1, tonic);

        return {
            triad,
            key
        }
    }

    #generatePrimaryTriads() {
        const key = Key.getRandomKey(this.#grade);

        const tonic = new Note(key.getTonic() + this.#octaves[Math.floor(Math.random() * this.#octaves.length)]);
        const triads = {};

        [1, 2, 4, 5].map(degree => triads[degree] = key.getTriad(degree, tonic));

        if (this.#grade < 5) { delete triads["2"] }

        return {
            triads,
            key
        }
    }

    recogniseTonicTriad() {
        const { triad, key } = this.#generateTonicTriad();

        let question = `Enter the key of the following chord: ${triad[0].getNote()} ${triad[1].getNote()} ${triad[2].getNote()}:`
        let answers = [key.getName()];

        return {
            question,
            answers
        }
    }

    addNoteToCompleteTonicTriad() {
        const { triad, key } = this.#generateTonicTriad();

        let answers = [triad.splice(Math.floor(Math.random() * 3), 1)[0].getNote()];
        let question = `Add note to complete the tonic triad of ${key.getName()}: ${triad[0].getNote()} ${triad[1].getNote()}:`

        return {
            question,
            answers
        }
    }

    addAccidentalsToTonicTriad() {
        const { triad, key } = this.#generateTonicTriad();

        let naturalTriad = removeAccidentals(triad);

        let differentNotes = triad.filter(note => {
            for (let naturalNote of naturalTriad) {
                if (naturalNote.getNote() === note.getNote()) {
                    return false;
                }
            }
            return true;
        });

        let question = `Add the accidentals to complete the tonic triad of ${key.getName()}: ${naturalTriad[0].getNote()} ${naturalTriad[1].getNote()} ${naturalTriad[2].getNote()}:`
        let answers = [differentNotes.map(note => note.getNote()).join(" ")];

        if (answers[0] === "") { answers = ["none"] }

        return {
            question,
            answers
        }
    }

    isThisTonicTriadRight() {
        let { triad, key } = this.#generateTonicTriad();
        let triadIsCorrect = true;

        let random = Math.ceil(Math.random() * 2);

        if (random === 1) {
            triad = tamperChordNoDouble(triad);
            triadIsCorrect = false;
        }

        let question = `Is this the tonic triad of ${key.getName()}? ${triad[0].getNote()} ${triad[1].getNote()} ${triad[2].getNote()}:`
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
            return `\n${degree} - ${triad[0].getNote()} ${triad[1].getNote()} ${triad[2].getNote()}`
        })}`

        let answers = [key.getName()];

        if (Object.entries(triads).length === 1 && Object.keys(triads)[0] === "5") {
            const otherKey = `${key.getTonic()} ${key.getMode() === "major" ? "minor" : "major"}`
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

        let question = `Find the degree of the this primary triad in ${key.getName()}: ${triad[0].getNote()} ${triad[1].getNote()} ${triad[2].getNote()}`

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

        let question = `Find the ${degree} triad of ${key.getName()}: `

        let answers = [`${triad[0].getNoteWithoutOctave()} ${triad[1].getNoteWithoutOctave()} ${triad[2].getNoteWithoutOctave()}`];

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

        let question = `Find the missing note of the ${degree} triad of ${key.getName()}: ${triad[0].getNote()} ${triad[1].getNote()}`

        let answers = [missingNote.getNote()];

        return {
            question,
            answers
        };
    }
}

module.exports = TriadExercises;