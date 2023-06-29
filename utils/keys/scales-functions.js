const Interval = require("../intervals/interval");
const { calculateNoteFromInterval } = require("../intervals/intervals-functions");

const Note = require("../notes/note");

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

module.exports.createChromaticScale = (startingNote, asc = true) => {
    const intervals = ["augmented 1", "minor 2"];
    const chromaticScale = [];

    chromaticScale.push(startingNote);

    for (let i = 0; i < 11; i++) {
        let random = Math.floor(Math.random() * 2);
        let nextNote = calculateNoteFromInterval(chromaticScale[chromaticScale.length - 1], new Interval(intervals[random]), asc);

        while (
            nextNote.getNoteWithoutOctave === "undefined" ||
            (
                chromaticScale.length > 2 &&
                chromaticScale[chromaticScale.length - 1].getLetterName() === nextNote.getLetterName() &&
                chromaticScale[chromaticScale.length - 2].getLetterName() === nextNote.getLetterName()
            ) ||
            (nextNote.getAccidentalInSemitones() < -1 || nextNote.getAccidentalInSemitones() > 1)
        ) {
            random = random === 0 ? 1 : 0;
            nextNote = calculateNoteFromInterval(chromaticScale[chromaticScale.length - 1], new Interval(intervals[random]), asc);
        }

        chromaticScale.push(nextNote);
    }
    chromaticScale.push(calculateNoteFromInterval(startingNote, new Interval("perfect 8"), asc));
    
    return chromaticScale;
}