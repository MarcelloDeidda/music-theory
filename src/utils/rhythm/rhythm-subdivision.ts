import { values, valueList } from "./rhythm-utils";

import { gradeType, metreType, valueType } from "../../ts/types/types";

export const subdivideIntoTernary = (
    note: string,
    minValue: valueType,
    maxValue: valueType,
    grade: gradeType
): string[] => {
    const noteIndex = valueList.indexOf(note.split(" ")[1]);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }

    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
        return [
            ...subdivideNote(valueList[noteIndex + 1], minValue, maxValue, grade),
            ...subdivideNote(valueList[noteIndex], minValue, maxValue, grade)
        ];
    } else {
        return [
            ...subdivideNote(valueList[noteIndex], minValue, maxValue, grade),
            ...subdivideNote(valueList[noteIndex + 1], minValue, maxValue, grade)
        ];
    }
}

export const subdivideIntoDotted = (
    note: string,
    minValue: valueType,
    maxValue: valueType,
    grade: gradeType
): string[] => {

    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }

    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
        return [
            `dotted ${valueList[noteIndex + 1]}`,
            ...subdivideNote(valueList[noteIndex + 2], minValue, maxValue, grade)
        ];
    } else {
        return [
            ...subdivideNote(valueList[noteIndex + 2], minValue, maxValue, grade),
            `dotted ${valueList[noteIndex + 1]}`
        ];
    }
}

export const subdivideIntoDoubleDotted = (
    note: string,
    minValue: valueType,
    maxValue: valueType,
    grade: gradeType
): string[] => {

    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 3) {
        throw new Error("Cannot subdivide further");
    }

    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
        return [
            `double-dotted ${valueList[noteIndex + 1]}`,
            ...subdivideNote(valueList[noteIndex + 3], minValue, maxValue, grade)
        ];
    } else {
        return [
            ...subdivideNote(valueList[noteIndex + 3], minValue, maxValue, grade),
            `double-dotted ${valueList[noteIndex + 1]}`
        ];
    }
}

export const subdivideIntoSincopation = (
    note: string,
    minValue: valueType,
    maxValue: valueType,
    grade: gradeType
): string[] => {

    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }

    return [
        ...subdivideNote(valueList[noteIndex + 2], minValue, maxValue, grade),
        valueList[noteIndex + 1],
        ...subdivideNote(valueList[noteIndex + 2], minValue, maxValue, grade)
    ];
}

export const subdivideIntoCompoundSincopation = (
    note: string,
    minValue: valueType,
    maxValue: valueType,
    grade: gradeType
): string[] => {

    const noteIndex = valueList.indexOf(note.split(" ")[1]);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }

    return [
        ...subdivideNote(`dotted ${valueList[noteIndex + 2]}`, minValue, maxValue, grade),
        `dotted ${valueList[noteIndex + 1]}`,
        ...subdivideNote(`dotted ${valueList[noteIndex + 2]}`, minValue, maxValue, grade)
    ];
}

export const subdivideIntoTriplet = (
    note: string,
    grade: gradeType
): string[] => {

    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 5) {
        throw new Error("Cannot subdivide further");
    } else if (grade < 2) {
        throw new Error("Triplets are not available before Grade Two");
    }

    return new Array(3).fill(`triplet ${valueList[noteIndex + 1]}`);
}

export const subdivideIntoQuintuplet = (
    note: string,
    grade: gradeType
): string[] => {

    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    } else if (grade < 5) {
        throw new Error("Quintuplets are not available before Grade Five");
    }

    return new Array(5).fill(`quintuplet ${valueList[noteIndex + 2]}`);
}

export const subdivideIntoSextuplet = (
    note: string,
    grade: gradeType
): string[] => {

    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    } else if (grade < 5) {
        throw new Error("Sextuplets are not available before Grade Five");
    }

    return new Array(6).fill(`sextuplet ${valueList[noteIndex + 2]}`);
}

export const subdivideNote = (
    note: string,
    minValue: valueType = "breve",
    maxValue: valueType = "demisemiquaver",
    grade: gradeType = 5
): string[] => {
    // Demisemiquaver are not available before Grade Three
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = "semiquaver";
    }

    // If maxValue is reached, the function returns it
    if (note === maxValue) {
        return [note];
    }


    let currentValueIndex = valueList.indexOf(note);
    let minValueIndex = valueList.indexOf(minValue);
    let maxValueIndex = valueList.indexOf(maxValue);

    let random;

    // Handle Dotted Notes
    if (note.split(" ")[0] === "dotted") {
        currentValueIndex = valueList.indexOf(note.split(" ")[1]);

        if (note.split(" ")[0] === maxValue) {
            return [note];
        }

        random = Math.floor(Math.random() * 3);

        if (random === 0 && currentValueIndex - minValueIndex >= 0) {
            return [note];
        } else {
            return subdivideIntoTernary(note, minValue, maxValue, grade);
        }
    }

    random = Math.floor(Math.random() * 20);

    // Handle normal subdivision
    if (random === 0 && maxValueIndex - currentValueIndex > 1 && currentValueIndex - minValueIndex >= -1) {
        // Dotted Pattern
        return subdivideIntoDotted(note, minValue, maxValue, grade);
    } else if (random === 1 && maxValueIndex - currentValueIndex > 2 && currentValueIndex - minValueIndex >= -1 && grade > 3) {
        // Double-dotted Pattern
        return subdivideIntoDoubleDotted(note, minValue, maxValue, grade);
    } else if (random === 2 && maxValueIndex - currentValueIndex > 1 && currentValueIndex - minValueIndex >= -1) {
        // Sincopation Pattern
        return subdivideIntoSincopation(note, minValue, maxValue, grade);
    } else if (random === 3 && grade > 1 && currentValueIndex - minValueIndex >= -1) {
        // Triplet Pattern
        return subdivideIntoTriplet(note, grade);
    } else if (random === 4 && maxValueIndex - currentValueIndex > 1 && grade > 4 && currentValueIndex - minValueIndex >= -2) {
        // Quintuplet Pattern
        return subdivideIntoQuintuplet(note, grade);
    } else if (random === 5 && maxValueIndex - currentValueIndex > 1 && grade > 4 && currentValueIndex - minValueIndex >= -2) {
        // Sextuplet Pattern
        return subdivideIntoSextuplet(note, grade);
    } else if (random > 5 && random < 12 && currentValueIndex - minValueIndex >= 0) {
        // Single note
        return [note];
    } else {
        // Further Subdivision
        return [
            ...subdivideNote(valueList[currentValueIndex + 1], minValue, maxValue, grade),
            ...subdivideNote(valueList[currentValueIndex + 1], minValue, maxValue, grade)
        ];
    }
}

