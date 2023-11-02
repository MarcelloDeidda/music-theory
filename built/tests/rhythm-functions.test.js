"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const rhythm_functions_1 = require("../utils/rhythm/rhythm-functions");
(0, globals_1.describe)("Calculate metre", () => {
    (0, globals_1.test)("Duple", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findMetre)([6, 4])).toBe("duple");
    });
    (0, globals_1.test)("Triple", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findMetre)([3, 16])).toBe("triple");
    });
    (0, globals_1.test)("Quadruple", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findMetre)([4, 4])).toBe("quadruple");
    });
    (0, globals_1.test)("Irregular", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findMetre)([7, 8])).toBe("irregular");
    });
});
(0, globals_1.describe)("Check compound time signature", () => {
    (0, globals_1.test)("Compound", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.isCompound)([6, 8])).toBe(true);
    });
    (0, globals_1.test)("Not compound", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.isCompound)([3, 8])).toBe(false);
    });
});
(0, globals_1.describe)("Check irregular time signature", () => {
    (0, globals_1.test)("Irregular", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.isIrregular)([7, 4])).toBe(true);
    });
    (0, globals_1.test)("Not irregular", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.isIrregular)([4, 4])).toBe(false);
    });
});
(0, globals_1.describe)("Calculate beats", () => {
    (0, globals_1.test)("4/4", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.calculateTimeSignatureBeats)([4, 4])).toBe(4);
    });
    (0, globals_1.test)("3/8", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.calculateTimeSignatureBeats)([3, 8])).toBe(1.5);
    });
    (0, globals_1.test)("6/4", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.calculateTimeSignatureBeats)([6, 4])).toBe(6);
    });
    (0, globals_1.test)("5/16", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.calculateTimeSignatureBeats)([5, 16])).toBe(1.25);
    });
    (0, globals_1.test)("7/8", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.calculateTimeSignatureBeats)([7, 8])).toBe(3.5);
    });
    (0, globals_1.test)("9/4", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.calculateTimeSignatureBeats)([9, 4])).toBe(9);
    });
    (0, globals_1.test)("12/8", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.calculateTimeSignatureBeats)([12, 8])).toBe(6);
    });
});
(0, globals_1.describe)("Calculate whole bar value", () => {
    (0, globals_1.test)("3/16", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findWholeBarValue)([3, 16])).toBe("dotted quaver");
    });
    (0, globals_1.test)("3/8", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findWholeBarValue)([3, 8])).toBe("dotted crotchet");
    });
    (0, globals_1.test)("6/8", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findWholeBarValue)([6, 8])).toBe("dotted minim");
    });
    (0, globals_1.test)("6/4", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findWholeBarValue)([6, 4])).toBe("dotted semibreve");
    });
    (0, globals_1.test)("2/8", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findWholeBarValue)([2, 8])).toBe("crotchet");
    });
    (0, globals_1.test)("2/4", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findWholeBarValue)([2, 4])).toBe("minim");
    });
    (0, globals_1.test)("2/2", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findWholeBarValue)([2, 2])).toBe("semibreve");
    });
    (0, globals_1.test)("7/8", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findWholeBarValue)([7, 8])).toBe(undefined);
    });
    (0, globals_1.test)("9/8", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findWholeBarValue)([9, 8])).toBe(undefined);
    });
});
(0, globals_1.describe)("Calculate beat value", () => {
    (0, globals_1.test)("3/16", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([3, 16])).toBe("semiquaver");
    });
    (0, globals_1.test)("2/8", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([2, 8])).toBe("quaver");
    });
    (0, globals_1.test)("4/4", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([4, 4])).toBe("crotchet");
    });
    (0, globals_1.test)("4/2", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([4, 2])).toBe("minim");
    });
    (0, globals_1.test)("9/2", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([9, 2])).toBe("dotted semibreve");
    });
    (0, globals_1.test)("6/4", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([6, 4])).toBe("dotted minim");
    });
    (0, globals_1.test)("12/8", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([12, 8])).toBe("dotted crotchet");
    });
    (0, globals_1.test)("9/16", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([9, 16])).toBe("dotted quaver");
    });
    (0, globals_1.test)("7/8", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([7, 8])).toBe("quaver");
    });
    (0, globals_1.test)("7/4", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([7, 4])).toBe("crotchet");
    });
    (0, globals_1.test)("5/2", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([5, 2])).toBe("minim");
    });
    (0, globals_1.test)("5/16", () => {
        (0, globals_1.expect)((0, rhythm_functions_1.findBeatValue)([5, 16])).toBe("semiquaver");
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
