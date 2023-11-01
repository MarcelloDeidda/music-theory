"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.availableIntervalQualities = exports.availableIntervalNumbers = exports.calculateNoteFromInterval = exports.calculateInterval = void 0;
const notes_utils_1 = require("../notes/notes-utils");
const notes_functions_1 = require("../notes/notes-functions");
const intervals_utils_1 = require("./intervals-utils");
const note_1 = __importDefault(require("../notes/note"));
const interval_1 = __importDefault(require("./interval"));
// Calculate the number of the interval
const calculateDistance = (firstNote, secondNote) => {
    const keyboard = (0, notes_functions_1.printKeyboard)();
    let indexDifference = keyboard.indexOf(`${secondNote.getLetterName()}${secondNote.getOctave()}`) - keyboard.indexOf(`${firstNote.getLetterName()}${firstNote.getOctave()}`);
    return Math.abs(indexDifference) + 1;
};
// Calculate the number of semitones
const calculateSemitones = (firstNote, secondNote) => {
    let firstNoteIndex = notes_utils_1.chromaticScale.findIndex(notes => notes.includes(firstNote.getNoteWithoutOctave()));
    let secondNoteIndex = notes_utils_1.chromaticScale.findIndex(notes => notes.includes(secondNote.getNoteWithoutOctave()));
    let semitoneInterval = secondNoteIndex - firstNoteIndex;
    if (semitoneInterval >= 0) {
        return semitoneInterval;
    }
    else {
        return 12 + semitoneInterval;
    }
};
// Calculate interval from two note Objects
const calculateInterval = (firstNote, secondNote) => {
    // Calculate simple and compound interval
    let distance = calculateDistance(firstNote, secondNote);
    let simpleDistance = distance;
    while (simpleDistance > 8) {
        simpleDistance = simpleDistance % 7;
    }
    // Calculate semitones
    const notesAscending = (0, notes_functions_1.sortNotes)(firstNote, secondNote);
    let semitones = calculateSemitones(notesAscending[0], notesAscending[1]);
    let number = intervals_utils_1.intervalNumbers[simpleDistance];
    let quality = intervals_utils_1.semitonesToIntervals[semitones][number];
    const interval = new interval_1.default(`${quality ? `${quality} ` : ""}${distance}`, semitones);
    return interval;
};
exports.calculateInterval = calculateInterval;
// Calculate Note from Note object and Interval object (optional ascending argument)
const calculateNoteFromInterval = (note, interval, direction) => {
    const keyboard = (0, notes_functions_1.printKeyboard)();
    let chromaticIndex = notes_utils_1.chromaticScale.findIndex(notes => notes.includes(note.getNoteWithoutOctave()));
    let semitones = interval.getSemitones();
    if (direction === "asc") {
        while (semitones > 0) {
            semitones--;
            if (chromaticIndex < notes_utils_1.chromaticScale.length - 1) {
                chromaticIndex++;
            }
            else {
                chromaticIndex = 0;
            }
        }
    }
    else {
        while (semitones > 0) {
            semitones--;
            if (chromaticIndex > 0) {
                chromaticIndex--;
            }
            else {
                chromaticIndex = notes_utils_1.chromaticScale.length - 1;
            }
        }
    }
    let name = `${note.getLetterName()}${note.getOctave()}`;
    let newNaturalNote;
    if (direction === "asc") {
        newNaturalNote = keyboard[keyboard.indexOf(name) + interval.getDistance() - 1];
    }
    else {
        newNaturalNote = keyboard[keyboard.indexOf(name) - interval.getDistance() + 1];
    }
    let chromaticAlterationIndex = notes_utils_1.chromaticScale[chromaticIndex].findIndex(note => note[0] === newNaturalNote[0]);
    let newNote = notes_utils_1.chromaticScale[chromaticIndex][chromaticAlterationIndex] + newNaturalNote.slice(newNaturalNote.length - 1);
    return new note_1.default(newNote);
};
exports.calculateNoteFromInterval = calculateNoteFromInterval;
const availableIntervalNumbers = () => {
    const availableNumbers = [];
    for (let number in intervals_utils_1.intervalNumbers) {
        availableNumbers.push(intervals_utils_1.intervalNumbers[number]);
    }
    return availableNumbers;
};
exports.availableIntervalNumbers = availableIntervalNumbers;
const availableIntervalQualities = (grade) => {
    const availableQualities = ["minor", "perfect", "major"];
    if (grade > 3) {
        availableQualities.unshift("diminished");
        availableQualities.push("augmented");
    }
    return availableQualities;
};
exports.availableIntervalQualities = availableIntervalQualities;
