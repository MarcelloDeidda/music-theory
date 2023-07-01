const prompt = require("prompt");

const { calculateNoteFromInterval } = require("../utils/intervals/intervals-functions");

const Note = require("../utils/notes/note");
const Interval = require("../utils/intervals/interval");

module.exports.execute = async ({ question, answers }) => {
    while (true) {
        console.log(question);
        prompt.start();
        const { answer } = await prompt.get(["answer"]);

        if (answers.includes(answer)) {
            console.log("Correct!");
            break;
        } else {
            console.log("Wrong!");
            console.log(`The correct answer is: ${answers}`);
            break;
        }
    }
}

module.exports.removeAccidentals = notes => {
    const newNotes = notes.map(note => {
        return new Note(`${note.getLetterName()}${note.getOctave()}`)
    })

    return newNotes;
}

module.exports.tamperChord = notes => {
    let newNotes = notes.slice();
    let newNoteIndex = Math.floor(Math.random() * notes.length);
    let asc = Math.floor(Math.random() * 2) === 1 ? true : false;

    let newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("augmented 1"), asc);
    newNotes[newNoteIndex] = newNote;
    return newNotes;
}

module.exports.tamperChordNoDouble = notes => {
    let newNotes = notes.slice();
    let newNoteIndex = Math.floor(Math.random() * notes.length);
    let asc = Math.floor(Math.random() * 2) === 1 ? true : false;

    let newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("augmented 1"), asc);

    while (newNote.getAccidentalInSemitones() < -1 || newNote.getAccidentalInSemitones() > 1) {
        newNoteIndex = Math.floor(Math.random() * notes.length);
        asc = Math.floor(Math.random() * 2) === 1 ? true : false;

        newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("augmented 1"), asc);
    }

    newNotes[newNoteIndex] = newNote;
    return newNotes;
}

module.exports.tamperMelodyNoDouble = (notes) => {
    let newNotes = notes.slice();
    let newNoteIndex = Math.floor(Math.random() * notes.length);
    let asc = Math.floor(Math.random() * 2) === 1 ? true : false;

    let newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("major 2"), asc);

    while (newNote.getAccidentalInSemitones() < -1 || newNote.getAccidentalInSemitones() > 1) {
        newNoteIndex = Math.floor(Math.random() * notes.length);
        asc = Math.floor(Math.random() * 2) === 1 ? true : false;

        newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("major 2"), asc);
    }

    newNotes[newNoteIndex] = newNote;
    return newNotes;
}

module.exports.tamperChromaticScale = (scale) => {
    const intervals = ["augmented 1", "minor 2"];
    let randomNote = Math.floor(Math.random() * scale.length);
    let randomInterval = Math.floor(Math.random() * intervals.length);
    let asc = Math.floor(Math.random() * 2) === 0 ? false : true;

    let newNote = calculateNoteFromInterval(scale[randomNote], new Interval(intervals[randomInterval]), asc);

    while (
        newNote.getNoteWithoutOctave() === "undefined" ||
        newNote.getAccidentalInSemitones() < -1 ||
        newNote.getAccidentalInSemitones() > 1
        ) {
        randomInterval = Math.floor(Math.random() * intervals.length);
        asc = Math.floor(Math.random() * 2) === 0 ? false : true;
        newNote = calculateNoteFromInterval(scale[randomNote], new Interval(intervals[randomInterval]), asc);
    }

    scale[randomNote] = newNote;

    return { scale, index: randomNote };
}