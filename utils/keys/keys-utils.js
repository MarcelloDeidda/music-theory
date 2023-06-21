const { notes, printKeyboard } = require("../notes/notes-utils");

const IntervalCalculator = require("../intervals/interval-calculator");
const Interval = require("../intervals/interval");
const Note = require("../notes/note");

module.exports.scaleDegrees = [
    "tonic",
    "supertonic",
    "mediant",
    "subdominant",
    "dominant",
    "submediant",
    "leading note"
]

module.exports.keys = {
    "Cb": {
        type: "b",
        number: 7
    },
    "C": {
        type: null,
        number: 0
    },
    "C#": {
        type: "#",
        number: 7
    },
    "Db": {
        type: "b",
        number: 5
    },
    "D": {
        type: "#",
        number: 2
    },
    "Eb": {
        type: "b",
        number: 3
    },
    "E": {
        type: "#",
        number: 4
    },
    "F": {
        type: "b",
        number: 1
    },
    "F#": {
        type: "#",
        number: 6
    },
    "Gb": {
        type: "b",
        number: 6
    },
    "G": {
        type: "#",
        number: 1
    },
    "Ab": {
        type: "b",
        number: 4
    },
    "A": {
        type: "#",
        number: 3
    },
    "Bb": {
        type: "b",
        number: 2
    },
    "B": {
        type: "#",
        number: 5
    }
}

module.exports.accidentalsIndexes = [3, 0, 4, 1, 5, 2, 6];

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