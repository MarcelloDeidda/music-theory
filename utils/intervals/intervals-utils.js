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
        unison: this.qualities.perfect,
        second: this.qualities.diminished,
        seventh: this.qualities.augmented,
        octave: this.qualities.perfect
    },
    1: {
        unison: this.qualities.augmented,
        second: this.qualities.minor,
        octave: this.qualities.augmented
    },
    2: {
        second: this.qualities.major,
        third: this.qualities.diminished
    },
    3: {
        second: this.qualities.augmented,
        third: this.qualities.minor
    },
    4: {
        third: this.qualities.major,
        fourth: this.qualities.diminished
    },
    5: {
        third: this.qualities.augmented,
        fourth: this.qualities.perfect
    },
    6: {
        fourth: this.qualities.augmented,
        fifth: this.qualities.diminished
    },
    7: {
        fifth: this.qualities.perfect,
        sixth: this.qualities.diminished
    },
    8: {
        fifth: this.qualities.augmented,
        sixth: this.qualities.minor
    },
    9: {
        sixth: this.qualities.major,
        seventh: this.qualities.diminished
    },
    10: {
        sixth: this.qualities.augmented,
        seventh: this.qualities.minor
    },
    11: {
        seventh: this.qualities.major,
        octave: this.qualities.diminished
    }
}