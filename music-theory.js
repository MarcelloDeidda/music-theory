const Note = require("./utils/notes/note");
const Exercise = require("./exercises/exercise");
const IntervalCalculator = require("./utils/intervals/interval-calculator");
const {
    findIntervalFromTwoRandomNotes,
    findSimpleIntervalFromTwoRandomNotes,
    findIntervalFromTwoRandomNotesWithCompound
} = require("./exercises/intervals/find-interval");
/*
const { getKeySignature } = require("./utils/scales");
*/
const a = new Note("C2");
const b = new Note("Dx2");
const c = new Note("Db2");
const d = new Note("D#2");
const e = new Note("G2");

/*
console.log(IntervalCalculator.calculateInterval(a, b));
console.log(IntervalCalculator.calculateInterval(a, c));
console.log(IntervalCalculator.calculateInterval(a, d));
*/
/*
console.log(getKeySignature("A minor"));
console.log(getKeySignature("Bb minor"));
console.log(getKeySignature("A# minor"));*/

const exercise = new Exercise(findIntervalFromTwoRandomNotesWithCompound);
exercise.execute();

//console.log(IntervalCalculator.calculateInterval(a, b));