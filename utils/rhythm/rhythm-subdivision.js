const { values } = require("./rhythm-utils");

module.exports.subdivideIntoTernary = (note, minValue, maxValue, grade) => {
    const valueList = Object.keys(values);
    const noteIndex = valueList.indexOf(note.split(" ")[1]);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }

    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
        return [
            ...this.subdivideNote(valueList[noteIndex + 1], minValue, maxValue, grade),
            ...this.subdivideNote(valueList[noteIndex], minValue, maxValue, grade)
        ];
    } else {
        return [
            ...this.subdivideNote(valueList[noteIndex], minValue, maxValue, grade),
            ...this.subdivideNote(valueList[noteIndex + 1], minValue, maxValue, grade)
        ];
    }
}

module.exports.subdivideIntoDotted = (note, minValue, maxValue, grade) => {
    const valueList = Object.keys(values);
    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }

    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
        return [
            `dotted ${valueList[noteIndex + 1]}`,
            ...this.subdivideNote(valueList[noteIndex + 2], minValue, maxValue, grade)
        ];
    } else {
        return [
            ...this.subdivideNote(valueList[noteIndex + 2], minValue, maxValue, grade),
            `dotted ${valueList[noteIndex + 1]}`
        ];
    }
}

module.exports.subdivideIntoDoubleDotted = (note, minValue, maxValue, grade) => {
    const valueList = Object.keys(values);
    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 3) {
        throw new Error("Cannot subdivide further");
    }

    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
        return [
            `double-dotted ${valueList[noteIndex + 1]}`,
            ...this.subdivideNote(valueList[noteIndex + 3], minValue, maxValue, grade)
        ];
    } else {
        return [
            ...this.subdivideNote(valueList[noteIndex + 3], minValue, maxValue, grade),
            `double-dotted ${valueList[noteIndex + 1]}`
        ];
    }
}

module.exports.subdivideIntoSincopation = (note, minValue, maxValue, grade) => {
    const valueList = Object.keys(values);
    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }

    return [
        ...this.subdivideNote(valueList[noteIndex + 2], minValue, maxValue, grade),
        valueList[noteIndex + 1],
        ...this.subdivideNote(valueList[noteIndex + 2], minValue, maxValue, grade)
    ];
}

module.exports.subdivideIntoCompoundSincopation = (note, minValue, maxValue, grade) => {
    const valueList = Object.keys(values);
    const noteIndex = valueList.indexOf(note.split(" ")[1]);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    }

    return [
        ...this.subdivideNote(`dotted ${valueList[noteIndex + 2]}`, minValue, maxValue, grade),
        `dotted ${valueList[noteIndex + 1]}`,
        ...this.subdivideNote(`dotted ${valueList[noteIndex + 2]}`, minValue, maxValue, grade)
    ];
}

module.exports.subdivideIntoTriplet = (note, grade) => {
    const valueList = Object.keys(values);
    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 5) {
        throw new Error("Cannot subdivide further");
    } else if (grade < 2) {
        throw new Error("Triplets are not available before Grade Two");
    }

    return new Array(3).fill(`triplet ${valueList[noteIndex + 1]}`);
}

module.exports.subdivideIntoQuintuplet = (note, grade) => {
    const valueList = Object.keys(values);
    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    } else if (grade < 5) {
        throw new Error("Quintuplets are not available before Grade Five");
    }

    return new Array(5).fill(`quintuplet ${valueList[noteIndex + 2]}`);
}

module.exports.subdivideIntoSextuplet = (note, grade) => {
    const valueList = Object.keys(values);
    const noteIndex = valueList.indexOf(note);

    if (noteIndex > 4) {
        throw new Error("Cannot subdivide further");
    } else if (grade < 5) {
        throw new Error("Sextuplets are not available before Grade Five");
    }

    return new Array(6).fill(`sextuplet ${valueList[noteIndex + 2]}`);
}

module.exports.subdivideNote = (note, minValue = "breve", maxValue = "demisemiquaver", grade = 5) => {
    // Demisemiquaver are not available before Grade Three
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = semiquaver;
    }

    // If maxValue is reached, the function returns it
    if (note === maxValue) {
        return [note];
    }

    const valueList = Object.keys(values);
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
            return this.subdivideIntoTernary(note, minValue, maxValue, grade);
        }
    }

    random = Math.floor(Math.random() * 20);

    // Handle normal subdivision
    if (random === 0 && maxValueIndex - currentValueIndex > 1 && currentValueIndex - minValueIndex >= -1) {
        // Dotted Pattern
        return this.subdivideIntoDotted(note, minValue, maxValue, grade);
    } else if (random === 1 && maxValueIndex - currentValueIndex > 2 && currentValueIndex - minValueIndex >= -1 && grade > 3) {
        // Double-dotted Pattern
        return this.subdivideIntoDoubleDotted(note, minValue, maxValue, grade);
    } else if (random === 2 && maxValueIndex - currentValueIndex > 1 && currentValueIndex - minValueIndex >= -1) {
        // Sincopation Pattern
        return this.subdivideIntoSincopation(note, minValue, maxValue, grade);
    } else if (random === 3 && grade > 1 && currentValueIndex - minValueIndex >= -1) {
        // Triplet Pattern
        return this.subdivideIntoTriplet(note, grade);
    } else if (random === 4 && maxValueIndex - currentValueIndex > 1 && grade > 4 && currentValueIndex - minValueIndex >= -2) {
        // Quintuplet Pattern
        return this.subdivideIntoQuintuplet(note, grade);
    } else if (random === 5 && maxValueIndex - currentValueIndex > 1 && grade > 4 && currentValueIndex - minValueIndex >= -2) {
        // Sextuplet Pattern
        return this.subdivideIntoSextuplet(note, grade);
    } else if (random > 5 && random < 12 && currentValueIndex - minValueIndex >= 0) {
        // Single note
        return [note];
    } else {
        // Further Subdivision
        return [
            ...this.subdivideNote(valueList[currentValueIndex + 1], minValue, maxValue, grade),
            ...this.subdivideNote(valueList[currentValueIndex + 1], minValue, maxValue, grade)
        ];
    }
}

