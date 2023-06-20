const Note = require("./utils/notes/note");
const ExerciseHandler = require("./exercises/exercise");
const Interval = require("./utils/intervals/interval");

const IntervalExercise = require("./exercises/intervals/interval-exercise");

const a = new Note("C2");
const b = new Note("DB2");
const c = new Note("Db2");
const d = new Note("D#2");

const i1 = new Interval("2 minor");
const i2 = new Interval("3 minor");
const i3 = new Interval("5 diminished");
const i4 = new Interval("7 minor");

const notes = [b];
const intervals = [i1, i2, i3, i4];

/*
console.log(IntervalCalculator.calculateInterval(a, b));
console.log(IntervalCalculator.calculateInterval(a, c));
console.log(IntervalCalculator.calculateInterval(a, d));
*/
/*
console.log(getKeySignature("A minor"));
console.log(getKeySignature("Bb minor"));
console.log(getKeySignature("A# minor"));*/
/*
const chordExercises = new TonicTriadExercises(5);
ExerciseHandler.execute(chordExercises.recogniseTriad());*/
/*
for (let note of notes) {
    for (let i of intervals) {
        let newNote = IntervalCalculator.calculateNoteFromInterval(note, i);
        console.log(`${note.fullNote} + ${i.quality} ${i.number} = ${newNote.fullNote}`)
    }
}*/

const z = new IntervalExercise(5);
//for (let i = 0; i < 300; i++) {
    console.log(z.findNoteFromInterval())
//}