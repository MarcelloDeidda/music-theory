const { notes, printKeyboard } = require("../notes/notes-utils");
const { MajorKey, MinorKey } = require("./key");
const IntervalCalculator = require("../intervals/interval-calculator");
const Interval = require("../intervals/interval");
const Note = require("../notes/note");

module.exports.printAccidentals = keyConfig => {
    const accidentals = [];

    if (keyConfig.type === "#") {
        for (let i = 0; i < keyConfig.number; i++) {
            accidentals.push(`${notes[this.accidentalsIndexes[i]]}#`);
        }
    } else if (keyConfig.type === "b") {
        for (let i = 0; i < keyConfig.number; i++) {
            accidentals.push(`${notes[this.accidentalsIndexes[this.accidentalsIndexes.length - i - 1]]}b`);
        }
    }

    return accidentals;
}

module.exports.getKeySignature = key => {
    const keyInfo = key.split(" ");

    let tonic;
    let mode = keyInfo[1];

    if (mode === "major") {
        tonic = {
            note: keyInfo[0]
        };
    } else if (mode === "minor") {
        tonic = IntervalCalculator.calculateNoteFromInterval(new Note(`${keyInfo[0]}1`), new Interval("3 minor"));
    }

    return this.printAccidentals(this.keys[tonic.note]);
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

    let tonicIndex = keyboard.indexOf(`${tonic.name}${tonic.octave}`);
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

module.exports.availableKeys = grade => {
    const keys = [
        new MajorKey("C"),
        new MajorKey("G"),
        new MajorKey("D"),
        new MajorKey("F"),
    ]

    if (grade > 1) {
        ["A", "Bb", "Eb"].map(tonic => keys.push(new MajorKey(tonic)));
        ["A", "E", "D"].map(tonic => keys.push(new MinorKey(tonic)));
    }

    if (grade > 2) {
        ["Ab", "E"].map(tonic => keys.push(new MajorKey(tonic)));
        ["B", "F#", "C#", "G", "C", "F"].map(tonic => keys.push(new MinorKey(tonic)));
    }

    if (grade > 3) {
        ["Db", "B"].map(tonic => keys.push(new MajorKey(tonic)));
        ["Bb", "G#"].map(tonic => keys.push(new MinorKey(tonic)));
    }

    if (grade > 4) {
        ["Gb", "F#"].map(tonic => keys.push(new MajorKey(tonic)));
        ["Eb", "D#"].map(tonic => keys.push(new MinorKey(tonic)));
    }

    return keys;
}