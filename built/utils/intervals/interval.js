"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intervals_utils_1 = require("./intervals-utils");
const Interval = class {
    // This object is initialised with a string containing quality and number
    // (as integer number) of the required interval
    constructor(interval, semitones = undefined) {
        this.interval = interval;
        this.semitones = semitones;
    }
    getInterval() {
        return this.interval;
    }
    getDistance() {
        const interval = this.interval.split(" ");
        if (interval.length > 1) {
            return parseInt(interval[1]);
        }
        else {
            return parseInt(interval[0]);
        }
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
        return intervals_utils_1.intervalNumbers[simpleDistance];
    }
    getQuality() {
        const interval = this.interval.split(" ");
        if (interval.length > 1) {
            return interval[0];
        }
        else {
            return null;
        }
    }
    getSemitones() {
        if (this.semitones) {
            return this.semitones;
        }
        else {
            for (let semitoneCount in intervals_utils_1.semitonesToIntervals) {
                if (intervals_utils_1.semitonesToIntervals[semitoneCount][this.getNumber()] === this.getQuality()) {
                    return parseInt(semitoneCount);
                }
            }
        }
        return undefined;
    }
    isCompound() {
        return this.getDistance() > 8;
    }
    isClassified() {
        return this.getQuality() !== null;
    }
};
exports.default = Interval;
