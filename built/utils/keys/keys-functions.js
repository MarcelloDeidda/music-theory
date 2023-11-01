"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKeySignature = exports.getAccidentals = void 0;
const notes_utils_1 = require("../notes/notes-utils");
const intervals_functions_1 = require("../intervals/intervals-functions");
const keys_utils_1 = require("./keys-utils");
const interval_1 = __importDefault(require("../intervals/interval"));
const note_1 = __importDefault(require("../notes/note"));
// Return accidentals from keyConfig as object (e.g.: { type: "#", number: 2})
const getAccidentals = (keyConfig) => {
    const accidentals = [];
    if (keyConfig.type === "#") {
        for (let i = 0; i < keyConfig.number; i++) {
            accidentals.push(`${notes_utils_1.notes[keys_utils_1.accidentalsIndexes[i]]}#`);
        }
    }
    else if (keyConfig.type === "b") {
        for (let i = 0; i < keyConfig.number; i++) {
            accidentals.push(`${notes_utils_1.notes[keys_utils_1.accidentalsIndexes[keys_utils_1.accidentalsIndexes.length - i - 1]]}b`);
        }
    }
    return accidentals;
};
exports.getAccidentals = getAccidentals;
// Returns key signature as Array from key as string (e.g.: "D major")
const getKeySignature = (key) => {
    const keyInfo = key.split(" ");
    let tonic;
    let mode = keyInfo[1];
    if (mode === "major") {
        tonic = new note_1.default(`${keyInfo[0]}1`);
    }
    else {
        tonic = (0, intervals_functions_1.calculateNoteFromInterval)(new note_1.default(`${keyInfo[0]}1`), new interval_1.default("minor 3"));
    }
    return (0, exports.getAccidentals)(keys_utils_1.keys[tonic.getNoteWithoutOctave()]);
};
exports.getKeySignature = getKeySignature;
