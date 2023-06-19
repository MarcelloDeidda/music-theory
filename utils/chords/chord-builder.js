const IntervalCalculator = require("../intervals/interval-calculator");
const Interval = require("../intervals/interval");
const Note = require("../notes/note");

const ChordBuilder = class {
    // The parameter "tonic" MUST be a Note object
    static majorChord(tonic) {
        let third = IntervalCalculator.calculateNoteFromInterval(tonic, new Interval("3 major"));
        let fifth = IntervalCalculator.calculateNoteFromInterval(tonic, new Interval("5 perfect"));

        return [tonic, third, fifth];
    }
    
    static minorChord(tonic) {
        // The parameter "tonic" MUST be a Note object
        let third = IntervalCalculator.calculateNoteFromInterval(tonic, new Interval("3 minor"));
        let fifth = IntervalCalculator.calculateNoteFromInterval(tonic, new Interval("5 perfect"));

        return [tonic, third, fifth];
    }
    
    static diminishedChord(tonic) {
        // The parameter "tonic" MUST be a Note object
        let third = IntervalCalculator.calculateNoteFromInterval(tonic, new Interval("3 minor"));
        let fifth = IntervalCalculator.calculateNoteFromInterval(tonic, new Interval("5 diminished"));

        return [tonic, third, fifth];
    }
    
    static augmentedChord(tonic) {
        // The parameter "tonic" MUST be a Note object
        let third = IntervalCalculator.calculateNoteFromInterval(tonic, new Interval("3 major"));
        let fifth = IntervalCalculator.calculateNoteFromInterval(tonic, new Interval("5 augmented"));

        return [tonic, third, fifth];
    }

    static dominantSeventh(tonic) {
        // The parameter "tonic" MUST be a Note object
        let third = IntervalCalculator.calculateNoteFromInterval(tonic, new Interval("3 major"));
        let fifth = IntervalCalculator.calculateNoteFromInterval(tonic, new Interval("5 perfect"));
        let seventh = IntervalCalculator.calculateNoteFromInterval(tonic, new Interval("7 minor"));

        return [tonic, third, fifth, seventh];
    }

    static triadFromScale(root, scale) {
        // Root is the degree of the scale as a number
        const doubleScale = scale.concat(scale.slice(1, 4));
        let index = root -1;

        let tonic = doubleScale[index];
        let third = doubleScale[index + 2];
        let fifth = doubleScale[index + 4];

        return [tonic, third, fifth];
    }

    static dominantSeventhFromScale(scale) {
        const doubleScale = scale.concat(scale.slice(1, 4));

        let tonic = doubleScale[4];
        let third = doubleScale[6];
        let fifth = doubleScale[8];
        let seventh = doubleScale[10];

        return [tonic, third, fifth, seventh];
    }
}

module.exports = ChordBuilder;