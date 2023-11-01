const Note = require("../src/utils/notes/note");
const Interval = require("../src/utils/intervals/interval");
const { calculateInterval, calculateNoteFromInterval, availableIntervalNumbers, availableIntervalQualities } = require("../src/utils/intervals/intervals-functions");

describe("Calculate interval", () => {
    const note1 = new Note("G4");

    test("Minor 2nd", () => {
        const note2 = new Note("Ab4");

        expect(calculateInterval(note1, note2).getInterval()).toEqual("minor 2");
    });

    test("Doubly augmented 2nd", () => {
        const note2 = new Note("Ax4");

        expect(calculateInterval(note1, note2).getInterval()).toEqual("2");
    });

    test("Major 3rd", () => {
        const note2 = new Note("B4");

        expect(calculateInterval(note1, note2).getInterval()).toEqual("major 3");
    });
    
    test("perfect 4", () => {
        const note2 = new Note("C5");

        expect(calculateInterval(note1, note2).getInterval()).toEqual("perfect 4");
    });
    
    test("augmented 4", () => {
        const note2 = new Note("C#5");

        expect(calculateInterval(note1, note2).getInterval()).toEqual("augmented 4");
    });
    
    test("diminished 5", () => {
        const note2 = new Note("Db5");

        expect(calculateInterval(note1, note2).getInterval()).toEqual("diminished 5");
    });
    
    test("major 6", () => {
        const note2 = new Note("E5");

        expect(calculateInterval(note1, note2).getInterval()).toEqual("major 6");
    });
    
    test("minor 7", () => {
        const note2 = new Note("F5");

        expect(calculateInterval(note1, note2).getInterval()).toEqual("minor 7");
    });
    
    test("perfect 8", () => {
        const note2 = new Note("G5");

        expect(calculateInterval(note1, note2).getInterval()).toEqual("perfect 8");
    });
    
    test("minor 10", () => {
        const note2 = new Note("Bb5");

        expect(calculateInterval(note1, note2).getInterval()).toEqual("minor 10");
    });
});

describe("Calculate note from interval", () => {
    const note = new Note("G4");

    test("Ascending dinimished 4", () => {
        const interval = new Interval("dinimished 4", 4);

        expect(calculateNoteFromInterval(note, interval, true).getNote()).toBe("Cb5");
    });
    
    test("Descending augmented 5", () => {
        const interval = new Interval("augmented 5", 8);

        expect(calculateNoteFromInterval(note, interval, false).getNote()).toBe("Cb4");
    });
    
    test("Ascending (not specified) augmented 8", () => {
        const interval = new Interval("augmented 8", 13);

        expect(calculateNoteFromInterval(note, interval).getNote()).toBe("G#5");
    });
});

describe("Available interval utils", () => {
    test("Interval numbers", () => {
        expect(availableIntervalNumbers()).toEqual([
            "unison",
            "second",
            "third",
            "fourth",
            "fifth",
            "sixth",
            "seventh",
            "octave"
        ]);
    });

    test("Interval qualities up to Grade Three", () => {
        expect(availableIntervalQualities(3)).toEqual([
            "minor",
            "perfect",
            "major"
        ]);
    });

    test("After Grade Three", () => {
        expect(availableIntervalQualities(4)).toEqual([
            "diminished",
            "minor",
            "perfect",
            "major",
            "augmented"
        ]);
    });
});