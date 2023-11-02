"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const note_1 = __importDefault(require("../utils/notes/note"));
const notes_functions_1 = require("../utils/notes/notes-functions");
(0, globals_1.describe)("Note sorting", () => {
    (0, globals_1.test)("Three unsorted notes", () => {
        const note1 = new note_1.default("F4");
        const note2 = new note_1.default("G3");
        const note3 = new note_1.default("C2");
        (0, globals_1.expect)((0, notes_functions_1.sortNotes)(note1, note2, note3).map(note => note.getNote())).toEqual(["C2", "G3", "F4"]);
    });
    (0, globals_1.test)("Three sorted notes", () => {
        const note1 = new note_1.default("F4");
        const note2 = new note_1.default("G3");
        const note3 = new note_1.default("C2");
        (0, globals_1.expect)((0, notes_functions_1.sortNotes)(note3, note2, note1).map(note => note.getNote())).toEqual(["C2", "G3", "F4"]);
    });
});
(0, globals_1.describe)("Note comparison", () => {
    (0, globals_1.test)("Higher note - Same octave, different letter name", () => {
        const note1 = new note_1.default("F4");
        const note2 = new note_1.default("G4");
        (0, globals_1.expect)((0, notes_functions_1.isNoteHigher)(note1, note2)).toBe(true);
    });
    (0, globals_1.test)("Higher note - Different octave, same letter name", () => {
        const note1 = new note_1.default("F4");
        const note2 = new note_1.default("F5");
        (0, globals_1.expect)((0, notes_functions_1.isNoteHigher)(note1, note2)).toBe(true);
    });
    (0, globals_1.test)("Higher note - Same octave, same letter name, different accidental", () => {
        const note1 = new note_1.default("F4");
        const note2 = new note_1.default("F#4");
        (0, globals_1.expect)((0, notes_functions_1.isNoteHigher)(note1, note2)).toBe(true);
    });
    (0, globals_1.test)("Lower note - Same octave, different letter name", () => {
        const note1 = new note_1.default("F4");
        const note2 = new note_1.default("C4");
        (0, globals_1.expect)((0, notes_functions_1.isNoteHigher)(note1, note2)).toBe(false);
    });
    (0, globals_1.test)("Lower note - Different octave, same letter name", () => {
        const note1 = new note_1.default("F4");
        const note2 = new note_1.default("F3");
        (0, globals_1.expect)((0, notes_functions_1.isNoteHigher)(note1, note2)).toBe(false);
    });
    (0, globals_1.test)("Lower note - Same octave, same letter name, different accidental", () => {
        const note1 = new note_1.default("F4");
        const note2 = new note_1.default("Fb4");
        (0, globals_1.expect)((0, notes_functions_1.isNoteHigher)(note1, note2)).toBe(false);
    });
});
(0, globals_1.describe)("Note in range", () => {
    let lowerNote, higherNote;
    (0, globals_1.beforeEach)(() => {
        lowerNote = new note_1.default("C4");
        higherNote = new note_1.default("C5");
    });
    (0, globals_1.test)("Note is in range - in point", () => {
        const note = new note_1.default("G4");
        (0, globals_1.expect)((0, notes_functions_1.isNoteinRange)(lowerNote, note, higherNote)).toBe(true);
    });
    (0, globals_1.test)("Note is in range - on point", () => {
        const note = new note_1.default("C4");
        (0, globals_1.expect)((0, notes_functions_1.isNoteinRange)(lowerNote, note, higherNote)).toBe(true);
    });
    (0, globals_1.test)("Note is not in range - out point", () => {
        const note = new note_1.default("G3");
        (0, globals_1.expect)((0, notes_functions_1.isNoteinRange)(lowerNote, note, higherNote)).toBe(false);
    });
    (0, globals_1.test)("Note is not in range - off point", () => {
        const note = new note_1.default("B3");
        (0, globals_1.expect)((0, notes_functions_1.isNoteinRange)(lowerNote, note, higherNote)).toBe(false);
    });
    (0, globals_1.test)("Note is not in range - with accidentals", () => {
        const note = new note_1.default("Cb4");
        (0, globals_1.expect)((0, notes_functions_1.isNoteinRange)(lowerNote, note, higherNote)).toBe(false);
    });
});
(0, globals_1.describe)("Available accidentals", () => {
    (0, globals_1.test)("Until Grade Three", () => {
        (0, globals_1.expect)((0, notes_functions_1.availableAccidentals)(3)).toEqual(["b", null, "#"]);
    });
    (0, globals_1.test)("After Grade Three", () => {
        (0, globals_1.expect)((0, notes_functions_1.availableAccidentals)(4)).toEqual(["B", "b", null, "#", "x"]);
    });
});
