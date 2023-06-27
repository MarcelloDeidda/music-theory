const { notes } = require("../notes/notes-utils");
const { printKeyboard } = require("../notes/notes-functions");
const { calculateNoteFromInterval } = require("../intervals/intervals-functions");
const { keys, accidentalsIndexes } = require("./keys-utils");

const Interval = require("../intervals/interval");
const Note = require("../notes/note");

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

module.exports.getKeySignature = key => {
    const keyInfo = key.split(" ");

    let tonic;
    let mode = keyInfo[1];

    if (mode === "major") {
        tonic = new Note(`${keyInfo[0]}1`);
    } else if (mode === "minor") {
        tonic = calculateNoteFromInterval(new Note(`${keyInfo[0]}1`), new Interval("3 minor"));
    }

    return this.printAccidentals(keys[tonic.getNoteWithoutOctave()]);
}
/*
module.exports.createScale = (tonic, keySignature) => {
    let index = notes.indexOf(tonic[0].toUpperCase());
    let scale = notes.slice(index).concat(notes.slice(0, index + 1));

    for (let acc of keySignature) {
        scale = scale.map(note => {
            if (note === acc[0]) {
                return acc;
            } else {
                return note;
            }
        });
    }

    return scale;
}*/

module.exports.scaleFromKey = (tonic, keySignature) => {
    const keyboard = printKeyboard();

    let tonicIndex = keyboard.indexOf(`${tonic.getLetterName()}${tonic.getOctave()}`);
    const scale = [];

    for (let i = 0; i < 8; i++) {
        scale.push(keyboard[tonicIndex + i]);
    }

    for (let i = 0; i < 8; i++) {
        for (let acc of keySignature) {
            if (scale[i].slice(0, scale[i].length - 1) === acc[0]) {
                scale[i] = acc + scale[i].slice(scale[i].length - 1);
            }
        }
    }

    return scale.map(note => new Note(note));
}