const { values } = require("./rhythm-utils");

const RhythmicGroup = require("./rhythm-group");

module.exports.findMetre = timeSignature => {
    const top = timeSignature[0];

    if ([2, 6].includes(top)) {
        return "duple";
    } else if ([3, 9].includes(top)) {
        return "triple";
    } else if ([4, 12].includes(top)) {
        return "quadruple";
    }

    return undefined;
}

module.exports.isCompound = timeSignature => {
    const top = timeSignature[0];

    return [6, 9, 12].includes(top);
}

module.exports.isIrregular = timeSignature => {
    const top = timeSignature[0];

    return [5, 7].includes(top);
}

module.exports.calculateTimeSignatureBeats = timeSignature => {
    let top = timeSignature[0];
    let bottom = timeSignature[1];

    return (top / bottom) * 4;
}

module.exports.checkBarBeats = (bar, timeSignature = [4, 4]) => {
    return this.calculateTimeSignatureBeats(timeSignature[0], timeSignature[1]) === bar.reduce((a, b) => a + b.getBeats(), 0)
}

module.exports.getRandomTimeSignature = () => {
    let top = this.timeSignaturesTopValues[Math.floor(Math.random() * this.timeSignaturesTopValues.length)]
    let bottom = this.timeSignaturesBottomValues[Math.floor(Math.random() * this.timeSignaturesBottomValues.length)]

    return [top, bottom];
}

module.exports.findWholeBarValue = timeSignature => {
    let numOfBeats = this.calculateTimeSignatureBeats(timeSignature);

    for (let value in values) {
        if (values[value] === numOfBeats) {
            return value;
        } else if (values[value] * 1.5 === numOfBeats) {
            return `dotted ${value}`
        }
    }

    return undefined;
}

module.exports.findBeatValue = timeSignature => {
    let numOfBeats = this.calculateTimeSignatureBeats(timeSignature);
    let metre = this.findMetre(timeSignature);

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

    return undefined;
}

module.exports.subdivideNote = (note, minValue = "breve", maxValue = "demisemiquaver", grade = 5) => {
    // Demisemiquaver are not available before Grade Three
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = semiquaver;
    }

    // If maxValue is reached, the function returns it
    if (note === maxValue) {
        return new RhythmicGroup([note], values[note]);
    }

    const valueList = Object.keys(values);
    let currentValueIndex = valueList.indexOf(note);
    let minValueIndex = valueList.indexOf(minValue);
    let maxValueIndex = valueList.indexOf(maxValue);

    let random;

    // Handle Dotted Notes
    if (note.split(" ")[0] === "dotted") {
        note = note.split(" ")[1];
        currentValueIndex = valueList.indexOf(note);

        if (note === maxValue) {
            return new RhythmicGroup(`dotted ${[note]}`, values[note] * 1.5);
        }

        random = Math.floor(Math.random() * 3);

        if (random === 0) {
            return new RhythmicGroup([
                this.subdivideNote(note, minValue, maxValue, grade),
                this.subdivideNote(valueList[currentValueIndex + 1], minValue, maxValue, grade)
            ], values[note] * 1.5);
        } else if (random === 1 && currentValueIndex - minValueIndex >= 0) {
            return new RhythmicGroup([`dotted ${note}`], values[note] * 1.5);
        } else {
            return new RhythmicGroup([
                this.subdivideNote(valueList[currentValueIndex + 1], minValue, maxValue, grade),
                this.subdivideNote(note, minValue, maxValue, grade)
            ], values[note] * 1.5);
        }
    }

    random = Math.floor(Math.random() * 24);

    // Handle normal subdivision
    if (random === 0 && maxValueIndex - currentValueIndex > 1 && currentValueIndex - minValueIndex >= -1) {
        return new RhythmicGroup([
            `dotted ${valueList[currentValueIndex + 1]}`,
            this.subdivideNote(valueList[currentValueIndex + 2], minValue, maxValue, grade)
        ], values[note]);
    } else if (random === 1 && maxValueIndex - currentValueIndex > 1 && currentValueIndex - minValueIndex >= -1) {
        return new RhythmicGroup([
            this.subdivideNote(valueList[currentValueIndex + 2], minValue, maxValue, grade),
            `dotted ${valueList[currentValueIndex + 1]}`
        ], values[note]);
    } else if (random === 2 && maxValueIndex - currentValueIndex > 1 && currentValueIndex - minValueIndex >= -1) {
        return new RhythmicGroup([
            this.subdivideNote(valueList[currentValueIndex + 2], minValue, maxValue, grade),
            valueList[currentValueIndex + 1],
            this.subdivideNote(valueList[currentValueIndex + 2], minValue, maxValue, grade)
        ], values[note]);
    } else if (random === 3 && grade > 1 && currentValueIndex - minValueIndex >= -1) {
        return new RhythmicGroup([
            valueList[currentValueIndex + 1],
            valueList[currentValueIndex + 1],
            valueList[currentValueIndex + 1]
        ], values[note], "triplet");
    } else if (random === 4 && maxValueIndex - currentValueIndex > 1 && grade > 4 && currentValueIndex - minValueIndex >= -2) {
        return new RhythmicGroup([
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2]
        ], values[note], "quintuplet");
    } else if (random === 5 && maxValueIndex - currentValueIndex > 1 && grade > 4 && currentValueIndex - minValueIndex >= -2) {
        return new RhythmicGroup([
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2]
        ], values[note], "sextuplet");
    } else if (random === 6 && maxValueIndex - currentValueIndex > 2 && currentValueIndex - minValueIndex >= -1 && grade > 3) {
        return new RhythmicGroup([
            `double dotted ${valueList[currentValueIndex + 1]}`,
            this.subdivideNote(valueList[currentValueIndex + 3], minValue, maxValue, grade)
        ], values[note]);
    } else if (random === 7 && maxValueIndex - currentValueIndex > 2 && currentValueIndex - minValueIndex >= -1 && grade > 3) {
        return new RhythmicGroup([
            this.subdivideNote(valueList[currentValueIndex + 3], minValue, maxValue, grade),
            `double dotted ${valueList[currentValueIndex + 1]}`
        ], values[note]);
    } else if (random > 7 && random < 15 && currentValueIndex - minValueIndex >= 0) {
        return new RhythmicGroup([note], values[note]);
    } else {
        return new RhythmicGroup([
            this.subdivideNote(valueList[currentValueIndex + 1], minValue, maxValue, grade),
            this.subdivideNote(valueList[currentValueIndex + 1], minValue, maxValue, grade)
        ], values[note]);
    }
}

