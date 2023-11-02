"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subdivideIrregularNote = exports.subdivideCompoundTernaryNote = exports.subdivideCompoundNote = exports.subdivideNote = exports.subdivideIntoSextuplet = exports.subdivideIntoQuintuplet = exports.subdivideIntoTriplet = exports.subdivideIntoCompoundSincopation = exports.subdivideIntoSincopation = exports.subdivideIntoDoubleDotted = exports.subdivideIntoDotted = exports.subdivideIntoTernary = void 0;
const rhythm_utils_1 = require("./rhythm-utils");
const subdivideIntoTernary = (note, minValue, maxValue, grade) => {
    const noteIndex = rhythm_utils_1.valueList.indexOf(note.split(" ")[1]);
    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }
    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
        return [
            ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[noteIndex + 1], minValue, maxValue, grade),
            ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[noteIndex], minValue, maxValue, grade)
        ];
    }
    else {
        return [
            ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[noteIndex], minValue, maxValue, grade),
            ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[noteIndex + 1], minValue, maxValue, grade)
        ];
    }
};
exports.subdivideIntoTernary = subdivideIntoTernary;
const subdivideIntoDotted = (note, minValue, maxValue, grade) => {
    const noteIndex = rhythm_utils_1.valueList.indexOf(note);
    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }
    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
        return [
            `dotted ${rhythm_utils_1.valueList[noteIndex + 1]}`,
            ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[noteIndex + 2], minValue, maxValue, grade)
        ];
    }
    else {
        return [
            ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[noteIndex + 2], minValue, maxValue, grade),
            `dotted ${rhythm_utils_1.valueList[noteIndex + 1]}`
        ];
    }
};
exports.subdivideIntoDotted = subdivideIntoDotted;
const subdivideIntoDoubleDotted = (note, minValue, maxValue, grade) => {
    const noteIndex = rhythm_utils_1.valueList.indexOf(note);
    if (noteIndex > 3) {
        throw new Error("Cannot subdivide further");
    }
    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
        return [
            `double-dotted ${rhythm_utils_1.valueList[noteIndex + 1]}`,
            ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[noteIndex + 3], minValue, maxValue, grade)
        ];
    }
    else {
        return [
            ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[noteIndex + 3], minValue, maxValue, grade),
            `double-dotted ${rhythm_utils_1.valueList[noteIndex + 1]}`
        ];
    }
};
exports.subdivideIntoDoubleDotted = subdivideIntoDoubleDotted;
const subdivideIntoSincopation = (note, minValue, maxValue, grade) => {
    const noteIndex = rhythm_utils_1.valueList.indexOf(note);
    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }
    return [
        ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[noteIndex + 2], minValue, maxValue, grade),
        rhythm_utils_1.valueList[noteIndex + 1],
        ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[noteIndex + 2], minValue, maxValue, grade)
    ];
};
exports.subdivideIntoSincopation = subdivideIntoSincopation;
const subdivideIntoCompoundSincopation = (note, minValue, maxValue, grade) => {
    const noteIndex = rhythm_utils_1.valueList.indexOf(note.split(" ")[1]);
    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }
    return [
        ...(0, exports.subdivideNote)(`dotted ${rhythm_utils_1.valueList[noteIndex + 2]}`, minValue, maxValue, grade),
        `dotted ${rhythm_utils_1.valueList[noteIndex + 1]}`,
        ...(0, exports.subdivideNote)(`dotted ${rhythm_utils_1.valueList[noteIndex + 2]}`, minValue, maxValue, grade)
    ];
};
exports.subdivideIntoCompoundSincopation = subdivideIntoCompoundSincopation;
const subdivideIntoTriplet = (note, grade) => {
    const noteIndex = rhythm_utils_1.valueList.indexOf(note);
    if (noteIndex > 5) {
        throw new Error("Cannot subdivide further");
    }
    else if (grade < 2) {
        throw new Error("Triplets are not available before Grade Two");
    }
    return new Array(3).fill(`triplet ${rhythm_utils_1.valueList[noteIndex + 1]}`);
};
exports.subdivideIntoTriplet = subdivideIntoTriplet;
const subdivideIntoQuintuplet = (note, grade) => {
    const noteIndex = rhythm_utils_1.valueList.indexOf(note);
    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }
    else if (grade < 5) {
        throw new Error("Quintuplets are not available before Grade Five");
    }
    return new Array(5).fill(`quintuplet ${rhythm_utils_1.valueList[noteIndex + 2]}`);
};
exports.subdivideIntoQuintuplet = subdivideIntoQuintuplet;
const subdivideIntoSextuplet = (note, grade) => {
    const noteIndex = rhythm_utils_1.valueList.indexOf(note);
    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }
    else if (grade < 5) {
        throw new Error("Sextuplets are not available before Grade Five");
    }
    return new Array(6).fill(`sextuplet ${rhythm_utils_1.valueList[noteIndex + 2]}`);
};
exports.subdivideIntoSextuplet = subdivideIntoSextuplet;
const subdivideNote = (note, minValue = "breve", maxValue = "demisemiquaver", grade = 5) => {
    // Demisemiquaver are not available before Grade Three
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = "semiquaver";
    }
    // If maxValue is reached, the function returns it
    if (note === maxValue) {
        return [note];
    }
    let currentValueIndex = rhythm_utils_1.valueList.indexOf(note);
    let minValueIndex = rhythm_utils_1.valueList.indexOf(minValue);
    let maxValueIndex = rhythm_utils_1.valueList.indexOf(maxValue);
    let random;
    // Handle Dotted Notes
    if (note.split(" ")[0] === "dotted") {
        currentValueIndex = rhythm_utils_1.valueList.indexOf(note.split(" ")[1]);
        if (note.split(" ")[0] === maxValue) {
            return [note];
        }
        random = Math.floor(Math.random() * 3);
        if (random === 0 && currentValueIndex - minValueIndex >= 0) {
            return [note];
        }
        else {
            return (0, exports.subdivideIntoTernary)(note, minValue, maxValue, grade);
        }
    }
    random = Math.floor(Math.random() * 20);
    // Handle normal subdivision
    if (random === 0 && maxValueIndex - currentValueIndex > 1 && currentValueIndex - minValueIndex >= -1) {
        // Dotted Pattern
        return (0, exports.subdivideIntoDotted)(note, minValue, maxValue, grade);
    }
    else if (random === 1 && maxValueIndex - currentValueIndex > 2 && currentValueIndex - minValueIndex >= -1 && grade > 3) {
        // Double-dotted Pattern
        return (0, exports.subdivideIntoDoubleDotted)(note, minValue, maxValue, grade);
    }
    else if (random === 2 && maxValueIndex - currentValueIndex > 1 && currentValueIndex - minValueIndex >= -1) {
        // Sincopation Pattern
        return (0, exports.subdivideIntoSincopation)(note, minValue, maxValue, grade);
    }
    else if (random === 3 && grade > 1 && currentValueIndex - minValueIndex >= -1) {
        // Triplet Pattern
        return (0, exports.subdivideIntoTriplet)(note, grade);
    }
    else if (random === 4 && maxValueIndex - currentValueIndex > 1 && grade > 4 && currentValueIndex - minValueIndex >= -2) {
        // Quintuplet Pattern
        return (0, exports.subdivideIntoQuintuplet)(note, grade);
    }
    else if (random === 5 && maxValueIndex - currentValueIndex > 1 && grade > 4 && currentValueIndex - minValueIndex >= -2) {
        // Sextuplet Pattern
        return (0, exports.subdivideIntoSextuplet)(note, grade);
    }
    else if (random > 5 && random < 12 && currentValueIndex - minValueIndex >= 0) {
        // Single note
        return [note];
    }
    else {
        // Further Subdivision
        return [
            ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[currentValueIndex + 1], minValue, maxValue, grade),
            ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[currentValueIndex + 1], minValue, maxValue, grade)
        ];
    }
};
exports.subdivideNote = subdivideNote;
const subdivideCompoundNote = (note, metre, minValue = "breve", maxValue = "demisemiquaver", grade = 5) => {
    // Demisemiquaver are not available before Grade Three
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = "semiquaver";
    }
    // If maxValue is reached, the function returns it 
    if (note.split(" ")[1] === maxValue) {
        return [note];
    }
    let currentValueIndex = rhythm_utils_1.valueList.indexOf(note.split(" ")[1]);
    let minValueIndex = rhythm_utils_1.valueList.indexOf(minValue);
    let maxValueIndex = rhythm_utils_1.valueList.indexOf(maxValue);
    let random;
    switch (metre) {
        case "duple":
            random = Math.floor(Math.random() * 3);
            if (random === 0 && currentValueIndex - minValueIndex >= 0) {
                return [note];
            }
            else {
                return [
                    ...(0, exports.subdivideNote)(`dotted ${rhythm_utils_1.valueList[currentValueIndex + 1]}`, minValue, maxValue, grade),
                    ...(0, exports.subdivideNote)(`dotted ${rhythm_utils_1.valueList[currentValueIndex + 1]}`, minValue, maxValue, grade)
                ];
            }
        case "quadruple":
            random = Math.floor(Math.random() * 3);
            if (random === 0 && currentValueIndex - minValueIndex >= 0) {
                return [note];
            }
            else if (random === 1 && maxValueIndex - currentValueIndex > 1) {
                return (0, exports.subdivideIntoCompoundSincopation)(note, minValue, maxValue, grade);
            }
            else {
                return [
                    ...(0, exports.subdivideCompoundNote)(`dotted ${rhythm_utils_1.valueList[currentValueIndex + 1]}`, "duple", minValue, maxValue, grade),
                    ...(0, exports.subdivideCompoundNote)(`dotted ${rhythm_utils_1.valueList[currentValueIndex + 1]}`, "duple", minValue, maxValue, grade)
                ];
            }
        default:
            throw new Error("Unexpected error in subdividing compound note: metre is not valid!");
    }
};
exports.subdivideCompoundNote = subdivideCompoundNote;
const subdivideCompoundTernaryNote = (beatNote, minValue = "breve", maxValue = "demisemiquaver", grade = 5) => {
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = "semiquaver";
    }
    let currentValueIndex = rhythm_utils_1.valueList.indexOf(beatNote.split(" ")[1]);
    let random = Math.floor(Math.random() * 2);
    if (random === 0) {
        return [
            ...(0, exports.subdivideNote)(beatNote, minValue, maxValue, grade),
            ...(0, exports.subdivideCompoundNote)(`dotted ${rhythm_utils_1.valueList[currentValueIndex - 1]}`, "duple", minValue, maxValue, grade)
        ];
    }
    else {
        return [
            ...(0, exports.subdivideCompoundNote)(`dotted ${rhythm_utils_1.valueList[currentValueIndex - 1]}`, "duple", minValue, maxValue, grade),
            ...(0, exports.subdivideNote)(beatNote, minValue, maxValue, grade)
        ];
    }
};
exports.subdivideCompoundTernaryNote = subdivideCompoundTernaryNote;
const subdivideIrregularNote = (beatNote, beatNum, minValue = "breve", maxValue = "demisemiquaver", grade = 5) => {
    // Demisemiquaver are not available before Grade Three
    if (grade < 5) {
        throw new Error("Irregular time signatures are not available before Grade Five");
    }
    let currentValueIndex = rhythm_utils_1.valueList.indexOf(beatNote);
    let random;
    switch (beatNum) {
        case 5:
            random = Math.floor(Math.random() * 2);
            if (random === 0) {
                return [
                    ...(0, exports.subdivideNote)(`dotted ${rhythm_utils_1.valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                    ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[currentValueIndex - 1], minValue, maxValue, grade)
                ];
            }
            else {
                return [
                    ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[currentValueIndex - 1], minValue, maxValue, grade),
                    ...(0, exports.subdivideNote)(`dotted ${rhythm_utils_1.valueList[currentValueIndex - 1]}`, minValue, maxValue, grade)
                ];
            }
        case 7:
            random = Math.floor(Math.random() * 3);
            if (random === 0) {
                return [
                    ...(0, exports.subdivideNote)(`dotted ${rhythm_utils_1.valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                    ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[currentValueIndex - 2], minValue, maxValue, grade)
                ];
            }
            else if (random === 1) {
                return [
                    ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[currentValueIndex - 1], minValue, maxValue, grade),
                    ...(0, exports.subdivideNote)(`dotted ${rhythm_utils_1.valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                    ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[currentValueIndex - 1], minValue, maxValue, grade)
                ];
            }
            else {
                return [
                    ...(0, exports.subdivideNote)(rhythm_utils_1.valueList[currentValueIndex - 2], minValue, maxValue, grade),
                    ...(0, exports.subdivideNote)(`dotted ${rhythm_utils_1.valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                ];
            }
        default:
            throw new Error("Irregular time signatures should have 5 or 7 beats");
    }
};
exports.subdivideIrregularNote = subdivideIrregularNote;
