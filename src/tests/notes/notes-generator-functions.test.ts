import { describe, test, expect, beforeEach } from "@jest/globals";

import { isNoteinRange } from "../../utils/notes/notes-functions";
import { generateRandomNaturalNote, generateRandomNote, generateRandomNoteNoDouble } from "../../utils/notes/notes-generator-functions";

import Note from "../../utils/notes/note";

import { NoteInterface } from "../../ts/interfaces/interfaces";

describe("Generate random note", () => {
    const note1 = new Note("C#2");
    const note2 = new Note("Gb5");

    test("Note is in range", () => {
        for (let i = 0; i < 100; i++) {
            const note3 = generateRandomNote(note1, note2);

            expect(isNoteinRange(note1, note3, note2)).toBe(true);
        }
    });

    test("All accidentals are available", () => {
        let sharpNote: NoteInterface | undefined;
        let flatNote: NoteInterface | undefined;
        let naturalNote: NoteInterface | undefined;
        let doubleSharpNote: NoteInterface | undefined;
        let doubleFlatNote: NoteInterface | undefined;

        for (let i = 0; i < 100; i++) {
            const note3 = generateRandomNote(note1, note2);

            switch (note3.getAccidental()) {
                case "#":
                    sharpNote = note3;
                case "b":
                    flatNote = note3;
                case null:
                    naturalNote = note3;
                case "x":
                    doubleSharpNote = note3;
                case "B":
                    doubleFlatNote = note3;
            }
        }

        expect(sharpNote).not.toBe(undefined);
        expect(flatNote).not.toBe(undefined);
        expect(naturalNote).not.toBe(undefined);
        expect(doubleSharpNote).not.toBe(undefined);
        expect(doubleFlatNote).not.toBe(undefined);
    });
});

describe("Generate random note no double", () => {
    const note1 = new Note("C#2");
    const note2 = new Note("Gb5");

    test("Note is in range", () => {
        for (let i = 0; i < 100; i++) {
            const note3 = generateRandomNoteNoDouble(note1, note2);

            expect(isNoteinRange(note1, note3, note2)).toBe(true);
        }
    });

    test("Simple accidentals are available", () => {
        let sharpNote: NoteInterface | undefined;
        let flatNote: NoteInterface | undefined;
        let naturalNote: NoteInterface | undefined;
        let doubleSharpNote: NoteInterface | undefined;
        let doubleFlatNote: NoteInterface | undefined;

        for (let i = 0; i < 100; i++) {
            const note3 = generateRandomNoteNoDouble(note1, note2);

            switch (note3.getAccidental()) {
                case "#":
                    sharpNote = note3;
                    break;
                case "b":
                    flatNote = note3;
                    break;
                case null:
                    naturalNote = note3;
                    break;
                case "x":
                    doubleSharpNote = note3;
                    break;
                case "B":
                    doubleFlatNote = note3;
                    break;
            }
        }

        expect(sharpNote).not.toBe(undefined);
        expect(flatNote).not.toBe(undefined);
        expect(naturalNote).not.toBe(undefined);
        expect(doubleSharpNote).toBe(undefined);
        expect(doubleFlatNote).toBe(undefined);
    });
});

describe("Generate random natural note", () => {
    const note1 = new Note("C#2");
    const note2 = new Note("Gb5");

    test("Note is in range", () => {
        for (let i = 0; i < 100; i++) {
            const note3 = generateRandomNaturalNote(note1, note2);

            expect(isNoteinRange(note1, note3, note2)).toBe(true);
        }
    });

    test("Simple accidentals are available", () => {
        let sharpNote: NoteInterface | undefined;
        let flatNote: NoteInterface | undefined;
        let naturalNote: NoteInterface | undefined;
        let doubleSharpNote: NoteInterface | undefined;
        let doubleFlatNote: NoteInterface | undefined;

        for (let i = 0; i < 100; i++) {
            const note3 = generateRandomNaturalNote(note1, note2);

            switch (note3.getAccidental()) {
                case "#":
                    sharpNote = note3;
                    break;
                case "b":
                    flatNote = note3;
                    break;
                case null:
                    naturalNote = note3;
                    break;
                case "x":
                    doubleSharpNote = note3;
                    break;
                case "B":
                    doubleFlatNote = note3;
                    break;
            }
        }

        expect(sharpNote).toBe(undefined);
        expect(flatNote).toBe(undefined);
        expect(naturalNote).not.toBe(undefined);
        expect(doubleSharpNote).toBe(undefined);
        expect(doubleFlatNote).toBe(undefined);
    });
});