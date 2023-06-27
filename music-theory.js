const Note = require("./utils/notes/note");/*
const ExerciseHandler = require("./exercises/exercise");
const Interval = require("./utils/intervals/interval");*/
const Key = require("./utils/keys/key");
/*
const TriadExercises = require("./exercises/chords/triad-exercises");
const IntervalExercises = require("./exercises/intervals/interval-exercises");
const KeyExercises = require("./exercises/scales/key-exercises");
const ScaleExercises = require("./exercises/scales/scale-exercises");*/
/*
const a = new Note("C2");
const b = new Note("DB2");
const c = new Note("Db2");
const d = new Note("D#2");

const i1 = new Interval("2 minor");
const i2 = new Interval("3 minor");
const i3 = new Interval("5 diminished");
const i4 = new Interval("7 minor");

const notes = [b];
const intervals = [i1, i2, i3, i4];*/

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
}*//*
const z = new IntervalExercise(5);
//for (let i = 0; i < 300; i++) {
    console.log(z.findNoteFromInterval())
//}*/
/*
const x = new ScaleExercises(5);

ExerciseHandler.execute(x.addAccidentalsToScale())*/
/*
for (let i = 0; i < 300; i++) {
    console.log(x.addAccidentalsToScale())
}*/
/*
let cMajor = new Key("Eb minor");
let note = new Note("Eb3");

console.log(cMajor.getName())
console.log("")

console.log(cMajor.getTonic())
console.log("")

console.log(cMajor.getMode())
console.log("")

console.log(cMajor.getKeySignature())
console.log("")

console.log(cMajor.getRelative())
console.log("")

for (let i = 1; i <= 7; i++) {
    console.log(cMajor.getDegree(i))
}
console.log("")

let scale = cMajor.getAscScale(note).harmonic;

for (let note of scale) {
    console.log(note.getNote())
}

console.log("")

scale = cMajor.getDescScale(note).harmonic;

for (let note of scale) {
    console.log(note.getNote())
}

console.log("")

for (let i = 1; i <= 7; i++) {
    let triad = cMajor.getTriad(i, note);
    for (let note of triad) {
        console.log(note.getNote())
    }
    console.log("")
}*/