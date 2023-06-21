const IntervalCalculator = require("../intervals/interval-calculator");
const ChordBuilder = require("../chords/chord-builder");

const Interval = require("../intervals/interval");
const Note = require("../notes/note");

const { scaleFromKey, getKeySignature } = require("./keys-utils");

const MajorKey = class {
    constructor(tonic) {
        this.tonic = tonic;
        this.mode = "major";
        this.name = `${this.tonic} ${this.mode}`
        this.relative = `${IntervalCalculator.calculateNoteFromInterval(new Note(`${this.tonic}1`), new Interval("6 major")).note} minor`;
        this.keySignature = getKeySignature(this.name);
    }

    getAscScale(tonic) {
        return scaleFromKey(tonic, this.keySignature);
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
    */
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
        descScales.harmonic[1] = IntervalCalculator.calculateNoteFromInterval(new Note(`${descScales.harmonic[1]}1`), new Interval("1 augmented"));

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
    */
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

module.exports = {
    MajorKey,
    MinorKey
}