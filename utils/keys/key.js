const { calculateNoteFromInterval } = require("../intervals/intervals-functions");
const { triadFromKey } = require("../chords/chords-functions");
const { getKeySignature, scaleFromKey } = require("./keys-functions");

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
            ascScales.harmonic[6] = calculateNoteFromInterval(ascScales.harmonic[6], new Interval("1 augmented"));

            ascScales.melodic = ascScales.harmonic.slice();
            ascScales.melodic[5] = calculateNoteFromInterval(ascScales.melodic[5], new Interval("1 augmented"));

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
            descScales.harmonic[1] = calculateNoteFromInterval(descScales.harmonic[1], new Interval("1 augmented"));

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
                    return calculateNoteFromInterval(note, new Interval("1 augmented"));
                } else {
                    return note;
                }
            });
        }
        return triad;
    }

    static availableKeys(grade) {
        const keys = [
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
            ].map(tonic => keys.push(new Key(tonic)));
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
            ].map(tonic => keys.push(new Key(tonic)));
        }

        if (grade > 3) {
            [
                "Db major",
                "B major",
                "Bb minor",
                "G# minor"
            ].map(tonic => keys.push(new Key(tonic)));
        }

        if (grade > 4) {
            [
                "Gb major",
                "F# major",
                "Eb minor",
                "D# minor"
            ].map(tonic => keys.push(new Key(tonic)));
        }

        return keys;
    }
}
/*
const MajrKey = class {
    constructor(tonic) {
        this.tonic = tonic;
        this.mode = "major";
        this.name = `${this.tonic} ${this.mode}`
        this.relative = `${IntervalCalculator.calculateNoteFromInterval(new Note(`${this.tonic}1`), new Interval("6 major")).note} minor`;
        this.keySignature = getKeySignature(this.name);
    }

    getAscScale(tonic) {

    }

    getDescScale(tonic) {
        return scaleFromKey(tonic, this.keySignature).sort(() => -1)
    }

    getDegree(degree) {
        const scale = this.getAscScale();
        return scale[degree - 1];
    }
    /*
        getTriads(tonic) {
            const triads = {};
    
            for (let i = 1; i <= 7; i++) {
                triads[i] = ChordBuilder.triadFromKey(i, tonic, this.keySignature);
            }
    
            return triads;
        }
    
    getTriad(degree, tonic) {
        let triad = ChordBuilder.triadFromKey(degree, tonic, this.keySignature);

        return triad;
    }
}

const MinorKey = class {
    constructor(tonic) {
        this.tonic = tonic;
        this.mode = "minor";
        this.name = `${this.tonic} ${this.mode}`
        this.relative = `${IntervalCalculator.calculateNoteFromInterval(new Note(`${this.tonic}1`), new Interval("3 minor")).note} major`;
        this.keySignature = getKeySignature(this.relative);
    }

    getAscScale(tonic) {
        const ascScales = {
            natural: scaleFromKey(tonic, this.keySignature)
        };

        ascScales.harmonic = ascScales.natural.slice();
        ascScales.harmonic[6] = IntervalCalculator.calculateNoteFromInterval(ascScales.harmonic[6], new Interval("1 augmented"));

        ascScales.melodic = ascScales.harmonic.slice();
        ascScales.melodic[5] = IntervalCalculator.calculateNoteFromInterval(ascScales.melodic[5], new Interval("1 augmented"));

        return ascScales;
    }

    getDescScale(tonic) {
        const descScales = {
            natural: scaleFromKey(tonic, this.keySignature).sort(() => -1)
        };

        descScales.harmonic = descScales.natural.slice();
        descScales.harmonic[1] = IntervalCalculator.calculateNoteFromInterval(descScales.harmonic[1], new Interval("1 augmented"));

        descScales.melodic = descScales.natural.slice();

        return descScales;
    }

    getDegree(degree) {
        const scale = this.getAscScale().harmonic;
        return scale[degree - 1];
    }
    /*
        getTriads() {
            const triads = {};
    
            for (let i = 1; i <= 7; i++) {
                triads[i] = ChordBuilder.triadFromScale(i, this.getAscScale().harmonic);
            }
    
            return triads;
        }
    
    getTriad(degree, tonic) {
        // If tonic doesn't correspond, throw error
        let triad = ChordBuilder.triadFromKey(degree, tonic, this.mode);
        let seventh = this.getDegree(7)[0];

        return triad.map(note => {
            if (note.name === seventh) {
                return IntervalCalculator.calculateNoteFromInterval(note, new Interval("1 augmented"));
            } else {
                return note;
            }
        });
    }
}
*/
module.exports = Key;