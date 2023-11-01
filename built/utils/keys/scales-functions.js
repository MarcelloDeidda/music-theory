"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChromaticScale = exports.scaleFromKey = void 0;
const intervals_functions_1 = require("../intervals/intervals-functions");
const notes_functions_1 = require("../../utils/notes/notes-functions");
const note_1 = __importDefault(require("../notes/note"));
const interval_1 = __importDefault(require("../intervals/interval"));
// Create scale from Note object and keySignature (as Array)
const scaleFromKey = (tonic, keySignature) => {
    const keyboard = (0, notes_functions_1.printKeyboard)();
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
    return scale.map(note => new note_1.default(note));
};
exports.scaleFromKey = scaleFromKey;
// Create chromatic scale from Note object
const createChromaticScale = (startingNote, direction = "asc") => {
    const intervals = ["augmented 1", "minor 2"];
    let chromaticScale = [];
    chromaticScale.push(startingNote);
    while (chromaticScale.length < 12) {
        let random = Math.floor(Math.random() * 2);
        let nextNote = (0, intervals_functions_1.calculateNoteFromInterval)(chromaticScale[chromaticScale.length - 1], new interval_1.default(intervals[random]), direction);
        // Check this error!
        while (nextNote.getNoteWithoutOctave === "undefined" ||
            (nextNote.getAccidentalInSemitones() < -1 || nextNote.getAccidentalInSemitones() > 1)) {
            random = random === 0 ? 1 : 0;
            nextNote = (0, intervals_functions_1.calculateNoteFromInterval)(chromaticScale[chromaticScale.length - 1], new interval_1.default(intervals[random]), direction);
        }
        if ((chromaticScale.length > 1 &&
            chromaticScale[chromaticScale.length - 1].getLetterName() === nextNote.getLetterName() &&
            chromaticScale[chromaticScale.length - 2].getLetterName() === nextNote.getLetterName()) ||
            (chromaticScale.length === 11 &&
                chromaticScale[chromaticScale.length - 1].getLetterName() === nextNote.getLetterName() &&
                chromaticScale[0].getLetterName() === nextNote.getLetterName()) ||
            (chromaticScale.length === 11 &&
                ((direction === "asc" && ![-1, 0, 6].includes(nextNote.getLetterName().charCodeAt(0) - startingNote.getLetterName().charCodeAt(0))) ||
                    (direction === "desc" && ![1, 0, -6].includes(nextNote.getLetterName().charCodeAt(0) - startingNote.getLetterName().charCodeAt(0)))))) {
            chromaticScale.pop();
            if (chromaticScale.length > 2) {
                chromaticScale.pop();
            }
            continue;
        }
        chromaticScale.push(nextNote);
    }
    chromaticScale.push((0, intervals_functions_1.calculateNoteFromInterval)(startingNote, new interval_1.default("perfect 8"), direction));
    return chromaticScale;
};
exports.createChromaticScale = createChromaticScale;
