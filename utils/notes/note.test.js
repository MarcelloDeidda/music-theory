const Note = require("./note");

describe("Test Note class", () => {
    const note1 = new Note("C4", "crotchet", true);
    const note2 = new Note("Ab5", "minim", false);
    const note3 = new Note("Fx3", "quaver", false);

    test("Get note", () => {
        expect(note1.getNote()).toBe("C4");
        expect(note2.getNote()).toBe("Ab5");
        expect(note3.getNote()).toBe("Fx3");
    });

    test("Get note without octave", () => {
        expect(note1.getNoteWithoutOctave()).toBe("C");
        expect(note2.getNoteWithoutOctave()).toBe("Ab");
        expect(note3.getNoteWithoutOctave()).toBe("Fx");
    });

    test("Get letter name", () => {
        expect(note1.getLetterName()).toBe("C");
        expect(note2.getLetterName()).toBe("A");
        expect(note3.getLetterName()).toBe("F");
    });

    test("Get octave", () => {
        expect(note1.getOctave()).toBe("4");
        expect(note2.getOctave()).toBe("5");
        expect(note3.getOctave()).toBe("3");
    });

    test("Get accidental", () => {
        expect(note1.getAccidental()).toBe(null);
        expect(note2.getAccidental()).toBe("b");
        expect(note3.getAccidental()).toBe("x");
    });

    test("Get accidental in semitones", () => {
        expect(note1.getAccidentalInSemitones()).toBe(0);
        expect(note2.getAccidentalInSemitones()).toBe(-1);
        expect(note3.getAccidentalInSemitones()).toBe(2);
    });

    test("Get value", () => {
        expect(note1.getValue()).toBe("dotted crotchet");
        expect(note2.getValue()).toBe("minim");
        expect(note3.getValue()).toBe("quaver");
    });

    test("Get beats", () => {
        expect(note1.getBeats()).toBe(1.5);
        expect(note2.getBeats()).toBe(2);
        expect(note3.getBeats()).toBe(0.5);
    });
})