module.exports.subdivideCompoundNote = (note, metre, minValue = "breve", maxValue = "demisemiquaver", grade = 5) => {
    // Demisemiquaver are not available before Grade Three
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = semiquaver;
    }

    const valueList = Object.keys(values);

    note = note.split(" ")[1];

    // If maxValue is reached, the function returns it 
    if (note === maxValue) {
        return new RhythmicGroup(`dotted ${[note]}`, values[note] * 1.5);
    }

    let currentValueIndex = valueList.indexOf(note);
    let minValueIndex = valueList.indexOf(minValue);
    let maxValueIndex = valueList.indexOf(maxValue);

    let random;

    switch (metre) {
        case "duple":
            random = Math.floor(Math.random() * 3);

            if (random === 0 && currentValueIndex - minValueIndex >= 0) {
                return new RhythmicGroup([`dotted ${note}`], values[note] * 1.5);
            } else {
                return new RhythmicGroup([
                    this.subdivideNote(`dotted ${valueList[currentValueIndex + 1]}`, minValue, maxValue, grade),
                    this.subdivideNote(`dotted ${valueList[currentValueIndex + 1]}`, minValue, maxValue, grade)
                ], values[note] * 1.5);
            }

        case "quadruple":
            random = Math.floor(Math.random() * 3);

            if (random === 0 && currentValueIndex - minValueIndex >= 0) {
                return new RhythmicGroup([`dotted ${note}`], values[note] * 1.5);
            } else if (random === 1 && maxValueIndex - currentValueIndex > 1) {
                return new RhythmicGroup([
                    this.subdivideNote(`dotted ${valueList[currentValueIndex + 2]}`, minValue, maxValue, grade),
                    `dotted ${valueList[currentValueIndex + 1]}`,
                    this.subdivideNote(`dotted ${valueList[currentValueIndex + 2]}`, minValue, maxValue, grade)
                ], values[note] * 1.5);
            } else {
                return new RhythmicGroup([
                    this.subdivideCompoundNote(`dotted ${valueList[currentValueIndex + 1]}`, "duple", minValue, maxValue, grade),
                    this.subdivideCompoundNote(`dotted ${valueList[currentValueIndex + 1]}`, "duple", minValue, maxValue, grade)
                ], values[note] * 1.5);
            }
    }
}

module.exports.createBar = (timeSignature, minValue, maxValue, grade) => {
    const wholeBarValue = this.findWholeBarValue(timeSignature);
    const isCompound = this.isCompound(timeSignature);

    if (isCompound) {
        const metre = this.findMetre(timeSignature);
        let note = this.findBeatValue(timeSignature);

        if (metre === "triple") {
            const valueList = Object.keys(values);
            note = note.split(" ")[1];

            let currentValueIndex = valueList.indexOf(note);
            // IMPLEMENT MIN AND MAX
            let minValueIndex = valueList.indexOf(minValue);
            let maxValueIndex = valueList.indexOf(maxValue);

            let random = Math.floor(Math.random() * 2);
        
                if (random === 0) {
                    return new RhythmicGroup([
                        this.subdivideNote(`dotted ${note}`, minValue, maxValue, grade),
                        this.subdivideCompoundNote(`dotted ${valueList[currentValueIndex - 1]}`, "duple", minValue, maxValue, grade)
                    ], values[note] * 1.5);
                } else {
                    return new RhythmicGroup([
                        this.subdivideCompoundNote(`dotted ${valueList[currentValueIndex - 1]}`, "duple", minValue, maxValue, grade),
                        this.subdivideNote(`dotted ${note}`, minValue, maxValue, grade)
                    ], values[note] * 1.5);
                }
            }
        return this.subdivideCompoundNote(wholeBarValue, metre, minValue, maxValue, grade);
    }
    return this.subdivideNote(wholeBarValue, minValue, maxValue, grade);
}
