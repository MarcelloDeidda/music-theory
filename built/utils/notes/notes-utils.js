"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accidentalsInSemitones = exports.chromaticScale = exports.accidentals = exports.notes = void 0;
exports.notes = ["C", "D", "E", "F", "G", "A", "B"];
exports.accidentals = ["B", "b", "", "#", "x"];
exports.chromaticScale = [
    ["B#", "C", "DB"],
    ["Bx", "C#", "Db"],
    ["Cx", "D", "EB"],
    ["D#", "Eb", "FB"],
    ["Dx", "E", "Fb"],
    ["E#", "F", "GB"],
    ["Ex", "F#", "Gb"],
    ["Fx", "G", "AB"],
    ["G#", "Ab"],
    ["Gx", "A", "BB"],
    ["A#", "Bb", "CB"],
    ["Ax", "B", "Cb"]
];
exports.accidentalsInSemitones = {
    "B": -2,
    "b": -1,
    "#": 1,
    "x": 2
};
