import { values, timeSignaturesTopValues, timeSignaturesBottomValues } from "./rhythm-utils";
import { subdivideCompoundTernaryNote, subdivideCompoundNote, subdivideNote, subdivideIrregularNote } from "./rhythm-subdivision";

import { NoteInterface } from "../../ts/interfaces/interfaces";
import { gradeType, metreType, timeSignatureType, valueType } from "../../ts/types/types";

export const findMetre = (timeSignature: timeSignatureType): metreType => {
    const top = timeSignature[0];

    if ([2, 6].includes(top)) {
        return "duple";
    } else if ([3, 9].includes(top)) {
        return "triple";
    } else if ([4, 12].includes(top)) {
        return "quadruple";
    }

    return "irregular";
}

export const isCompound = (timeSignature: timeSignatureType): boolean => {
    const top = timeSignature[0];

    return [6, 9, 12].includes(top);
}

export const isIrregular = (timeSignature: timeSignatureType): boolean => {
    const top = timeSignature[0];

    return [5, 7].includes(top);
}

export const calculateTimeSignatureBeats = (timeSignature: timeSignatureType): number => {
    let top = timeSignature[0];
    let bottom = timeSignature[1];

    return (top / bottom) * 4;
}

export const checkBarBeats = (bar: NoteInterface[], timeSignature: timeSignatureType = [4, 4]): boolean => {
    return calculateTimeSignatureBeats(timeSignature) === bar.reduce((a, b) => a + b.getBeats(), 0);
}

export const getRandomTimeSignature = (grade: gradeType): number[] => {
    let timeSignatures: number[][] = [
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
}

export const findWholeBarValue = (timeSignature: timeSignatureType): string | undefined => {
    let numOfBeats = calculateTimeSignatureBeats(timeSignature);

    for (let value in values) {
        if (values[value] === numOfBeats) {
            return value;
        } else if (values[value] * 1.5 === numOfBeats) {
            return `dotted ${value}`
        }
    }

    return undefined;
}

export const findBeatValue = (timeSignature: timeSignatureType): string => {
    let numOfBeats = calculateTimeSignatureBeats(timeSignature);
    let metre = findMetre(timeSignature);
    let isBarIrregular = isIrregular(timeSignature);

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
                throw new Error("Time signature bottom value can only be 2, 4, 8 or 16!");
        }
    }

    let beat;

    if (metre === "duple") {
        beat = numOfBeats / 2;
    } else if (metre === "triple") {
        beat = numOfBeats / 3;
    } else if (metre === "quadruple") {
        beat = numOfBeats / 4;
    }

    for (let value in values) {
        if (values[value] === beat) {
            return value;
        } else if (values[value] * 1.5 === beat) {
            return `dotted ${value}`
        }
    }

    throw new Error("Unexpected error occourred while finding beat value!");
}

export const createBar = (timeSignature: timeSignatureType, minValue: valueType = "breve", maxValue: valueType = "demisemiquaver", grade: gradeType = 5): string[] => {
    if (isCompound(timeSignature) && timeSignature[1] === 2) {
        throw new Error("Compound time signatures with minim beats are not available!");
    }

    const wholeBarValue = findWholeBarValue(timeSignature);
    const isBarCompound = isCompound(timeSignature);
    const isBarIrregular = isIrregular(timeSignature);

    if (isBarCompound) {
        const metre = findMetre(timeSignature);

        if (metre === "triple") {
            let beat = findBeatValue(timeSignature);

            return subdivideCompoundTernaryNote(beat, minValue, maxValue, grade);
        }

        if (typeof wholeBarValue === "string") {
            return subdivideCompoundNote(wholeBarValue, metre, minValue, maxValue, grade);
        }
    } else if (isBarIrregular) {
        let beat = findBeatValue(timeSignature);

        return subdivideIrregularNote(beat, timeSignature[0], minValue, maxValue, grade);
    }
    if (typeof wholeBarValue === "string") {
        return subdivideNote(wholeBarValue, minValue, maxValue, grade);
    }

    throw new Error("Unexpected error occourred while creating bar!");
}
