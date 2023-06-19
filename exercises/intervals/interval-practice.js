const IntervalCalculator = require("../../utils/intervals/interval-calculator");
const NoteBuilder = require("../../utils/notes/note-builder");
const { qualities } = require("../../utils/intervals/interval-utils");
const { sortNotes } = require("../../utils/notes/notes-utils");

const noteBuilder = new NoteBuilder(4, 5);

let availableQualities = [qualities.diminished, qualities.minor, qualities.perfect, qualities.major, qualities.augmented];

const findInterval = (config = {}) => {
    if (config.simpleInterval) {
        availableQualities = availableQualities.slice(1, 4);
    }

    let note1 = config.scale ? noteBuilder.getRandomNoteFromScale(config.scale) : config.noDouble ? noteBuilder.getRandomNoteNoDouble() : noteBuilder.getRandomNote();
    let note2 = config.scale ? noteBuilder.getRandomNoteFromScale(config.scale) : config.noDouble ? noteBuilder.getRandomNoteNoDouble() : noteBuilder.getRandomNote();
    let interval = IntervalCalculator.calculateInterval(note1, note2);

    while ((config.noCompound && interval.compound) || interval.unclassified || !availableQualities.includes(interval.quality)) {
        note1 = config.scale ? noteBuilder.getRandomNoteFromScale(config.scale) : config.noDouble ? noteBuilder.getRandomNoteNoDouble() : noteBuilder.getRandomNote();
        note2 = config.scale ? noteBuilder.getRandomNoteFromScale(config.scale) : config.noDouble ? noteBuilder.getRandomNoteNoDouble() : noteBuilder.getRandomNote();
        interval = IntervalCalculator.calculateInterval(note1, note2);
    }

    let question, answers;

    if (config.findNote) {
        let intervalNotes = sortNotes(note1, note2);
        let intervalDefs = [
            `${interval.compound ? "compound " : ""}${interval.quality} ${interval.simpleDistance}`,
            `${interval.quality} ${interval.distance}`
        ]
        question = `Find the note a ${intervalDefs[Math.floor(Math.random() * 2)]} higher from ${intervalNotes[0].fullNote}.`
        answers = [intervalNotes[1].fullNote];
    } else {
        question = `Find the interval between ${note1.fullNote} and ${note2.fullNote}.`
        answers = [
            `${interval.compound ? "compound " : ""}${interval.quality} ${interval.simpleDistance}`,
            `${interval.quality} ${interval.distance}`
        ]
    }

    return {
        question,
        answers
    }
}

module.exports = {
    findInterval
}