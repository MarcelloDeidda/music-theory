const { intervalNumbers, semitonesToIntervals } = require("./intervals-utils");

const Interval = class {
    #interval;
    #semitones;

    // This object is initialised with a string containing quality and number
    // (as integer number) of the required interval
    constructor(interval, semitones = null) {
        this.#interval = interval;
        this.#semitones = semitones;
    }

    getInterval() {
        return this.#interval;
    }

    getDistance() {
        return parseInt(this.#interval.split(" ")[1]);
    }

    getSimpleDistance() {
        let distance = this.getDistance();

        while (distance > 8) {
            distance = distance % 7;
        }

        return distance;
    }

    getNumber() {
        let simpleDistance = this.getSimpleDistance();

        return intervalNumbers[simpleDistance];
    }

    getQuality() {
        const interval = this.#interval.split(" ");
        if (interval.length > 1) {
            return interval[0];
        } else {
            return null;
        }
    }

    getSemitones() {
        if (this.#semitones) {
            return this.#semitones;
        } else {
            for (let semitoneCount in semitonesToIntervals) {
                if (semitonesToIntervals[semitoneCount][this.getNumber()] === this.getQuality()) {
                    return parseInt(semitoneCount);
                }
            }
        }
    }

    isCompound() {
        return this.getDistance() > 8;
    }

    isClassified() {
        return this.getQuality() !== null;
    }
}

module.exports = Interval;