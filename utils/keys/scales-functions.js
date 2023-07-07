const Interval = require("../intervals/interval");
const { calculateNoteFromInterval } = require("../intervals/intervals-functions");
const { printKeyboard} = require("../../utils/notes/notes-functions")

const Note = require("../notes/note");

// Create scale from Note object and keySignature (as Array)
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

// Create chromatic scale from Note object
module.exports.createChromaticScale = (startingNote, asc = true) => {
    const intervals = ["augmented 1", "minor 2"];
    let chromaticScale = [];

    chromaticScale.push(startingNote);

    while (chromaticScale.length < 12) {
        let random = Math.floor(Math.random() * 2);
        let nextNote = calculateNoteFromInterval(chromaticScale[chromaticScale.length - 1], new Interval(intervals[random]), asc);

        while (
            nextNote.getNoteWithoutOctave === "undefined" ||
            (nextNote.getAccidentalInSemitones() < -1 || nextNote.getAccidentalInSemitones() > 1)
        ) {
            random = random === 0 ? 1 : 0;
            nextNote = calculateNoteFromInterval(chromaticScale[chromaticScale.length - 1], new Interval(intervals[random]), asc);
        }
        
        if (
            (
                chromaticScale.length > 1 &&
                chromaticScale[chromaticScale.length - 1].getLetterName() === nextNote.getLetterName() &&
                chromaticScale[chromaticScale.length - 2].getLetterName() === nextNote.getLetterName()
            ) ||
            (
                chromaticScale.length === 11 &&
                chromaticScale[chromaticScale.length - 1].getLetterName() === nextNote.getLetterName() &&
                chromaticScale[0].getLetterName() === nextNote.getLetterName()
            ) ||
            (
                chromaticScale.length === 11 &&
                (
                    (asc && ![-1, 0, 6].includes(nextNote.getLetterName().charCodeAt() - startingNote.getLetterName().charCodeAt())) ||
                    (!asc && ![1, 0, -6].includes(nextNote.getLetterName().charCodeAt() - startingNote.getLetterName().charCodeAt())))
            ) 
        ) {
            chromaticScale.pop();

            if (chromaticScale.length > 2) {
                chromaticScale.pop();
            }

            continue;
        }

        chromaticScale.push(nextNote);
    }
    
    chromaticScale.push(calculateNoteFromInterval(startingNote, new Interval("perfect 8"), asc));

    return chromaticScale;
}