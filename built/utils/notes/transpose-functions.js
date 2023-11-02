"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transpose = void 0;
const intervals_functions_1 = require("../intervals/intervals-functions");
// This function transposes a list of notes
const transpose = (notes, interval, direction = "asc") => {
    const transposedNotes = [];
    notes.map(note => {
        transposedNotes.push((0, intervals_functions_1.calculateNoteFromInterval)(note, interval, direction));
    });
    return transposedNotes;
};
exports.transpose = transpose;
