import { accidentals, notes } from "./notes-utils";
import { isNoteinRange } from "./notes-functions";

import Note from "./note";

import { NoteInterface } from "../../ts/interfaces/interfaces";

// This function returns a random note
export const generateRandomNote = (lowerNote: NoteInterface, higherNote: NoteInterface): NoteInterface => {
    let octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
    let note = notes[Math.floor(Math.random() * 7)];
    let accidental = accidentals[Math.floor(Math.random() * 5)];

    let randomNote = new Note(`${note}${accidental}${octave}`);

    while (!isNoteinRange(lowerNote, randomNote, higherNote)) {
        octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
        note = notes[Math.floor(Math.random() * 7)];
        accidental = accidentals[Math.floor(Math.random() * 5)];

        randomNote = new Note(`${note}${accidental}${octave}`);
    }

    return randomNote;
}

// This function returns a random note avoiding double accidentals
export const generateRandomNoteNoDouble = (lowerNote: NoteInterface, higherNote: NoteInterface): NoteInterface => {
    let octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
    let note = notes[Math.floor(Math.random() * 7)];
    let accidental = accidentals[Math.ceil(Math.random() * 3)];

    let randomNote = new Note(`${note}${accidental}${octave}`);

    while (!isNoteinRange(lowerNote, randomNote, higherNote)) {
        octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
        note = notes[Math.floor(Math.random() * 7)];
        accidental = accidentals[Math.ceil(Math.random() * 3)];

        randomNote = new Note(`${note}${accidental}${octave}`);
    }

    return randomNote;
}

// This function returns a random note avoiding accidentals
export const generateRandomNaturalNote = (lowerNote: NoteInterface, higherNote: NoteInterface): NoteInterface => {
    let octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
    let note = notes[Math.floor(Math.random() * 7)];

    let randomNote = new Note(`${note}${octave}`);

    while (!isNoteinRange(lowerNote, randomNote, higherNote)) {
        octave = Math.floor(Math.random() * (higherNote.getOctave() - lowerNote.getOctave() + 1)) + lowerNote.getOctave();
        note = notes[Math.floor(Math.random() * 7)];

        randomNote = new Note(`${note}${octave}`);
    }

    return randomNote;
}
/*
// This function returns a random note from a scale (list of Note objects)
export const getRandomNoteFromScale = (scale: any[]) => {
    let random = Math.floor(Math.random() * 8);

    return scale[random];
}*/