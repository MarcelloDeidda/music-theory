"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const note_1 = __importDefault(require("../../utils/notes/note"));
(0, globals_1.describe)("Test Note class", () => {
    const note1 = new note_1.default("C4", "crotchet", true);
    const note2 = new note_1.default("Ab5", "minim", false);
    const note3 = new note_1.default("Fx3", "quaver", false);
    (0, globals_1.test)("Get note", () => {
        (0, globals_1.expect)(note1.getNote()).toBe("C4");
        (0, globals_1.expect)(note2.getNote()).toBe("Ab5");
        (0, globals_1.expect)(note3.getNote()).toBe("Fx3");
    });
    (0, globals_1.test)("Get note without octave", () => {
        (0, globals_1.expect)(note1.getNoteWithoutOctave()).toBe("C");
        (0, globals_1.expect)(note2.getNoteWithoutOctave()).toBe("Ab");
        (0, globals_1.expect)(note3.getNoteWithoutOctave()).toBe("Fx");
    });
    (0, globals_1.test)("Get letter name", () => {
        (0, globals_1.expect)(note1.getLetterName()).toBe("C");
        (0, globals_1.expect)(note2.getLetterName()).toBe("A");
        (0, globals_1.expect)(note3.getLetterName()).toBe("F");
    });
    (0, globals_1.test)("Get octave", () => {
        (0, globals_1.expect)(note1.getOctave()).toBe(4);
        (0, globals_1.expect)(note2.getOctave()).toBe(5);
        (0, globals_1.expect)(note3.getOctave()).toBe(3);
    });
    (0, globals_1.test)("Get accidental", () => {
        (0, globals_1.expect)(note1.getAccidental()).toBe(null);
        (0, globals_1.expect)(note2.getAccidental()).toBe("b");
        (0, globals_1.expect)(note3.getAccidental()).toBe("x");
    });
    (0, globals_1.test)("Get accidental in semitones", () => {
        (0, globals_1.expect)(note1.getAccidentalInSemitones()).toBe(0);
        (0, globals_1.expect)(note2.getAccidentalInSemitones()).toBe(-1);
        (0, globals_1.expect)(note3.getAccidentalInSemitones()).toBe(2);
    });
    (0, globals_1.test)("Get value", () => {
        (0, globals_1.expect)(note1.getValue()).toBe("dotted crotchet");
        (0, globals_1.expect)(note2.getValue()).toBe("minim");
        (0, globals_1.expect)(note3.getValue()).toBe("quaver");
    });
    (0, globals_1.test)("Get beats", () => {
        (0, globals_1.expect)(note1.getBeats()).toBe(1.5);
        (0, globals_1.expect)(note2.getBeats()).toBe(2);
        (0, globals_1.expect)(note3.getBeats()).toBe(0.5);
    });
});
