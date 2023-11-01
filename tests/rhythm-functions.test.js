const { findMetre, isCompound, isIrregular, calculateTimeSignatureBeats, findWholeBarValue, findBeatValue, createBar, checkBarBeats } = require("../src/utils/rhythm/rhythm-functions")
const Note = require("../src/utils/notes/note");

describe("Calculate metre", () => {
    test("Duple", () => {
        expect(findMetre([6, 4])).toBe("duple");
    });

    test("Triple", () => {
        expect(findMetre([3, 16])).toBe("triple");
    });

    test("Quadruple", () => {
        expect(findMetre([4, 4])).toBe("quadruple");
    });

    test("Irregular", () => {
        expect(findMetre([7, 8])).toBe("irregular");
    });
});

describe("Check compound time signature", () => {
    test("Compound", () => {
        expect(isCompound([6, 8])).toBe(true);
    });

    test("Not compound", () => {
        expect(isCompound([3, 8])).toBe(false);
    });
});

describe("Check irregular time signature", () => {
    test("Irregular", () => {
        expect(isIrregular([7, 4])).toBe(true);
    });

    test("Not irregular", () => {
        expect(isIrregular([4, 4])).toBe(false);
    });
});

describe("Calculate beats", () => {
    test("4/4", () => {
        expect(calculateTimeSignatureBeats([4, 4])).toBe(4);
    });

    test("3/8", () => {
        expect(calculateTimeSignatureBeats([3, 8])).toBe(1.5);
    });

    test("6/4", () => {
        expect(calculateTimeSignatureBeats([6, 4])).toBe(6);
    });

    test("5/16", () => {
        expect(calculateTimeSignatureBeats([5, 16])).toBe(1.25);
    });

    test("7/8", () => {
        expect(calculateTimeSignatureBeats([7, 8])).toBe(3.5);
    });

    test("9/4", () => {
        expect(calculateTimeSignatureBeats([9, 4])).toBe(9);
    });

    test("12/8", () => {
        expect(calculateTimeSignatureBeats([12, 8])).toBe(6);
    });
});

describe("Calculate whole bar value", () => {
    test("3/16", () => {
        expect(findWholeBarValue([3, 16])).toBe("dotted quaver");
    });

    test("3/8", () => {
        expect(findWholeBarValue([3, 8])).toBe("dotted crotchet");
    });

    test("6/8", () => {
        expect(findWholeBarValue([6, 8])).toBe("dotted minim");
    });

    test("6/4", () => {
        expect(findWholeBarValue([6, 4])).toBe("dotted semibreve");
    });

    test("2/8", () => {
        expect(findWholeBarValue([2, 8])).toBe("crotchet");
    });

    test("2/4", () => {
        expect(findWholeBarValue([2, 4])).toBe("minim");
    });

    test("2/2", () => {
        expect(findWholeBarValue([2, 2])).toBe("semibreve");
    });

    test("7/8", () => {
        expect(findWholeBarValue([7, 8])).toBe(undefined);
    });

    test("9/8", () => {
        expect(findWholeBarValue([9, 8])).toBe(undefined);
    });
});

describe("Calculate beat value", () => {
    test("3/16", () => {
        expect(findBeatValue([3, 16])).toBe("semiquaver");
    });

    test("2/8", () => {
        expect(findBeatValue([2, 8])).toBe("quaver");
    });

    test("4/4", () => {
        expect(findBeatValue([4, 4])).toBe("crotchet");
    });

    test("4/2", () => {
        expect(findBeatValue([4, 2])).toBe("minim");
    });

    test("9/2", () => {
        expect(findBeatValue([9, 2])).toBe("dotted semibreve");
    });

    test("6/4", () => {
        expect(findBeatValue([6, 4])).toBe("dotted minim");
    });

    test("12/8", () => {
        expect(findBeatValue([12, 8])).toBe("dotted crotchet");
    });

    test("9/16", () => {
        expect(findBeatValue([9, 16])).toBe("dotted quaver");
    });

    test("7/8", () => {
        expect(findBeatValue([7, 8])).toBe("quaver");
    });

    test("7/4", () => {
        expect(findBeatValue([7, 4])).toBe("crotchet");
    });

    test("5/2", () => {
        expect(findBeatValue([5, 2])).toBe("minim");
    });

    test("5/16", () => {
        expect(findBeatValue([5, 16])).toBe("semiquaver");
    });
});
/*
describe("Create random bar, check time signature", () => {
    test("4/4", () => {
        const bar = createBar([4, 4]).map(value => {
            let noteValue, dotted;

            if (value.split(" ").length > 1) {
                
            }
            return new Note();
        });


        expect(checkBarBeats(bar)).toEqual(true);
    })
});*/