const IntervalCalculator = require("../../utils/intervals/interval-calculator");
const NoteBuilder = require("../../utils/notes/note-builder");
const { sortNotes } = require("../../utils/notes/notes-utils");

const noteBuilder = new NoteBuilder(4, 5);

const findIntervalGradeFive = (config = {}) => {
    let note1 = noteBuilder.getRandomNote();
    let note2 = noteBuilder.getRandomNote();
    let interval = IntervalCalculator.calculateInterval(note1, note2);

    while (interval.unclassified) {
        note1 = noteBuilder.getRandomNote();
        note2 = noteBuilder.getRandomNote();
        interval = IntervalCalculator.calculateInterval(note1, note2);
    }

    let question, answers;

    if (config.findNote) {
        const intervalNotes = sortNotes(note1, note2);
        let intervalDirection = intervalNotes[0].fullNote === note1.fullNote ? "higher" : "lower";
        let intervalDefs = [
            `${interval.compound ? "compound " : ""}${interval.quality} ${interval.simpleDistance}`,
            `${interval.quality} ${interval.distance}`
        ]
        question = `Find the note a ${intervalDefs[Math.floor(Math.random() * 2)]} ${intervalDirection} from ${note1.fullNote}.`
        answers = [note2.fullNote];
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
    findIntervalGradeFive
}