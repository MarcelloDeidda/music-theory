// const TriadExercises = require("./exercises/chords/triad-exercises");
// const IntervalExercises = require("./exercises/intervals/interval-exercises");
//const KeyExercises = require("./exercises/scales/key-exercises");
// const ScaleExercises = require("./exercises/scales/scale-exercises");
const PitchExercises = require("./exercises/pitch/PitchExercises");

const { execute } = require("./exercises/exercises-functions");

const Key = require("./utils/keys/key");

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
const intervals = [i1, i2, i3, i4];
*/

let x;

for (let i = 1; i <= 5; i++) {
    x = new PitchExercises(i);

    for (let i = 0; i < 300; i++) {
        console.log(x.checkTransposedMelody())
    }
}




//execute(x.findKeyOfMelody())

