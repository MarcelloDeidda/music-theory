import { printKeyboard } from "../notes/notes-functions";
import { calculateNoteFromInterval } from "../intervals/intervals-functions";

import Interval from "../intervals/interval";
import Note from "../notes/note";

import { NoteInterface } from "../../ts/interfaces/interfaces";

// Create major chord from Note object
export const majorChord = (root: NoteInterface): NoteInterface[] => {
    let third = calculateNoteFromInterval(root, new Interval("major 3"));
    let fifth = calculateNoteFromInterval(root, new Interval("perfect 5"));

    return [root, third, fifth];
}

// Create minor chord from Note object
export const minorChord = (root: NoteInterface): NoteInterface[] => {
    // The parameter "root" MUST be a Note object
    let third = calculateNoteFromInterval(root, new Interval("minor 3"));
    let fifth = calculateNoteFromInterval(root, new Interval("perfect 5"));

    return [root, third, fifth];
}

// Create diminished chord from Note object
export const diminishedChord = (root: NoteInterface): NoteInterface[] => {
    // The parameter "root" MUST be a Note object
    let third = calculateNoteFromInterval(root, new Interval("minor 3"));
    let fifth = calculateNoteFromInterval(root, new Interval("diminished 5"));

    return [root, third, fifth];
}

// Create augmented chord from Note object
export const augmentedChord = (root: NoteInterface): NoteInterface[] => {
    // The parameter "root" MUST be a Note object
    let third = calculateNoteFromInterval(root, new Interval("major 3"));
    let fifth = calculateNoteFromInterval(root, new Interval("augmented 5"));

    return [root, third, fifth];
}

// Create dominant seventh chord from Note object
export const dominantSeventh = (root: NoteInterface): NoteInterface[] => {
    // The parameter "root" MUST be a Note object
    let third = calculateNoteFromInterval(root, new Interval("major 3"));
    let fifth = calculateNoteFromInterval(root, new Interval("perfect 5"));
    let seventh = calculateNoteFromInterval(root, new Interval("minor 7"));

    return [root, third, fifth, seventh];
}

// Create triad from degree (as integer), tonic (as Note object) and keySignature
// (as Array);
export const triadFromKey = (degree: number, tonic: NoteInterface, keySignature: string[]): NoteInterface[] => {
    const keyboard = printKeyboard();

    let tonicIndex = keyboard.indexOf(`${tonic.getLetterName()}${tonic.getOctave()}`);

    let root = keyboard[tonicIndex + degree - 1];
    let third = keyboard[tonicIndex + degree + 2 - 1];
    let fifth = keyboard[tonicIndex + degree + 4 - 1];

    for (let acc of keySignature) {
        if (root.slice(0, root.length - 1) === acc[0]) {
            root = acc + root.slice(root.length - 1);
        }

        if (third.slice(0, third.length - 1) === acc[0]) {
            third = acc + third.slice(third.length - 1);
        }

        if (fifth.slice(0, fifth.length - 1) === acc[0]) {
            fifth = acc + fifth.slice(fifth.length - 1);
        }
    }

    return [
        new Note(root),
        new Note(third),
        new Note(fifth)
    ];
}