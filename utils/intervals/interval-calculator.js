const { printKeyboard, chromaticScale } = require("../notes/notes-utils");
const { intervalNumbers, semitonesToIntervals } = require("./interval-utils");
const { sortNotes } = require("../utils");

const Note = require("../notes/note.js");
const Interval = require("./interval");

const IntervalCalculator = class {
    static #calculateDistance(firstNote, secondNote) {
        const keyboard = printKeyboard();

        let indexDifference = keyboard.indexOf(`${secondNote.name}${secondNote.octave}`) - keyboard.indexOf(`${firstNote.name}${firstNote.octave}`)

        return Math.abs(indexDifference) + 1;
    }

    static #calculateSemitones(firstNote, secondNote) {
        let firstNoteIndex = chromaticScale.findIndex(notes => notes.includes(firstNote.note));
        let secondNoteIndex = chromaticScale.findIndex(notes => notes.includes(secondNote.note));

        let semitoneInterval = secondNoteIndex - firstNoteIndex;

        if (semitoneInterval >= 0) {
            return semitoneInterval;
        } else {
            return 12 + semitoneInterval;
        }
    }

    static calculateInterval(firstNote, secondNote) {
        // Calculate simple and compound interval
        let distance = this.#calculateDistance(firstNote, secondNote);
        let simpleDistance = distance;

        while (simpleDistance > 8) {
            simpleDistance = simpleDistance % 7;
        }

        // Calculate semitones
        const notesAscending = sortNotes(firstNote, secondNote);
        let semitones = this.#calculateSemitones(...notesAscending);
        let number = intervalNumbers[simpleDistance];
        let quality = semitonesToIntervals[semitones][number];

        const interval = new Interval(`${distance}` + `${quality ? ` ${quality}` : ""}`, semitones);

        return interval;
    }

    static calculateNoteFromInterval(note, interval) {
        const keyboard = printKeyboard();
        let chromaticIndex = chromaticScale.findIndex(notes => notes.includes(note.note));
        let semitones = interval.semitones;

        while (semitones > 0) {
            semitones--;
            if (chromaticIndex < chromaticScale.length - 1) {
                chromaticIndex++;
            } else {
                chromaticIndex = 0;
            }
        }

        let name = `${note.name}${note.octave}`;
        let newNaturalNote = keyboard[keyboard.indexOf(name) + interval.distance - 1];

        let chromaticAlterationIndex = chromaticScale[chromaticIndex].findIndex(note => note[0] === newNaturalNote[0]);
        let newNote = chromaticScale[chromaticIndex][chromaticAlterationIndex] + newNaturalNote.slice(newNaturalNote.length - 1);

        return new Note(newNote);
    }
}

module.exports = IntervalCalculator;