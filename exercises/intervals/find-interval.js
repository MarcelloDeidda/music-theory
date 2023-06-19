const IntervalCalculator = require("../../utils/intervals/interval-calculator"); 
const NoteBuilder = require("../../utils/notes/note-builder");

const noteBuilder = new NoteBuilder(4, 5);

const findAnyInterval = () => {
    let note1 = noteBuilder.getRandomNote();
    let note2 = noteBuilder.getRandomNote();
    let interval = IntervalCalculator.calculateInterval(note1, note2);

    while (interval.unclassified) {
        note1 = noteBuilder.getRandomNote();
        note2 = noteBuilder.getRandomNote();
        interval = IntervalCalculator.calculateInterval(note1, note2);
    }

    let question = `Find the interval between ${note1.fullNote} and ${note2.fullNote}.`
    let answers = [
        `${interval.compound ? "compound " : ""}${interval.quality} ${interval.simpleDistance}`,
        `${interval.quality} ${interval.distance}`
    ]

    return {
        question,
        answers
    }
}

const findIntervalFromTwoRandomNotesWithCompound = () => {
    let note1 = noteBuilder.getRandomNoteNoDouble();
    let note2 = noteBuilder.getRandomNoteNoDouble();
    let interval = IntervalCalculator.calculateInterval(note1, note2);

    while (interval.unclassified) {
        note1 = noteBuilder.getRandomNoteNoDouble();
        note2 = noteBuilder.getRandomNoteNoDouble();
        interval = IntervalCalculator.calculateInterval(note1, note2);
    }

    let question = `Find the interval between ${note1.fullNote} and ${note2.fullNote}.`
    let answers = [
        `${interval.compound ? "compound " : ""}${interval.quality} ${interval.simpleDistance}`,
        `${interval.quality} ${interval.distance}`
    ]

    return {
        question,
        answers
    }
}

const findIntervalFromTwoRandomNotes = () => {
    let note1 = noteBuilder.getRandomNoteNoDouble();
    let note2 = noteBuilder.getRandomNoteNoDouble();
    let interval = IntervalCalculator.calculateInterval(note1, note2);

    while (interval.compound || interval.unclassified) {
        note1 = noteBuilder.getRandomNoteNoDouble();
        note2 = noteBuilder.getRandomNoteNoDouble();
        interval = IntervalCalculator.calculateInterval(note1, note2);
    }

    let question = `Find the interval between ${note1.fullNote} and ${note2.fullNote}.`
    let answers = [`${interval.quality} ${interval.distance}`]

    return {
        question,
        answers
    }
}

const findSimpleIntervalFromTwoRandomNotes = () => {
    let note1 = noteBuilder.getRandomNoteNoDouble();
    let note2 = noteBuilder.getRandomNoteNoDouble();
    let interval = IntervalCalculator.calculateInterval(note1, note2);

    while (interval.compound || !["minor", "major", "perfect"].includes(interval.quality)) {
        note1 = noteBuilder.getRandomNoteNoDouble();
        note2 = noteBuilder.getRandomNoteNoDouble();
        interval = IntervalCalculator.calculateInterval(note1, note2);
    }

    let question = `Find the interval between ${note1.fullNote} and ${note2.fullNote}.`
    let answers = [`${interval.quality} ${interval.distance}`]

    return {
        question,
        answers
    }
}

module.exports = {
    findIntervalFromTwoRandomNotesWithCompound,
    findIntervalFromTwoRandomNotes,
    findSimpleIntervalFromTwoRandomNotes
}