const { notes } = require("../notes/notes-utils");
const { printKeyboard } = require("../notes/notes-functions");
const { calculateNoteFromInterval } = require("../intervals/intervals-functions");
const { keys, accidentalsIndexes } = require("./keys-utils");

const Interval = require("../intervals/interval");
const Note = require("../notes/note");

// Return accidentals from keyConfig as object (e.g.: { type: "#", number: 2})
module.exports.printAccidentals = keyConfig => {
    const accidentals = [];

    if (keyConfig.type === "#") {
        for (let i = 0; i < keyConfig.number; i++) {
            accidentals.push(`${notes[accidentalsIndexes[i]]}#`);
        }
    } else if (keyConfig.type === "b") {
        for (let i = 0; i < keyConfig.number; i++) {
            accidentals.push(`${notes[accidentalsIndexes[accidentalsIndexes.length - i - 1]]}b`);
        }
    }

    return accidentals;
}

// Returns key signature as Array from key as string (e.g.: "D major")
module.exports.getKeySignature = key => {
    const keyInfo = key.split(" ");

    let tonic;
    let mode = keyInfo[1];

    if (mode === "major") {
        tonic = new Note(`${keyInfo[0]}1`);
    } else if (mode === "minor") {
        tonic = calculateNoteFromInterval(new Note(`${keyInfo[0]}1`), new Interval("minor 3"));
    }

    return this.printAccidentals(keys[tonic.getNoteWithoutOctave()]);
}