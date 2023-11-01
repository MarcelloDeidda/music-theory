import { intervalNumbers, semitonesToIntervals } from "./intervals-utils";

import { IntervalInterface } from "../../ts/interfaces/interfaces";

const Interval = class implements IntervalInterface{
    // This object is initialised with a string containing quality and number
    // (as integer number) of the required interval
    constructor(
        private interval: string,
        private semitones: number
    ) {
    }

    getInterval(): string {
        return this.interval;
    }

    getDistance(): number {
        const interval = this.interval.split(" ");
        if (interval.length > 1) {
            return parseInt(interval[1]);
        } else {
            return parseInt(interval[0]);
        }
    }

    getSimpleDistance(): number {
        let distance = this.getDistance();

        while (distance > 8) {
            distance = distance % 7;
        }

        return distance;
    }

    getNumber(): string {
        let simpleDistance = this.getSimpleDistance();

        return intervalNumbers[simpleDistance];
    }

    getQuality(): string | null {
        const interval = this.interval.split(" ");
        if (interval.length > 1) {
            return interval[0];
        } else {
            return null;
        }
    }

    getSemitones(): number {
        return this.semitones;
    }

    isCompound(): boolean {
        return this.getDistance() > 8;
    }

    isClassified(): boolean {
        return this.getQuality() !== null;
    }
}

export default Interval;