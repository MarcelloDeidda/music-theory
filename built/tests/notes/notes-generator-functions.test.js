"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const notes_functions_1 = require("../../utils/notes/notes-functions");
const notes_generator_functions_1 = require("../../utils/notes/notes-generator-functions");
const note_1 = __importDefault(require("../../utils/notes/note"));
(0, globals_1.describe)("Generate random note", () => {
    const note1 = new note_1.default("C#2");
    const note2 = new note_1.default("Gb5");
    (0, globals_1.test)("Note is in range", () => {
        for (let i = 0; i < 100; i++) {
            const note3 = (0, notes_generator_functions_1.generateRandomNote)(note1, note2);
            (0, globals_1.expect)((0, notes_functions_1.isNoteinRange)(note1, note3, note2)).toBe(true);
        }
    });
    (0, globals_1.test)("All accidentals are available", () => {
        let sharpNote;
        let flatNote;
        let naturalNote;
        let doubleSharpNote;
        let doubleFlatNote;
        for (let i = 0; i < 100; i++) {
            const note3 = (0, notes_generator_functions_1.generateRandomNote)(note1, note2);
            switch (note3.getAccidental()) {
                case "#":
                    sharpNote = note3;
                case "b":
                    flatNote = note3;
                case null:
                    naturalNote = note3;
                case "x":
                    doubleSharpNote = note3;
                case "B":
                    doubleFlatNote = note3;
            }
        }
        (0, globals_1.expect)(sharpNote).not.toBe(undefined);
        (0, globals_1.expect)(flatNote).not.toBe(undefined);
        (0, globals_1.expect)(naturalNote).not.toBe(undefined);
        (0, globals_1.expect)(doubleSharpNote).not.toBe(undefined);
        (0, globals_1.expect)(doubleFlatNote).not.toBe(undefined);
    });
});
(0, globals_1.describe)("Generate random note no double", () => {
    const note1 = new note_1.default("C#2");
    const note2 = new note_1.default("Gb5");
    (0, globals_1.test)("Note is in range", () => {
        for (let i = 0; i < 100; i++) {
            const note3 = (0, notes_generator_functions_1.generateRandomNoteNoDouble)(note1, note2);
            (0, globals_1.expect)((0, notes_functions_1.isNoteinRange)(note1, note3, note2)).toBe(true);
        }
    });
    (0, globals_1.test)("Simple accidentals are available", () => {
        let sharpNote;
        let flatNote;
        let naturalNote;
        let doubleSharpNote;
        let doubleFlatNote;
        for (let i = 0; i < 100; i++) {
            const note3 = (0, notes_generator_functions_1.generateRandomNoteNoDouble)(note1, note2);
            switch (note3.getAccidental()) {
                case "#":
                    sharpNote = note3;
                    break;
                case "b":
                    flatNote = note3;
                    break;
                case null:
                    naturalNote = note3;
                    break;
                case "x":
                    doubleSharpNote = note3;
                    break;
                case "B":
                    doubleFlatNote = note3;
                    break;
            }
        }
        (0, globals_1.expect)(sharpNote).not.toBe(undefined);
        (0, globals_1.expect)(flatNote).not.toBe(undefined);
        (0, globals_1.expect)(naturalNote).not.toBe(undefined);
        (0, globals_1.expect)(doubleSharpNote).toBe(undefined);
        (0, globals_1.expect)(doubleFlatNote).toBe(undefined);
    });
});
(0, globals_1.describe)("Generate random natural note", () => {
    const note1 = new note_1.default("C#2");
    const note2 = new note_1.default("Gb5");
    (0, globals_1.test)("Note is in range", () => {
        for (let i = 0; i < 100; i++) {
            const note3 = (0, notes_generator_functions_1.generateRandomNaturalNote)(note1, note2);
            (0, globals_1.expect)((0, notes_functions_1.isNoteinRange)(note1, note3, note2)).toBe(true);
        }
    });
    (0, globals_1.test)("Simple accidentals are available", () => {
        let sharpNote;
        let flatNote;
        let naturalNote;
        let doubleSharpNote;
        let doubleFlatNote;
        for (let i = 0; i < 100; i++) {
            const note3 = (0, notes_generator_functions_1.generateRandomNaturalNote)(note1, note2);
            switch (note3.getAccidental()) {
                case "#":
                    sharpNote = note3;
                    break;
                case "b":
                    flatNote = note3;
                    break;
                case null:
                    naturalNote = note3;
                    break;
                case "x":
                    doubleSharpNote = note3;
                    break;
                case "B":
                    doubleFlatNote = note3;
                    break;
            }
        }
        (0, globals_1.expect)(sharpNote).toBe(undefined);
        (0, globals_1.expect)(flatNote).toBe(undefined);
        (0, globals_1.expect)(naturalNote).not.toBe(undefined);
        (0, globals_1.expect)(doubleSharpNote).toBe(undefined);
        (0, globals_1.expect)(doubleFlatNote).toBe(undefined);
    });
});
