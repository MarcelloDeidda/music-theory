import {describe, test, expect, beforeEach} from "@jest/globals";

import Note from "../../utils/notes/note";
import { isNoteHigher, isNoteinRange, sortNotes, availableAccidentals } from "../../utils/notes/notes-functions";

import { NoteInterface } from "../../ts/interfaces/interfaces";

describe("Note sorting", () => {
    test("Three unsorted notes", () => {
        const note1 = new Note("F4");
        const note2 = new Note("G3");
        const note3 = new Note("C2");

        expect(sortNotes(note1, note2, note3).map(note => note.getNote())).toEqual(["C2", "G3", "F4"]);
    });

    test("Three sorted notes", () => {
        const note1 = new Note("F4");
        const note2 = new Note("G3");
        const note3 = new Note("C2");

        expect(sortNotes(note3, note2, note1).map(note => note.getNote())).toEqual(["C2", "G3", "F4"]);
    });
});

describe("Note comparison", () => {
    test("Higher note - Same octave, different letter name", () => {
        const note1 = new Note("F4");
        const note2 = new Note("G4");

        expect(isNoteHigher(note1, note2)).toBe(true);
    })

    test("Higher note - Different octave, same letter name", () => {
        const note1 = new Note("F4");
        const note2 = new Note("F5");

        expect(isNoteHigher(note1, note2)).toBe(true);
    })

    test("Higher note - Same octave, same letter name, different accidental", () => {
        const note1 = new Note("F4");
        const note2 = new Note("F#4");

        expect(isNoteHigher(note1, note2)).toBe(true);
    })

    test("Lower note - Same octave, different letter name", () => {
        const note1 = new Note("F4");
        const note2 = new Note("C4");

        expect(isNoteHigher(note1, note2)).toBe(false);
    })

    test("Lower note - Different octave, same letter name", () => {
        const note1 = new Note("F4");
        const note2 = new Note("F3");

        expect(isNoteHigher(note1, note2)).toBe(false);
    })

    test("Lower note - Same octave, same letter name, different accidental", () => {
        const note1 = new Note("F4");
        const note2 = new Note("Fb4");

        expect(isNoteHigher(note1, note2)).toBe(false);
    })
});

describe("Note in range", () => {
    let lowerNote: NoteInterface, higherNote: NoteInterface;

    beforeEach(() => {
        lowerNote = new Note("C4");
        higherNote = new Note("C5");
    })

    test("Note is in range - in point", () => {
        const note = new Note("G4");

        expect(isNoteinRange(lowerNote, note, higherNote)).toBe(true);
    });

    test("Note is in range - on point", () => {
        const note = new Note("C4");

        expect(isNoteinRange(lowerNote, note, higherNote)).toBe(true);
    });

    test("Note is not in range - out point", () => {
        const note = new Note("G3");

        expect(isNoteinRange(lowerNote, note, higherNote)).toBe(false);
    });

    test("Note is not in range - off point", () => {
        const note = new Note("B3");

        expect(isNoteinRange(lowerNote, note, higherNote)).toBe(false);
    });

    test("Note is not in range - with accidentals", () => {
        const note = new Note("Cb4");

        expect(isNoteinRange(lowerNote, note, higherNote)).toBe(false);
    });
});

describe("Available accidentals", () => {
    test("Until Grade Three", () => {
        expect(availableAccidentals(3)).toEqual(["b", null, "#"]);
    });

    
    test("After Grade Three", () => {
        expect(availableAccidentals(4)).toEqual(["B", "b", null, "#", "x"]);
    });
});