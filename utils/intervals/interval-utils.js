module.exports.qualities = {
    augmented: "augmented",
    diminished: "diminished",
    perfect: "perfect",
    minor: "minor",
    major: "major"
}

module.exports.intervalNumbers = {
    1: "unison",
    2: "second",
    3: "third",
    4: "fourth",
    5: "fifth",
    6: "sixth",
    7: "seventh",
    8: "octave"
}

module.exports.semitonesToIntervals = {
    0: {
        unison: qualities.perfect,
        second: qualities.diminished,
        seventh: qualities.augmented,
        octave: qualities.perfect
    },
    1: {
        unison: qualities.augmented,
        second: qualities.minor,
        octave: qualities.augmented
    },
    2: {
        second: qualities.major,
        third: qualities.diminished
    },
    3: {
        second: qualities.augmented,
        third: qualities.minor
    },
    4: {
        third: qualities.major,
        fourth: qualities.diminished
    },
    5: {
        third: qualities.augmented,
        fourth: qualities.perfect
    },
    6: {
        fourth: qualities.augmented,
        fifth: qualities.diminished
    },
    7: {
        fifth: qualities.perfect,
        sixth: qualities.diminished
    },
    8: {
        fifth: qualities.augmented,
        sixth: qualities.minor
    },
    9: {
        sixth: qualities.major,
        seventh: qualities.diminished
    },
    10: {
        sixth: qualities.augmented,
        seventh: qualities.minor
    },
    11: {
        seventh: qualities.major,
        octave: qualities.diminished
    }
}