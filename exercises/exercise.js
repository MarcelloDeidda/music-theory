const prompt = require("prompt");
const Note = require("../utils/notes/note");
const IntervalCalculator = require("../utils/intervals/interval-calculator");
const Interval = require("../utils/intervals/interval");

const ExerciseHandler = class {
    static async execute({ question, answers }) {
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

    static removeAccidentals(notes) {
        const newNotes = notes.map(note => {
            return new Note(`${note.name}${note.octave}`)
        })

        return newNotes;
    }

    static tamperChord(notes) {
        let newNotes = notes.slice();
        let newNoteIndex = Math.floor(Math.random() * notes.length);
        let asc = Math.floor(Math.random() * 2) === 1 ? true : false;
        
        let newNote = IntervalCalculator.calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("1 augmented"), asc);
        newNotes[newNoteIndex] = newNote;
        return newNotes;
    }

    static tamperChordNoDouble(notes) {
        let newNotes = notes.slice();
        
        let asc = Math.floor(Math.random() * 2) === 1 ? true : false;
        let newNoteIndex = Math.floor(Math.random() * notes.length);
        let newNote = IntervalCalculator.calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("1 augmented"), asc);
        
        while (newNote.alterationInSemitones < -1 || newNote.alterationInSemitones > 1) {
            asc = Math.floor(Math.random() * 2) === 1 ? true : false;
            newNoteIndex = Math.floor(Math.random() * notes.length);
            newNote = IntervalCalculator.calculateNoteFromInterval(newNotes[newNoteIndex], new Interval("1 augmented"), asc);
        }
        
        newNotes[newNoteIndex] = newNote;
        return newNotes;
    }
}

module.exports = ExerciseHandler;