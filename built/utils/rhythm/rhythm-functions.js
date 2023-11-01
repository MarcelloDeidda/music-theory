"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBar = exports.findBeatValue = exports.findWholeBarValue = exports.getRandomTimeSignature = exports.checkBarBeats = exports.calculateTimeSignatureBeats = exports.isIrregular = exports.isCompound = exports.findMetre = void 0;
const rhythm_utils_1 = require("./rhythm-utils");
const rhythm_subdivision_1 = require("./rhythm-subdivision");
const findMetre = (timeSignature) => {
    const top = timeSignature[0];
    if ([2, 6].includes(top)) {
        return "duple";
    }
    else if ([3, 9].includes(top)) {
        return "triple";
    }
    else if ([4, 12].includes(top)) {
        return "quadruple";
    }
    return "irregular";
};
exports.findMetre = findMetre;
const isCompound = (timeSignature) => {
    const top = timeSignature[0];
    return [6, 9, 12].includes(top);
};
exports.isCompound = isCompound;
const isIrregular = (timeSignature) => {
    const top = timeSignature[0];
    return [5, 7].includes(top);
};
exports.isIrregular = isIrregular;
const calculateTimeSignatureBeats = (timeSignature) => {
    let top = timeSignature[0];
    let bottom = timeSignature[1];
    return (top / bottom) * 4;
};
exports.calculateTimeSignatureBeats = calculateTimeSignatureBeats;
const checkBarBeats = (bar, timeSignature = [4, 4]) => {
    return (0, exports.calculateTimeSignatureBeats)(timeSignature) === bar.reduce((a, b) => a + b.getBeats(), 0);
};
exports.checkBarBeats = checkBarBeats;
const getRandomTimeSignature = (grade) => {
    let timeSignatures = [
        [2, 4],
        [3, 4],
        [4, 4]
    ];
    if (grade > 1) {
        timeSignatures = timeSignatures.concat([
            [2, 2],
            [3, 2],
            [4, 2],
            [3, 8]
        ]);
    }
    if (grade > 2) {
        timeSignatures = timeSignatures.concat([
            [6, 8],
            [9, 8],
            [12, 8]
        ]);
    }
    if (grade > 3) {
        timeSignatures = timeSignatures.concat([
            [6, 4],
            [9, 4],
            [6, 16],
            [9, 16],
            [12, 16]
        ]);
    }
    if (grade > 4) {
        timeSignatures = timeSignatures.concat([
            [5, 4],
            [7, 4],
            [5, 8],
            [7, 8]
        ]);
    }
    let random = Math.floor(Math.random() * timeSignatures.length);
    return timeSignatures[random];
};
exports.getRandomTimeSignature = getRandomTimeSignature;
const findWholeBarValue = (timeSignature) => {
    let numOfBeats = (0, exports.calculateTimeSignatureBeats)(timeSignature);
    for (let value in rhythm_utils_1.values) {
        if (rhythm_utils_1.values[value] === numOfBeats) {
            return value;
        }
        else if (rhythm_utils_1.values[value] * 1.5 === numOfBeats) {
            return `dotted ${value}`;
        }
    }
    return undefined;
};
exports.findWholeBarValue = findWholeBarValue;
const findBeatValue = (timeSignature) => {
    let numOfBeats = (0, exports.calculateTimeSignatureBeats)(timeSignature);
    let metre = (0, exports.findMetre)(timeSignature);
    let isBarIrregular = (0, exports.isIrregular)(timeSignature);
    if (isBarIrregular) {
        switch (timeSignature[1]) {
            case 2:
                return "minim";
            case 4:
                return "crotchet";
            case 8:
                return "quaver";
            case 16:
                return "semiquaver";
            default:
                return undefined;
        }
    }
    let beat;
    if (metre === "duple") {
        beat = numOfBeats / 2;
    }
    else if (metre === "triple") {
        beat = numOfBeats / 3;
    }
    else if (metre === "quadruple") {
        beat = numOfBeats / 4;
    }
    for (let value in rhythm_utils_1.values) {
        if (rhythm_utils_1.values[value] === beat) {
            return value;
        }
        else if (rhythm_utils_1.values[value] * 1.5 === beat) {
            return `dotted ${value}`;
        }
    }
    return undefined;
};
exports.findBeatValue = findBeatValue;
const createBar = (timeSignature, minValue = "breve", maxValue = "demisemiquaver", grade = 5) => {
    if ((0, exports.isCompound)(timeSignature) && timeSignature[1] === 2) {
        throw new Error("Compound time signatures with minim beats are not available!");
    }
    const wholeBarValue = (0, exports.findWholeBarValue)(timeSignature);
    const isBarCompound = (0, exports.isCompound)(timeSignature);
    const isBarIrregular = (0, exports.isIrregular)(timeSignature);
    if (isBarCompound) {
        const metre = (0, exports.findMetre)(timeSignature);
        if (metre === "triple") {
            let beat = (0, exports.findBeatValue)(timeSignature);
            return (0, rhythm_subdivision_1.subdivideCompoundTernaryNote)(beat, minValue, maxValue, grade);
        }
        return (0, rhythm_subdivision_1.subdivideCompoundNote)(wholeBarValue, metre, minValue, maxValue, grade);
    }
    else if (isBarIrregular) {
        let beat = (0, exports.findBeatValue)(timeSignature);
        return (0, rhythm_subdivision_1.subdivideIrregularNote)(beat, timeSignature[0], minValue, maxValue, grade);
    }
    return (0, rhythm_subdivision_1.subdivideNote)(wholeBarValue, minValue, maxValue, grade);
};
exports.createBar = createBar;
