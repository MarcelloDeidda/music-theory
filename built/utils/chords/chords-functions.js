"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.triadFromKey = exports.dominantSeventh = exports.augmentedChord = exports.diminishedChord = exports.minorChord = exports.majorChord = void 0;
const notes_functions_1 = require("../notes/notes-functions");
const intervals_functions_1 = require("../intervals/intervals-functions");
const interval_1 = __importDefault(require("../intervals/interval"));
const note_1 = __importDefault(require("../notes/note"));
// Create major chord from Note object
const majorChord = (root) => {
    let third = (0, intervals_functions_1.calculateNoteFromInterval)(root, new interval_1.default("major 3"));
    let fifth = (0, intervals_functions_1.calculateNoteFromInterval)(root, new interval_1.default("perfect 5"));
    return [root, third, fifth];
};
exports.majorChord = majorChord;
// Create minor chord from Note object
const minorChord = (root) => {
    // The parameter "root" MUST be a Note object
    let third = (0, intervals_functions_1.calculateNoteFromInterval)(root, new interval_1.default("minor 3"));
    let fifth = (0, intervals_functions_1.calculateNoteFromInterval)(root, new interval_1.default("perfect 5"));
    return [root, third, fifth];
};
exports.minorChord = minorChord;
// Create diminished chord from Note object
const diminishedChord = (root) => {
    // The parameter "root" MUST be a Note object
    let third = (0, intervals_functions_1.calculateNoteFromInterval)(root, new interval_1.default("minor 3"));
    let fifth = (0, intervals_functions_1.calculateNoteFromInterval)(root, new interval_1.default("diminished 5"));
    return [root, third, fifth];
};
exports.diminishedChord = diminishedChord;
// Create augmented chord from Note object
const augmentedChord = (root) => {
    // The parameter "root" MUST be a Note object
    let third = (0, intervals_functions_1.calculateNoteFromInterval)(root, new interval_1.default("major 3"));
    let fifth = (0, intervals_functions_1.calculateNoteFromInterval)(root, new interval_1.default("augmented 5"));
    return [root, third, fifth];
};
exports.augmentedChord = augmentedChord;
// Create dominant seventh chord from Note object
const dominantSeventh = (root) => {
    // The parameter "root" MUST be a Note object
    let third = (0, intervals_functions_1.calculateNoteFromInterval)(root, new interval_1.default("major 3"));
    let fifth = (0, intervals_functions_1.calculateNoteFromInterval)(root, new interval_1.default("perfect 5"));
    let seventh = (0, intervals_functions_1.calculateNoteFromInterval)(root, new interval_1.default("minor 7"));
    return [root, third, fifth, seventh];
};
exports.dominantSeventh = dominantSeventh;
// Create triad from degree (as integer), tonic (as Note object) and keySignature
// (as Array);
const triadFromKey = (degree, tonic, keySignature) => {
    const keyboard = (0, notes_functions_1.printKeyboard)();
    let tonicIndex = keyboard.indexOf(`${tonic.getLetterName()}${tonic.getOctave()}`);
    let root = keyboard[tonicIndex + degree - 1];
    let third = keyboard[tonicIndex + degree + 2 - 1];
    let fifth = keyboard[tonicIndex + degree + 4 - 1];
    for (let acc of keySignature) {
        if (root.slice(0, root.length - 1) === acc[0]) {
            root = acc + root.slice(root.length - 1);
        }
        if (third.slice(0, third.length - 1) === acc[0]) {
            third = acc + third.slice(third.length - 1);
        }
        if (fifth.slice(0, fifth.length - 1) === acc[0]) {
            fifth = acc + fifth.slice(fifth.length - 1);
        }
    }
    return [
        new note_1.default(root),
        new note_1.default(third),
        new note_1.default(fifth)
    ];
};
exports.triadFromKey = triadFromKey;
