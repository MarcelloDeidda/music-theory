const { calculateNoteFromInterval } = require("../intervals/intervals-functions");
const { triadFromKey } = require("../chords/chords-functions");
const { getKeySignature } = require("./keys-functions");
const { scaleFromKey } = require("./scales-functions");
const { keys } = require("./keys-utils");

const Note = require("../notes/note");
const Interval = require("../intervals/interval");

const Key = class {
    #name;

    constructor(name) {
        this.#name = name;
    }

    getName() {
        return this.#name;
    }

    getTonic() {
        let keyInfo = this.#name.split(" ");
        return keyInfo[0];
    }

    getMode() {
        let keyInfo = this.#name.split(" ");
        return keyInfo[1];
    }

    getRelative() {
        let mode = this.getMode();
        if (mode === "major") {
            return `${this.getDegree(6)} minor`;
        } else {
            return `${this.getDegree(3)} major`;
        }
    }

    getKeySignature() {
        return getKeySignature(this.#name);
    }

    getAscScale(tonic) {
        if (this.getMode() === "major") {
            return scaleFromKey(tonic, this.getKeySignature());
        } else {
            const ascScales = {
                natural: scaleFromKey(tonic, this.getKeySignature())
            };

            ascScales.harmonic = ascScales.natural.slice();
            ascScales.harmonic[6] = calculateNoteFromInterval(ascScales.harmonic[6], new Interval("augmented 1"));

            ascScales.melodic = ascScales.harmonic.slice();
            ascScales.melodic[5] = calculateNoteFromInterval(ascScales.melodic[5], new Interval("augmented 1"));

            return ascScales;
        }
    }

    getDescScale(tonic) {
        if (this.getMode() === "major") {
            return scaleFromKey(tonic, this.getKeySignature()).sort(() => -1);
        } else {
            const descScales = {
                natural: scaleFromKey(tonic, this.getKeySignature()).sort(() => -1)
            };

            descScales.harmonic = descScales.natural.slice();
            descScales.harmonic[1] = calculateNoteFromInterval(descScales.harmonic[1], new Interval("augmented 1"));

            descScales.melodic = descScales.natural.slice();

            return descScales;
        }
    }

    getDegree(degree) {
        let tonic = new Note(`${this.getTonic()}3`)
        const scale = this.getAscScale(tonic);
        if (this.getMode() === "major") {
            return scale[degree - 1].getNoteWithoutOctave();
        } else {
            return scale.harmonic[degree - 1].getNoteWithoutOctave();
        }
    }

    getTriad(degree, tonic) {
        let triad = triadFromKey(degree, tonic, this.getKeySignature());

        if (this.getMode() === "minor") {
            let seventh = this.getDegree(7)[0];

            return triad.map(note => {
                if (note.getLetterName() === seventh) {
                    return calculateNoteFromInterval(note, new Interval("augmented 1"));
                } else {
                    return note;
                }
            });
        }
        return triad;
    }

    static availableKeys(grade) {
        const keyList = [
            new Key("C major"),
            new Key("G major"),
            new Key("D major"),
            new Key("F major"),
        ]

        if (grade > 1) {
            [
                "A major",
                "Bb major",
                "Eb major",
                "A minor",
                "E minor",
                "D minor"
            ].map(tonic => keyList.push(new Key(tonic)));
        }

        if (grade > 2) {
            [
                "Ab major",
                "E major",
                "B minor",
                "F# minor",
                "C# minor",
                "G minor",
                "C minor",
                "F minor"
            ].map(tonic => keyList.push(new Key(tonic)));
        }

        if (grade > 3) {
            [
                "Db major",
                "B major",
                "Bb minor",
                "G# minor"
            ].map(tonic => keyList.push(new Key(tonic)));
        }

        if (grade > 4) {
            [
                "Gb major",
                "F# major",
                "Eb minor",
                "D# minor"
            ].map(tonic => keyList.push(new Key(tonic)));
        }

        return keyList;
    }

    static getRandomKey(grade) {
        const keyList = this.availableKeys(grade);

        let random = Math.floor(Math.random() * keyList.length);
        return keyList[random];
    }

    static getAllKeys() {
        const keyList = [];
        for (let key in keys) {
            const newKey = new Key(`${key} major`);
            keyList.push(newKey);
            keyList.push(new Key(newKey.getRelative()));
        }

        return keyList;
    }
}

module.exports = Key;