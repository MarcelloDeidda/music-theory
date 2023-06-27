const { getRandomNoteFromScale } = require("../notes/notes-functions");
const { calculateInterval } = require("../intervals/intervals-functions");
const { startingDegrees } = require("./melody-utils");

const Note = require("../notes/note");
const Key = require("../keys/key");

module.exports.writeRandomMelody = (grade, octave, numOfNotes) => {
    const melody = [];

    const key = Key.getRandomKey(grade);
    const tonic = new Note(`${key.getTonic()}${octave}`);
    let scale = key.getMode() === "major" ? key.getAscScale(tonic) : key.getAscScale(tonic).harmonic;

    let degree = startingDegrees[Math.floor(Math.random() * startingDegrees.length)];
    let note = scale[degree - 1];

    melody.push(note);

    while (melody.length < numOfNotes) {
        note = getRandomNoteFromScale(scale);

        let interval = calculateInterval(melody[melody.length - 1], note);

        while (
            interval.getDistance() > 4 ||
            note.getNote() === melody[melody.length - 1].getNote() ||
            !["major", "perfect", "minor"].includes(interval.getQuality())
        ) {
            note = getRandomNoteFromScale(scale);
            interval = calculateInterval(melody[melody.length - 1], note);
        }

        melody.push(note);
    }

    return { melody, key };
}