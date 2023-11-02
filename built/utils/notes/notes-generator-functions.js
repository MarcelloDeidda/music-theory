"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomNaturalNote = exports.generateRandomNoteNoDouble = exports.generateRandomNote = void 0;
const notes_utils_1 = require("./notes-utils");
const notes_functions_1 = require("./notes-functions");
const note_1 = __importDefault(require("./note"));
// This function returns a random note
const generateRandomNote = (lowerNote, higherNote) => {
    let octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
    let note = notes_utils_1.notes[Math.floor(Math.random() * 7)];
    let accidental = notes_utils_1.accidentals[Math.floor(Math.random() * 5)];
    let randomNote = new note_1.default(`${note}${accidental}${octave}`);
    while (!(0, notes_functions_1.isNoteinRange)(lowerNote, randomNote, higherNote)) {
        octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
        note = notes_utils_1.notes[Math.floor(Math.random() * 7)];
        accidental = notes_utils_1.accidentals[Math.floor(Math.random() * 5)];
        randomNote = new note_1.default(`${note}${accidental}${octave}`);
    }
    return randomNote;
};
exports.generateRandomNote = generateRandomNote;
// This function returns a random note avoiding double accidentals
const generateRandomNoteNoDouble = (lowerNote, higherNote) => {
    let octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
    let note = notes_utils_1.notes[Math.floor(Math.random() * 7)];
    let accidental = notes_utils_1.accidentals[Math.ceil(Math.random() * 3)];
    let randomNote = new note_1.default(`${note}${accidental}${octave}`);
    while (!(0, notes_functions_1.isNoteinRange)(lowerNote, randomNote, higherNote)) {
        octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
        note = notes_utils_1.notes[Math.floor(Math.random() * 7)];
        accidental = notes_utils_1.accidentals[Math.ceil(Math.random() * 3)];
        randomNote = new note_1.default(`${note}${accidental}${octave}`);
    }
    return randomNote;
};
exports.generateRandomNoteNoDouble = generateRandomNoteNoDouble;
// This function returns a random note avoiding accidentals
const generateRandomNaturalNote = (lowerNote, higherNote) => {
    let octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
    let note = notes_utils_1.notes[Math.floor(Math.random() * 7)];
    let randomNote = new note_1.default(`${note}${octave}`);
    while (!(0, notes_functions_1.isNoteinRange)(lowerNote, randomNote, higherNote)) {
        octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
        note = notes_utils_1.notes[Math.floor(Math.random() * 7)];
        randomNote = new note_1.default(`${note}${octave}`);
    }
    return randomNote;
};
exports.generateRandomNaturalNote = generateRandomNaturalNote;
/*
// This function returns a random note from a scale (list of Note objects)
export const getRandomNoteFromScale = (scale: any[]) => {
    let random = Math.floor(Math.random() * 8);

    return scale[random];
}*/ 
