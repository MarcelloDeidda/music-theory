const IntervalCalculator = require("../intervals/interval-calculator");
const Interval = require("../intervals/interval");
const Note = require("../notes/note");

const { createScale, getKeySignature } = require("./keys-utils");
const ChordBuilder = require("../chords/chord-builder");

const MajorKey = class {
    constructor(tonic) {
        this.tonic = tonic;
        this.mode = "major";
        this.name = `${this.tonic} ${this.mode}`
        this.relative = `${IntervalCalculator.calculateNoteFromInterval(new Note(`${this.tonic}1`), new Interval("6 major")).note} minor`;
        this.keySignature = getKeySignature(this.name);
    }

    getAscScale() {
        return createScale(this.tonic, this.keySignature);
    }

    getDescScale() {
        return createScale(this.tonic, this.keySignature).sort(() => -1)
    }

    getTriads() {
        const triads = {};

        for (let i = 1; i <= 7; i++) {
            triads[i] = ChordBuilder.triadFromScale(i, this.getAscScale());
        }

        return triads;
    }

    getDominantSeventh() {
        return ChordBuilder.dominantSeventhFromScale(this.getAscScale());
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

    getAscScale() {
        const ascScales = {
            natural: createScale(this.tonic, this.keySignature)
        };

        ascScales.harmonic = ascScales.natural.slice();
        ascScales.harmonic[6] = IntervalCalculator.calculateNoteFromInterval(new Note(`${ascScales.harmonic[6]}1`), new Interval("1 augmented")).note;
        
        ascScales.melodic = ascScales.harmonic.slice();
        ascScales.melodic[5] = IntervalCalculator.calculateNoteFromInterval(new Note(`${ascScales.melodic[5]}1`), new Interval("1 augmented")).note;
        
        return ascScales;
    }

    getDescScale() {
        const descScales = {
            natural: createScale(this.tonic, this.keySignature).sort(() => -1)
        };

        descScales.harmonic = descScales.natural.slice();
        descScales.harmonic[1] = IntervalCalculator.calculateNoteFromInterval(new Note(`${descScales.harmonic[1]}1`), new Interval("1 augmented")).note;
        
        descScales.melodic = descScales.natural.slice();
        
        return descScales;
    }

    getTriads() {
        const triads = {};

        for (let i = 1; i <= 7; i++) {
            triads[i] = ChordBuilder.triadFromScale(i, this.getAscScale().harmonic);
        }

        return triads;
    }

    getDominantSeventh() {
        return ChordBuilder.dominantSeventhFromScale(this.getAscScale().harmonic);
    }
}   

const minor = new MinorKey("F")
const major = new MajorKey("A");
console.log(minor);
console.log(minor.getTriads());
console.log(minor.getDominantSeventh());