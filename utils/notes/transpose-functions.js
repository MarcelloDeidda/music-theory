const { calculateNoteFromInterval } = require("../intervals/intervals-functions");

// This function transposes a list of notes
module.exports.transpose = (notes, interval, asc = true) => {
    const transposedNotes = [];

    notes.map(note => {
        transposedNotes.push(calculateNoteFromInterval(note, interval, asc));
    })

    return transposedNotes;
}