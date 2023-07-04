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
    let numOfBeats = this.calculateTimeSignatureBeats(timeSignature[0], timeSignature[1]);

    for (let value in this.values) {
        if (this.values[value] === numOfBeats) {
            return value;
        } else if (this.values[value] * 1.5 === numOfBeats) {
            return `dotted ${value}`
        }
    }

    return undefined;
}

module.exports.findBeatValue = timeSignature => {
    let numOfBeats = this.calculateTimeSignatureBeats(timeSignature[0], timeSignature[1]);
    let metre = this.findMetre(timeSignature);

    let beat;

    if (metre === "duple") {
        beat = numOfBeats / 2;
    } else if (metre === "triple") {
        beat = numOfBeats / 3;
    } else if (metre === "quadruple") {
        beat = numOfBeats / 4;
    }

    for (let value in this.values) {
        if (this.values[value] === beat) {
            return value;
        } else if (this.values[value] * 1.5 === beat) {
            return `dotted ${value}`
        }
    }

    return undefined;
}