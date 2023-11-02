"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const interval_1 = __importDefault(require("../utils/intervals/interval"));
(0, globals_1.describe)("Test interval class", () => {
    const interval1 = new interval_1.default("minor 3", 3);
    const interval2 = new interval_1.default("perfect 11", 5);
    const interval3 = new interval_1.default("2", 4);
    const interval4 = new interval_1.default("augmented 6");
    (0, globals_1.test)("Get interval", () => {
        (0, globals_1.expect)(interval1.getInterval()).toBe("minor 3");
        (0, globals_1.expect)(interval2.getInterval()).toBe("perfect 11");
        (0, globals_1.expect)(interval3.getInterval()).toBe("2");
        (0, globals_1.expect)(interval4.getInterval()).toBe("augmented 6");
    });
    (0, globals_1.test)("Get distance", () => {
        (0, globals_1.expect)(interval1.getDistance()).toBe(3);
        (0, globals_1.expect)(interval2.getDistance()).toBe(11);
        (0, globals_1.expect)(interval3.getDistance()).toBe(2);
        (0, globals_1.expect)(interval4.getDistance()).toBe(6);
    });
    (0, globals_1.test)("Get simple distance", () => {
        (0, globals_1.expect)(interval1.getSimpleDistance()).toBe(3);
        (0, globals_1.expect)(interval2.getSimpleDistance()).toBe(4);
        (0, globals_1.expect)(interval3.getSimpleDistance()).toBe(2);
        (0, globals_1.expect)(interval4.getSimpleDistance()).toBe(6);
    });
    (0, globals_1.test)("Get number", () => {
        (0, globals_1.expect)(interval1.getNumber()).toBe("third");
        (0, globals_1.expect)(interval2.getNumber()).toBe("fourth");
        (0, globals_1.expect)(interval3.getNumber()).toBe("second");
        (0, globals_1.expect)(interval4.getNumber()).toBe("sixth");
    });
    (0, globals_1.test)("Get quality", () => {
        (0, globals_1.expect)(interval1.getQuality()).toBe("minor");
        (0, globals_1.expect)(interval2.getQuality()).toBe("perfect");
        (0, globals_1.expect)(interval3.getQuality()).toBe(null);
        (0, globals_1.expect)(interval4.getQuality()).toBe("augmented");
    });
    (0, globals_1.test)("Get semitones", () => {
        (0, globals_1.expect)(interval1.getSemitones()).toBe(3);
        (0, globals_1.expect)(interval2.getSemitones()).toBe(5);
        (0, globals_1.expect)(interval3.getSemitones()).toBe(4);
        (0, globals_1.expect)(interval4.getSemitones()).toBe(10);
    });
    (0, globals_1.test)("Is compound", () => {
        (0, globals_1.expect)(interval1.isCompound()).toBe(false);
        (0, globals_1.expect)(interval2.isCompound()).toBe(true);
        (0, globals_1.expect)(interval3.isCompound()).toBe(false);
        (0, globals_1.expect)(interval4.isCompound()).toBe(false);
    });
    (0, globals_1.test)("Is classified", () => {
        (0, globals_1.expect)(interval1.isClassified()).toBe(true);
        (0, globals_1.expect)(interval2.isClassified()).toBe(true);
        (0, globals_1.expect)(interval3.isClassified()).toBe(false);
        (0, globals_1.expect)(interval4.isClassified()).toBe(true);
    });
});
