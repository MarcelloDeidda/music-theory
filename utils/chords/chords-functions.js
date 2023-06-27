const { printKeyboard } = require("../notes/notes-functions");
const { calculateNoteFromInterval } = require("../intervals/intervals-functions");

const Interval = require("../intervals/interval");
const Note = require("../notes/note");


module.exports.majorChord = root => {
    let third = calculateNoteFromInterval(root, new Interval("3 major"));
    let fifth = calculateNoteFromInterval(root, new Interval("5 perfect"));

    return [root, third, fifth];
}

module.exports.minorChord = root => {
    // The parameter "root" MUST be a Note object
    let third = calculateNoteFromInterval(root, new Interval("3 minor"));
    let fifth = calculateNoteFromInterval(root, new Interval("5 perfect"));

    return [root, third, fifth];
}

module.exports.diminishedChord = root => {
    // The parameter "root" MUST be a Note object
    let third = calculateNoteFromInterval(root, new Interval("3 minor"));
    let fifth = calculateNoteFromInterval(root, new Interval("5 diminished"));

    return [root, third, fifth];
}

module.exports.augmentedChord = root => {
    // The parameter "root" MUST be a Note object
    let third = calculateNoteFromInterval(root, new Interval("3 major"));
    let fifth = calculateNoteFromInterval(root, new Interval("5 augmented"));

    return [root, third, fifth];
}

module.exports.dominantSeventh = root => {
    // The parameter "root" MUST be a Note object
    let third = calculateNoteFromInterval(root, new Interval("3 major"));
    let fifth = calculateNoteFromInterval(root, new Interval("5 perfect"));
    let seventh = calculateNoteFromInterval(root, new Interval("7 minor"));

    return [root, third, fifth, seventh];
}

module.exports.triadFromKey = (degree, tonic, keySignature) => {
    const keyboard = printKeyboard();

    let tonicIndex = keyboard.indexOf(`${tonic.getLetterName()}${tonic.getOctave()}`);

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