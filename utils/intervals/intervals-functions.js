const { chromaticScale } = require("../notes/notes-utils");
const { printKeyboard, sortNotes } = require("../notes/notes-functions");
const { intervalNumbers, semitonesToIntervals } = require("./intervals-utils");

const Note = require("../notes/note.js");
const Interval = require("./interval");

const calculateDistance = (firstNote, secondNote) => {
    const keyboard = printKeyboard();

    let indexDifference = keyboard.indexOf(`${secondNote.getLetterName()}${secondNote.getOctave()}`) - keyboard.indexOf(`${firstNote.getLetterName()}${firstNote.getOctave()}`)

    return Math.abs(indexDifference) + 1;
}

const calculateSemitones = (firstNote, secondNote) => {
    let firstNoteIndex = chromaticScale.findIndex(notes => notes.includes(firstNote.getNoteWithoutOctave()));
    let secondNoteIndex = chromaticScale.findIndex(notes => notes.includes(secondNote.getNoteWithoutOctave()));

    let semitoneInterval = secondNoteIndex - firstNoteIndex;

    if (semitoneInterval >= 0) {
        return semitoneInterval;
    } else {
        return 12 + semitoneInterval;
    }
}

module.exports.calculateInterval = (firstNote, secondNote) => {
    // Calculate simple and compound interval
    let distance = calculateDistance(firstNote, secondNote);
    let simpleDistance = distance;

    while (simpleDistance > 8) {
        simpleDistance = simpleDistance % 7;
    }

    // Calculate semitones
    const notesAscending = sortNotes(firstNote, secondNote);
    let semitones = calculateSemitones(...notesAscending);
    let number = intervalNumbers[simpleDistance];
    let quality = semitonesToIntervals[semitones][number];

    const interval = new Interval(`${distance}` + `${quality ? ` ${quality}` : ""}`, semitones);

    return interval;
}

module.exports.calculateNoteFromInterval = (note, interval, asc = true) => {
    const keyboard = printKeyboard();
    let chromaticIndex = chromaticScale.findIndex(notes => notes.includes(note.getNoteWithoutOctave()));
    let semitones = interval.getSemitones();

    if (asc) {
        while (semitones > 0) {
            semitones--;
            if (chromaticIndex < chromaticScale.length - 1) {
                chromaticIndex++;
            } else {
                chromaticIndex = 0;
            }
        }
    } else {
        while (semitones > 0) {
            semitones--;
            if (chromaticIndex > 0) {
                chromaticIndex--;
            } else {
                chromaticIndex = chromaticScale.length - 1;
            }
        }
    }

    let name = `${note.getLetterName()}${note.getOctave()}`;
    let newNaturalNote;

    if (asc) {
        newNaturalNote = keyboard[keyboard.indexOf(name) + interval.getDistance() - 1];
    } else {
        newNaturalNote = keyboard[keyboard.indexOf(name) - interval.getDistance() + 1];
    }

    let chromaticAlterationIndex = chromaticScale[chromaticIndex].findIndex(note => note[0] === newNaturalNote[0]);
    let newNote = chromaticScale[chromaticIndex][chromaticAlterationIndex] + newNaturalNote.slice(newNaturalNote.length - 1);

    // MUST THROW ERROR IF chromaticAlterationIndex IS UNDEFINED
    return new Note(newNote);
}