module.exports.subdivideCompoundNote = (note, metre, minValue = "breve", maxValue = "demisemiquaver", grade = 5) => {
    // Demisemiquaver are not available before Grade Three
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = semiquaver;
    }

    const valueList = Object.keys(values);

    // If maxValue is reached, the function returns it 
    if (note.split(" ")[1] === maxValue) {
        return [note];
    }

    let currentValueIndex = valueList.indexOf(note.split(" ")[1]);
    let minValueIndex = valueList.indexOf(minValue);
    let maxValueIndex = valueList.indexOf(maxValue);

    let random;

    switch (metre) {
        case "duple":
            random = Math.floor(Math.random() * 3);

            if (random === 0 && currentValueIndex - minValueIndex >= 0) {
                return [note];
            } else {
                return [
                    ...this.subdivideNote(`dotted ${valueList[currentValueIndex + 1]}`, minValue, maxValue, grade),
                    ...this.subdivideNote(`dotted ${valueList[currentValueIndex + 1]}`, minValue, maxValue, grade)
                ]
            }

        case "quadruple":
            random = Math.floor(Math.random() * 3);

            if (random === 0 && currentValueIndex - minValueIndex >= 0) {
                return [note];
            } else if (random === 1 && maxValueIndex - currentValueIndex > 1) {
                return this.subdivideIntoCompoundSincopation(note, minValue, maxValue, grade);
            } else {
                return [
                    ...this.subdivideCompoundNote(`dotted ${valueList[currentValueIndex + 1]}`, "duple", minValue, maxValue, grade),
                    ...this.subdivideCompoundNote(`dotted ${valueList[currentValueIndex + 1]}`, "duple", minValue, maxValue, grade)
                ]
            }
    }
}

module.exports.subdivideCompoundTernaryNote = (beatNote, minValue, maxValue, grade) => {
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = semiquaver;
    }

    const valueList = Object.keys(values);

    let currentValueIndex = valueList.indexOf(beatNote.split(" ")[1]);

    let random = Math.floor(Math.random() * 2);

    if (random === 0) {
        return [
            ...this.subdivideNote(beatNote, minValue, maxValue, grade),
            ...this.subdivideCompoundNote(`dotted ${valueList[currentValueIndex - 1]}`, "duple", minValue, maxValue, grade)
        ];
    } else {
        return [
            ...this.subdivideCompoundNote(`dotted ${valueList[currentValueIndex - 1]}`, "duple", minValue, maxValue, grade),
            ...this.subdivideNote(beatNote, minValue, maxValue, grade)
        ];
    }
}

module.exports.subdivideIrregularNote = (beatNote, beatNum, minValue = "breve", maxValue = "demisemiquaver", grade = 5) => {
    // Demisemiquaver are not available before Grade Three
    if (grade < 5) {
        throw new Error("Irregular time signatures are not available before Grade Five");
    }

    const valueList = Object.keys(values);

    let currentValueIndex = valueList.indexOf(beatNote);

    let random;

    switch (beatNum) {
        case 5:
            random = Math.floor(Math.random() * 2);
            if (random === 0) {
                return [
                    ...this.subdivideNote(`dotted ${valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                    ...this.subdivideNote(valueList[currentValueIndex - 1], minValue, maxValue, grade)
                ]
            } else {
                return [
                    ...this.subdivideNote(valueList[currentValueIndex - 1], minValue, maxValue, grade),
                    ...this.subdivideNote(`dotted ${valueList[currentValueIndex - 1]}`, minValue, maxValue, grade)
                ]
            }

        case 7:
            random = Math.floor(Math.random() * 3);

            if (random === 0) {
                return [
                    ...this.subdivideNote(`dotted ${valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                    ...this.subdivideNote(valueList[currentValueIndex - 2], minValue, maxValue, grade)
                ]
            } else if (random === 1) {
                return [
                    ...this.subdivideNote(valueList[currentValueIndex - 1], minValue, maxValue, grade),
                    ...this.subdivideNote(`dotted ${valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                    ...this.subdivideNote(valueList[currentValueIndex - 1], minValue, maxValue, grade)
                ]
            } else {
                return [
                    ...this.subdivideNote(valueList[currentValueIndex - 2], minValue, maxValue, grade),
                    ...this.subdivideNote(`dotted ${valueList[currentValueIndex - 1]}`, minValue, maxValue, grade),
                ]
            }
        default:
            throw new Error("Irregular time signatures should have 5 or 7 beats");
    }
}