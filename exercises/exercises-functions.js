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

    let newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("1 augmented"), asc);
    newNotes[newNoteIndex] = newNote;
    return newNotes;
}

module.exports.tamperChordNoDouble = notes => {
    let newNotes = notes.slice();
    let newNoteIndex = Math.floor(Math.random() * notes.length);
    let asc = Math.floor(Math.random() * 2) === 1 ? true : false;

    let newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("1 augmented"), asc);

    while (newNote.getAccidentalInSemitones() < -1 || newNote.getAccidentalInSemitones() > 1) {
        newNoteIndex = Math.floor(Math.random() * notes.length);
        asc = Math.floor(Math.random() * 2) === 1 ? true : false;

        newNote = calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("1 augmented"), asc);
    }

    newNotes[newNoteIndex] = newNote;
    return newNotes;
}