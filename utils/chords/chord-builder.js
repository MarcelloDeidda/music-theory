const IntervalCalculator = require("../intervals/interval-calculator");
const Interval = require("../intervals/interval");
const Note = require("../notes/note");
const { getKeySignature } = require("../keys/keys-utils");
const { printKeyboard } = require("../notes/notes-utils");

const ChordBuilder = class {
    // The parameter "root" MUST be a Note object
    static majorChord(root) {
        let third = IntervalCalculator.calculateNoteFromInterval(root, new Interval("3 major"));
        let fifth = IntervalCalculator.calculateNoteFromInterval(root, new Interval("5 perfect"));

        return [root, third, fifth];
    }
    
    static minorChord(root) {
        // The parameter "root" MUST be a Note object
        let third = IntervalCalculator.calculateNoteFromInterval(root, new Interval("3 minor"));
        let fifth = IntervalCalculator.calculateNoteFromInterval(root, new Interval("5 perfect"));

        return [root, third, fifth];
    }
    
    static diminishedChord(root) {
        // The parameter "root" MUST be a Note object
        let third = IntervalCalculator.calculateNoteFromInterval(root, new Interval("3 minor"));
        let fifth = IntervalCalculator.calculateNoteFromInterval(root, new Interval("5 diminished"));

        return [root, third, fifth];
    }
    
    static augmentedChord(root) {
        // The parameter "root" MUST be a Note object
        let third = IntervalCalculator.calculateNoteFromInterval(root, new Interval("3 major"));
        let fifth = IntervalCalculator.calculateNoteFromInterval(root, new Interval("5 augmented"));

        return [root, third, fifth];
    }

    static dominantSeventh(root) {
        // The parameter "root" MUST be a Note object
        let third = IntervalCalculator.calculateNoteFromInterval(root, new Interval("3 major"));
        let fifth = IntervalCalculator.calculateNoteFromInterval(root, new Interval("5 perfect"));
        let seventh = IntervalCalculator.calculateNoteFromInterval(root, new Interval("7 minor"));

        return [root, third, fifth, seventh];
    }

    static triadFromKey(degree, tonic, mode) {
        const keySignature = getKeySignature(`${tonic.note} ${mode}`);
        const keyboard = printKeyboard();

        let tonicIndex = keyboard.indexOf(`${tonic.name}${tonic.octave}`);

        let root = keyboard[tonicIndex + degree - 1];
        let third = keyboard[tonicIndex + degree + 2 - 1];
        let fifth = keyboard[tonicIndex + degree + 4 - 1];

        for (let acc of keySignature) {
            if (root.slice(0, root.length - 1) === acc[0]) {
                root = acc + root.slice(root.length - 1);
            }
            
            if (third.slice(0, third.length - 1) === acc[0]) {
                third = acc + third.slice(third.length - 1);
            }
            
            if (fifth.slice(0, fifth.length - 1) === acc[0]) {
                fifth = acc + fifth.slice(fifth.length - 1);
            }
        }

        return [
            new Note(root),
            new Note(third),
            new Note(fifth)
        ];
    }

    static dominantSeventhFromScale(scale) {
        const doubleScale = scale.concat(scale.slice(1, 4));

        let root = doubleScale[4];
        let third = doubleScale[6];
        let fifth = doubleScale[8];
        let seventh = doubleScale[10];

        return [root, third, fifth, seventh];
    }
}

module.exports = ChordBuilder;