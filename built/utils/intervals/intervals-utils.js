"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semitonesToIntervals = exports.intervalNumbers = exports.qualities = void 0;
exports.qualities = {
    augmented: "augmented",
    diminished: "diminished",
    perfect: "perfect",
    minor: "minor",
    major: "major"
};
exports.intervalNumbers = {
    1: "unison",
    2: "second",
    3: "third",
    4: "fourth",
    5: "fifth",
    6: "sixth",
    7: "seventh",
    8: "octave"
};
exports.semitonesToIntervals = {
    0: {
        unison: exports.qualities.perfect,
        second: exports.qualities.diminished,
        seventh: exports.qualities.augmented,
        octave: exports.qualities.perfect
    },
    1: {
        unison: exports.qualities.augmented,
        second: exports.qualities.minor,
        octave: exports.qualities.augmented
    },
    2: {
        second: exports.qualities.major,
        third: exports.qualities.diminished
    },
    3: {
        second: exports.qualities.augmented,
        third: exports.qualities.minor
    },
    4: {
        third: exports.qualities.major,
        fourth: exports.qualities.diminished
    },
    5: {
        third: exports.qualities.augmented,
        fourth: exports.qualities.perfect
    },
    6: {
        fourth: exports.qualities.augmented,
        fifth: exports.qualities.diminished
    },
    7: {
        fifth: exports.qualities.perfect,
        sixth: exports.qualities.diminished
    },
    8: {
        fifth: exports.qualities.augmented,
        sixth: exports.qualities.minor
    },
    9: {
        sixth: exports.qualities.major,
        seventh: exports.qualities.diminished
    },
    10: {
        sixth: exports.qualities.augmented,
        seventh: exports.qualities.minor
    },
    11: {
        seventh: exports.qualities.major,
        octave: exports.qualities.diminished
    }
};
