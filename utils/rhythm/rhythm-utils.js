module.exports.values = {
    breve: 8,
    semibreve: 4,
    minim: 2,
    crotchet: 1,
    quaver: 0.5,
    semiquaver: 0.25,
    demisemiquaver: 0.125
}

module.exports.timeSignaturesTopValues = [2, 3, 4, 5, 6, 7, 9, 12];
module.exports.timeSignaturesBottomValues = [2, 4, 8, 16];

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

module.exports.getRandomTimeSignature = () => {
    let top = this.timeSignaturesTopValues[Math.floor(Math.random() * this.timeSignaturesTopValues.length)]
    let bottom = this.timeSignaturesBottomValues[Math.floor(Math.random() * this.timeSignaturesBottomValues.length)]

    return [top, bottom];
}

module.exports.calculateTimeSignatureBeats = (top, bottom) => {
    return (top / bottom) * 4;
}

module.exports.checkBarBeats = (bar, timeSignature = [4, 4]) => {
    return this.calculateTimeSignatureBeats(timeSignature[0], timeSignature[1]) === bar.reduce((a, b) => a + b.getBeats(), 0)
}

module.exports.findMaxBarValue = timeSignature => {
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

module.exports.createBar = (timeSignature = [4, 4], numOfBars = 1) => {
    const numOfBeats = this.calculateTimeSignatureBeats(timeSignature[0], timeSignature[1]);
    const maxBarValue = this.findMaxBarValue(timeSignature);
    const beatValue = this.findBeatValue(timeSignature);

    return;
}