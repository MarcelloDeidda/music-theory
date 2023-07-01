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

module.exports.getRandomTimeSignature = () => {
    let top = this.timeSignaturesTopValues[Math.floor(Math.random() * this.timeSignaturesTopValues.length)]
    let bottom = this.timeSignaturesBottomValues[Math.floor(Math.random() * this.timeSignaturesBottomValues.length)]

    return [top, bottom];
}

module.exports.calculateIimeSignatureBeats = (top, bottom) => {
    return (top / bottom) * 4;
}

module.exports.checkBarBeats = (bar, timeSignature = [4, 4]) => {
    return this.calculateIimeSignatureBeats(timeSignature[0], timeSignature[1]) === bar.reduce((a, b) => a + b.getBeats(), 0)
}

