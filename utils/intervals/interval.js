const { intervalNumbers, semitonesToIntervals } = require("./interval-utils");

const Interval = class {
    constructor(intervalString) {
        const interval = intervalString.split(" ");
        let number = parseInt(interval[0]);

        this.distance = number;

        while (number > 8) {
            number = number % 7;
        }

        this.number = intervalNumbers[number];
        this.compound = interval[0] === number;

        if (interval.length > 0) {
            this.quality = interval[1];
            this.unclassified = false;
        } else {
            this.quality = null;
            this.unclassified = true;
        }

        for (let semitoneCount in semitonesToIntervals) {
            if (semitonesToIntervals[semitoneCount][this.number] === this.quality) {
                this.semitones = parseInt(semitoneCount);
            }
        }
    }
}

module.exports = Interval;