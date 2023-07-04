

const KeyExercises = require("./exercises/scales/key-exercises");
const Note = require("./utils/notes/note");
const { calculateIimeSignatureValue, checkBarBeats, getRandomTimeSignature, createBar, subdivideNote } = require("./utils/rhythm/rhythm-utils");

const notes = [new Note("C4", "minim", true), new Note("C4", "crotchet")/*, new Note("C4"), new Note("C4"), new Note("C4")*/];

const group = subdivideNote("semibreve", "semiquaver", 4);

group.print()