export const subdivideCompoundNote = (
    note: string,
    metre: metreType,
    minValue: valueType = "breve",
    maxValue: valueType = "demisemiquaver",
    grade: gradeType = 5
): string[] => {
    // Demisemiquaver are not available before Grade Three
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = "semiquaver";
    }

    // If maxValue is reached, the function returns it 
    if (note.split(" ")[1] === maxValue) {
        return [note];
    }

    let currentValueIndex = valueList.indexOf(note.split(" ")[1]);
    let minValueIndex = valueList.indexOf(minValue);
    let maxValueIndex = valueList.indexOf(maxValue);

    let random: number;

    switch (metre) {
        case "duple":
            random = Math.floor(Math.random() * 3);

            if (random === 0 && currentValueIndex - minValueIndex >= 0) {
                return [note];
            } else {
                return [
                    ...subdivideNote(`dotted ${valueList[currentValueIndex + 1]}`, minValue, maxValue, grade),
                    ...subdivideNote(`dotted ${valueList[currentValueIndex + 1]}`, minValue, maxValue, grade)
                ]
            }

        case "quadruple":
            random = Math.floor(Math.random() * 3);

            if (random === 0 && currentValueIndex - minValueIndex >= 0) {
                return [note];
            } else if (random === 1 && maxValueIndex - currentValueIndex > 1) {
                return subdivideIntoCompoundSincopation(note, minValue, maxValue, grade);
            } else {
                return [
                    ...subdivideCompoundNote(`dotted ${valueList[currentValueIndex + 1]}`, "duple", minValue, maxValue, grade),
                    ...subdivideCompoundNote(`dotted ${valueList[currentValueIndex + 1]}`, "duple", minValue, maxValue, grade)
                ]
            }

        default:
            throw new Error("Unexpected error in subdividing compound note: metre is not valid!");
    }
}

export const subdivideCompoundTernaryNote = (
    beatNote: string,
    minValue: valueType = "breve",
    maxValue: valueType = "demisemiquaver",
    grade: gradeType = 5
): string[] => {
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = "semiquaver";
    }

    let currentValueIndex = valueList.indexOf(beatNote.split(" ")[1]);

    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
        return [
            ...subdivideNote(beatNote, minValue, maxValue, grade),
            ...subdivideCompoundNote(`dotted ${valueList[currentValueIndex - 1]}`, "duple", minValue, maxValue, grade)
        ];
    } else {
        return [
            ...subdivideCompoundNote(`dotted ${valueList[currentValueIndex - 1]}`, "duple", minValue, maxValue, grade),
            ...subdivideNote(beatNote, minValue, maxValue, grade)
        ];
    }
}

export const subdivideIrregularNote = (
    beatNote: string,
    beatNum: number,
    minValue: valueType = "breve",
    maxValue: valueType = "demisemiquaver",
    grade: gradeType = 5
) => {
    // Demisemiquaver are not available before Grade Three
    if (grade < 5) {
        throw new Error("Irregular time signatures are not available before Grade Five");
    }

    let currentValueIndex = valueList.indexOf(beatNote);

    let random: number;

    switch (beatNum) {
        case 5:
            random = Math.floor(Math.random() * 2);
            if (random === 0) {
                return [
                    ...subdivideNote(`dotted ${valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                    ...subdivideNote(valueList[currentValueIndex - 1], minValue, maxValue, grade)
                ]
            } else {
                return [
                    ...subdivideNote(valueList[currentValueIndex - 1], minValue, maxValue, grade),
                    ...subdivideNote(`dotted ${valueList[currentValueIndex - 1]}`, minValue, maxValue, grade)
                ]
            }

        case 7:
            random = Math.floor(Math.random() * 3);

            if (random === 0) {
                return [
                    ...subdivideNote(`dotted ${valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                    ...subdivideNote(valueList[currentValueIndex - 2], minValue, maxValue, grade)
                ]
            } else if (random === 1) {
                return [
                    ...subdivideNote(valueList[currentValueIndex - 1], minValue, maxValue, grade),
                    ...subdivideNote(`dotted ${valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                    ...subdivideNote(valueList[currentValueIndex - 1], minValue, maxValue, grade)
                ]
            } else {
                return [
                    ...subdivideNote(valueList[currentValueIndex - 2], minValue, maxValue, grade),
                    ...subdivideNote(`dotted ${valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                ]
            }
        default:
            throw new Error("Irregular time signatures should have 5 or 7 beats");
    }
}