const { values, timeSignaturesTopValues, timeSignaturesBottomValues } = require("./rhythm-utils");
const { subdivideCompoundTernaryNote, subdivideCompoundNote, subdivideNote, subdivideIrregularNote } = require("./rhythm-subdivision");

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

module.exports.getRandomTimeSignature = grade => {
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
    let isIrregular = this.isIrregular(timeSignature);

    if (isIrregular) {
        switch (timeSignature[1]) {
            case 2:
                return "minim";
            case 4:
                return "crotchet";
            case 8:
                return "quaver";
            case 16:
                return "semiquaver";
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

    return undefined;
}

module.exports.createBar = (timeSignature, minValue = "breve", maxValue = "demisemiquaver", grade = 5) => {
    // Validating arguments
    if (!Object.keys(values).includes(minValue)) {
        throw new Error("Argument minValue is invalid!")
    }

    if (!Object.keys(values).includes(maxValue)) {
        throw new Error("Argument maxValue is invalid!");
    }

    if (
        !timeSignaturesTopValues.includes(timeSignature[0]) ||
        !timeSignaturesBottomValues.includes(timeSignature[1])
    ) {
        throw new Error("Time signature is invalid!");
    }

    if (this.isCompound(timeSignature) && timeSignature[1] === 2) {
        throw new Error("Compound time signatures with minim beats are not available!");
    }

    const wholeBarValue = this.findWholeBarValue(timeSignature);
    const isCompound = this.isCompound(timeSignature);
    const isIrregular = this.isIrregular(timeSignature);

    if (isCompound) {
        const metre = this.findMetre(timeSignature);

        if (metre === "triple") {
            let beat = this.findBeatValue(timeSignature);

            return subdivideCompoundTernaryNote(beat, minValue, maxValue, grade);
        }
        return subdivideCompoundNote(wholeBarValue, metre, minValue, maxValue, grade);
    } else if (isIrregular) {
        let beat = this.findBeatValue(timeSignature);

        return subdivideIrregularNote(beat, timeSignature[0], minValue, maxValue, grade);
    }
    return subdivideNote(wholeBarValue, minValue, maxValue, grade);
}
