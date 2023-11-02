import {describe, test, expect} from "@jest/globals";
import Interval from "../utils/intervals/interval";

describe("Test interval class", () => {
    const interval1 = new Interval("minor 3", 3);
    const interval2 = new Interval("perfect 11", 5);
    const interval3 = new Interval("2", 4);
    const interval4 = new Interval("augmented 6");

    test("Get interval", () => {
        expect(interval1.getInterval()).toBe("minor 3");
        expect(interval2.getInterval()).toBe("perfect 11");
        expect(interval3.getInterval()).toBe("2");
        expect(interval4.getInterval()).toBe("augmented 6");
    });

    test("Get distance", () => {
        expect(interval1.getDistance()).toBe(3);
        expect(interval2.getDistance()).toBe(11);
        expect(interval3.getDistance()).toBe(2);
        expect(interval4.getDistance()).toBe(6);
    });

    test("Get simple distance", () => {
        expect(interval1.getSimpleDistance()).toBe(3);
        expect(interval2.getSimpleDistance()).toBe(4);
        expect(interval3.getSimpleDistance()).toBe(2);
        expect(interval4.getSimpleDistance()).toBe(6);
    });

    test("Get number", () => {
        expect(interval1.getNumber()).toBe("third");
        expect(interval2.getNumber()).toBe("fourth");
        expect(interval3.getNumber()).toBe("second");
        expect(interval4.getNumber()).toBe("sixth");
    });

    test("Get quality", () => {
        expect(interval1.getQuality()).toBe("minor");
        expect(interval2.getQuality()).toBe("perfect");
        expect(interval3.getQuality()).toBe(null);
        expect(interval4.getQuality()).toBe("augmented");
    });

    test("Get semitones", () => {
        expect(interval1.getSemitones()).toBe(3);
        expect(interval2.getSemitones()).toBe(5);
        expect(interval3.getSemitones()).toBe(4);
        expect(interval4.getSemitones()).toBe(10);
    });

    test("Is compound", () => {
        expect(interval1.isCompound()).toBe(false);
        expect(interval2.isCompound()).toBe(true);
        expect(interval3.isCompound()).toBe(false);
        expect(interval4.isCompound()).toBe(false);
    });

    test("Is classified", () => {
        expect(interval1.isClassified()).toBe(true);
        expect(interval2.isClassified()).toBe(true);
        expect(interval3.isClassified()).toBe(false);
        expect(interval4.isClassified()).toBe(true);
    });
})