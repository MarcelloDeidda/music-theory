const Note = require("./utils/notes/note");
const { calculateIimeSignatureValue, checkBarBeats, getRandomTimeSignature } = require("./utils/rhythm/rhythm-utils");

const notes = [new Note("C4", "minim", true), new Note("C4", "crotchet")/*, new Note("C4"), new Note("C4"), new Note("C4")*/];

console.log(checkBarBeats(notes));