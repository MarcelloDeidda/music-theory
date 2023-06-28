const { calculateNoteFromInterval } = require("../intervals/intervals-functions");

module.exports.transpose = (notes, interval, asc = true) => {
    const transposedNotes = [];

    notes.map(note => {
        transposedNotes.push(calculateNoteFromInterval(note, interval, asc));
    })

    return transposedNotes;
}