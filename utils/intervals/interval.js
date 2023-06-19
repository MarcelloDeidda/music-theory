const { intervalNumbers, semitonesToIntervals } = require("./interval-utils");

const Interval = class {
    constructor(intervalString, semitones = null) {
        const interval = intervalString.split(" ");
        let number = parseInt(interval[0]);

        this.distance = number;

        while (number > 8) {
            number = number % 7;
        }

        this.simpleDistance = number;
        this.number = intervalNumbers[number];
        this.compound = this.distance > 8;

        if (interval.length > 1) {
            this.quality = interval[1];
            this.unclassified = false;
        } else {
            this.quality = null;
            this.unclassified = true;
        }

        if (semitones) {
            this.semitones = semitones;
        } else {
            for (let semitoneCount in semitonesToIntervals) {
                if (semitonesToIntervals[semitoneCount][this.number] === this.quality) {
                    this.semitones = parseInt(semitoneCount);
                }
            }
        }
    }
}

module.exports = Interval;