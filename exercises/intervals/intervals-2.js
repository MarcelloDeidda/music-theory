const IntervalCalculator = require("../../utils/intervals/interval-calculator");
const NoteBuilder = require("../../utils/notes/note-builder");
const Note = require("../../utils/notes/note");

const { sortNotes } = require("../../utils/notes/notes-utils");

const noteBuilder = new NoteBuilder(4, 5);

const findIntervalGradeTwo = (config = {}) => {
    let note1 = new Note(`${config.scale[0]}${Math.floor(Math.random() * 2) + 4}`);
    let note2 = noteBuilder.getRandomNoteFromScale(config.scale);
    let interval = IntervalCalculator.calculateInterval(note1, note2);
    
    while (interval.compound) {
        note2 = noteBuilder.getRandomNoteFromScale(config.scale);
        interval = IntervalCalculator.calculateInterval(note1, note2);
    }

    let question, answers;

    if (config.findNote) {
        const intervalNotes = sortNotes(note1, note2);
        let intervalDirection = intervalNotes[0].fullNote === note1.fullNote ? "higher" : "lower";
        question = `Find the note a ${interval.simpleDistance} ${intervalDirection} from ${note1.fullNote}.`
        answers = [note2.fullNote];
    } else {
        question = `Find the interval between ${note1.fullNote} and ${note2.fullNote}.`
        answers = [interval.distance.toString()];
    }

    return {
        question,
        answers
    }
}

module.exports = {
    findIntervalGradeTwo
}