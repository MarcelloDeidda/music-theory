import { chromaticScale } from "../notes/notes-utils";
import { printKeyboard, sortNotes } from "../notes/notes-functions";
import { intervalNumbers, semitonesToIntervals } from "./intervals-utils";

import Note from "../notes/note";
import Interval from "./interval";

import { IntervalInterface, NoteInterface } from "../../ts/interfaces/interfaces";
import { directionType, gradeType } from "../../ts/types/types";

// Calculate the number of the interval
const calculateDistance = (firstNote: NoteInterface, secondNote: NoteInterface): number => {
    const keyboard = printKeyboard();

    let indexDifference = keyboard.indexOf(`${secondNote.getLetterName()}${secondNote.getOctave()}`) - keyboard.indexOf(`${firstNote.getLetterName()}${firstNote.getOctave()}`)

    return Math.abs(indexDifference) + 1;
}

// Calculate the number of semitones
const calculateSemitones = (firstNote: NoteInterface, secondNote: NoteInterface): number => {
    let firstNoteIndex = chromaticScale.findIndex(notes => notes.includes(firstNote.getNoteWithoutOctave()));
    let secondNoteIndex = chromaticScale.findIndex(notes => notes.includes(secondNote.getNoteWithoutOctave()));

    let semitoneInterval = secondNoteIndex - firstNoteIndex;

    if (semitoneInterval >= 0) {
        return semitoneInterval;
    } else {
        return 12 + semitoneInterval;
    }
}

// Calculate interval from two note Objects
export const calculateInterval = (firstNote: NoteInterface, secondNote: NoteInterface): IntervalInterface => {
    // Calculate simple and compound interval
    let distance = calculateDistance(firstNote, secondNote);
    let simpleDistance = distance;

    while (simpleDistance > 8) {
        simpleDistance = simpleDistance % 7;
    }

    // Calculate semitones
    const notesAscending = sortNotes(firstNote, secondNote);
    let semitones = calculateSemitones(notesAscending[0], notesAscending[1]);
    let number = intervalNumbers[simpleDistance];
    let quality = semitonesToIntervals[semitones][number];

    const interval = new Interval(`${quality ? `${quality} ` : ""}${distance}`, semitones);

    return interval;
}

// Calculate Note from Note object and Interval object (optional ascending argument)
export const calculateNoteFromInterval = (note: NoteInterface, interval: IntervalInterface, direction: directionType): NoteInterface => {
    const keyboard = printKeyboard();
    let chromaticIndex = chromaticScale.findIndex(notes => notes.includes(note.getNoteWithoutOctave()));
    let semitones = interval.getSemitones();

    if (direction === "asc") {
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
    let newNaturalNote: string;

    if (direction === "asc") {
        newNaturalNote = keyboard[keyboard.indexOf(name) + interval.getDistance() - 1];
    } else {
        newNaturalNote = keyboard[keyboard.indexOf(name) - interval.getDistance() + 1];
    }

    let chromaticAlterationIndex = chromaticScale[chromaticIndex].findIndex(note => note[0] === newNaturalNote[0]);
    let newNote = chromaticScale[chromaticIndex][chromaticAlterationIndex] + newNaturalNote.slice(newNaturalNote.length - 1);

    return new Note(newNote);
}

export const availableIntervalNumbers = (): string[] => {
    const availableNumbers = [];

    for (let number in intervalNumbers) {
        availableNumbers.push(intervalNumbers[number])
    }

    return availableNumbers;
}

export const availableIntervalQualities = (grade: gradeType): string[] => {
    const availableQualities = ["minor", "perfect", "major"];

    if (grade > 3) {
        availableQualities.unshift("diminished");
        availableQualities.push("augmented");
    }

    return availableQualities;
}