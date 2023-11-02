"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const note_1 = __importDefault(require("../../utils/notes/note"));
const interval_1 = __importDefault(require("../../utils/intervals/interval"));
const intervals_functions_1 = require("../../utils/intervals/intervals-functions");
(0, globals_1.describe)("Calculate interval", () => {
    const note1 = new note_1.default("G4");
    (0, globals_1.test)("Minor 2nd", () => {
        const note2 = new note_1.default("Ab4");
        (0, globals_1.expect)((0, intervals_functions_1.calculateInterval)(note1, note2).getInterval()).toEqual("minor 2");
    });
    (0, globals_1.test)("Doubly augmented 2nd", () => {
        const note2 = new note_1.default("Ax4");
        (0, globals_1.expect)((0, intervals_functions_1.calculateInterval)(note1, note2).getInterval()).toEqual("2");
    });
    (0, globals_1.test)("Major 3rd", () => {
        const note2 = new note_1.default("B4");
        (0, globals_1.expect)((0, intervals_functions_1.calculateInterval)(note1, note2).getInterval()).toEqual("major 3");
    });
    (0, globals_1.test)("perfect 4", () => {
        const note2 = new note_1.default("C5");
        (0, globals_1.expect)((0, intervals_functions_1.calculateInterval)(note1, note2).getInterval()).toEqual("perfect 4");
    });
    (0, globals_1.test)("augmented 4", () => {
        const note2 = new note_1.default("C#5");
        (0, globals_1.expect)((0, intervals_functions_1.calculateInterval)(note1, note2).getInterval()).toEqual("augmented 4");
    });
    (0, globals_1.test)("diminished 5", () => {
        const note2 = new note_1.default("Db5");
        (0, globals_1.expect)((0, intervals_functions_1.calculateInterval)(note1, note2).getInterval()).toEqual("diminished 5");
    });
    (0, globals_1.test)("major 6", () => {
        const note2 = new note_1.default("E5");
        (0, globals_1.expect)((0, intervals_functions_1.calculateInterval)(note1, note2).getInterval()).toEqual("major 6");
    });
    (0, globals_1.test)("minor 7", () => {
        const note2 = new note_1.default("F5");
        (0, globals_1.expect)((0, intervals_functions_1.calculateInterval)(note1, note2).getInterval()).toEqual("minor 7");
    });
    (0, globals_1.test)("perfect 8", () => {
        const note2 = new note_1.default("G5");
        (0, globals_1.expect)((0, intervals_functions_1.calculateInterval)(note1, note2).getInterval()).toEqual("perfect 8");
    });
    (0, globals_1.test)("minor 10", () => {
        const note2 = new note_1.default("Bb5");
        (0, globals_1.expect)((0, intervals_functions_1.calculateInterval)(note1, note2).getInterval()).toEqual("minor 10");
    });
});
(0, globals_1.describe)("Calculate note from interval", () => {
    const note = new note_1.default("G4");
    (0, globals_1.test)("Ascending dinimished 4", () => {
        const interval = new interval_1.default("dinimished 4", 4);
        (0, globals_1.expect)((0, intervals_functions_1.calculateNoteFromInterval)(note, interval, "asc").getNote()).toBe("Cb5");
    });
    (0, globals_1.test)("Descending augmented 5", () => {
        const interval = new interval_1.default("augmented 5", 8);
        (0, globals_1.expect)((0, intervals_functions_1.calculateNoteFromInterval)(note, interval, "desc").getNote()).toBe("Cb4");
    });
    (0, globals_1.test)("Ascending (not specified) augmented 8", () => {
        const interval = new interval_1.default("augmented 8", 13);
        (0, globals_1.expect)((0, intervals_functions_1.calculateNoteFromInterval)(note, interval).getNote()).toBe("G#5");
    });
});
(0, globals_1.describe)("Available interval utils", () => {
    (0, globals_1.test)("Interval numbers", () => {
        (0, globals_1.expect)((0, intervals_functions_1.availableIntervalNumbers)()).toEqual([
            "unison",
            "second",
            "third",
            "fourth",
            "fifth",
            "sixth",
            "seventh",
            "octave"
        ]);
    });
    (0, globals_1.test)("Interval qualities up to Grade Three", () => {
        (0, globals_1.expect)((0, intervals_functions_1.availableIntervalQualities)(3)).toEqual([
            "minor",
            "perfect",
            "major"
        ]);
    });
    (0, globals_1.test)("After Grade Three", () => {
        (0, globals_1.expect)((0, intervals_functions_1.availableIntervalQualities)(4)).toEqual([
            "diminished",
            "minor",
            "perfect",
            "major",
            "augmented"
        ]);
    });
});
