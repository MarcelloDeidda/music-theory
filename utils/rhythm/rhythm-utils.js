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

module.exports.createBar = (timeSignature = [4, 4], numOfBars = 1) => {
    const numOfBeats = this.calculateTimeSignatureBeats(timeSignature[0], timeSignature[1]);
    const maxBarValue = this.findMaxBarValue(timeSignature);
    const beatValue = this.findBeatValue(timeSignature);

    return;
}

module.exports.RhythmicGroup = class {
    #notes;
    #groupValue;
    #groupName;

    constructor(notes, groupValue, groupName = null) {
        this.#notes = notes;
        this.#groupValue = groupValue;
        this.#groupName = groupName;
    }

    print() {
        console.log(`${this.#groupName}: ${this.#groupValue}`);
        this.#notes.map(note => {
            if (typeof note === "object") {
                note.print();
            } else {
                console.log(note);
            };
        });
    }
}

module.exports.subdivideNote = (note, maxValue = "demisemiquaver", grade = 5) => {
    if (grade < 3 && maxValue === "demisemiquaver") {
        maxValue = semiquaver;
    }

    const valueList = Object.keys(this.values);
    const currentValueIndex = valueList.indexOf(note);
    const maxValueIndex = valueList.indexOf(maxValue);

    if (note === maxValue) {
        return new this.RhythmicGroup([note], this.values[note]);
    }

    let random;

    if (note.split(" ")[0] === "dotted") {
        note = note.split(" ")[1];
        currentValueIndex = valueList.indexOf(note);

        random = Math.floor(Math.random() * 3);

        if (random === 0) {
            return new this.RhythmicGroup([
                this.subdivideNote(value, maxValue, grade),
                this.subdivideNote(valueList[currentValueIndex + 1], maxValue, grade)
            ], this.values[note]);
        } else if (random === 1) {
            return new this.RhythmicGroup([
                this.subdivideNote(valueList[currentValueIndex + 1], maxValue, grade),
                this.subdivideNote(value, maxValue, grade)
            ], this.values[note]);
        } else {
            return new this.RhythmicGroup([`dotted ${note}`], this.values[note] * 1.5);
        }
    }

    random = Math.floor(Math.random() * 22);

    if (random === 0 && maxValueIndex - currentValueIndex > 1) {
        return new this.RhythmicGroup([
            `dotted ${valueList[currentValueIndex + 1]}`,
            this.subdivideNote(valueList[currentValueIndex + 2], maxValue, grade)
        ], this.values[note]);
    } else if (random === 1 && maxValueIndex - currentValueIndex > 1) {
        return new this.RhythmicGroup([
            this.subdivideNote(valueList[currentValueIndex + 2], maxValue, grade),
            `dotted ${valueList[currentValueIndex + 1]}`
        ], this.values[note]);
    } else if (random === 2 && maxValueIndex - currentValueIndex > 1) {
        return new this.RhythmicGroup([
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 1],
            valueList[currentValueIndex + 2]
        ], this.values[note]);
    } else if (random === 3 && grade > 1) {
        return new this.RhythmicGroup([
            valueList[currentValueIndex + 1],
            valueList[currentValueIndex + 1],
            valueList[currentValueIndex + 1]
        ], this.values[note], "triplet");
    } else if (random === 4 && maxValueIndex - currentValueIndex > 1 && grade > 4) {
        return new this.RhythmicGroup([
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2]
        ], this.values[note], "quintuplet");
    } else if (random === 5 && maxValueIndex - currentValueIndex > 1 && grade > 4) {
        return new this.RhythmicGroup([
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2],
            valueList[currentValueIndex + 2]
        ], this.values[note], "sextuplet");
    } else if (random === 6 && maxValueIndex - currentValueIndex > 2 && grade > 3) {
        return new this.RhythmicGroup([
            `double dotted ${valueList[currentValueIndex + 1]}`,
            this.subdivideNote(valueList[currentValueIndex + 3], maxValue, grade)
        ], this.values[note]);
    } else if (random === 7 && maxValueIndex - currentValueIndex > 2 && grade > 3) {
        return new this.RhythmicGroup([
            this.subdivideNote(valueList[currentValueIndex + 3], maxValue, grade),
            `double dotted ${valueList[currentValueIndex + 1]}`
        ], this.values[note]);
    } else if (random > 7 && random < 17) {
        return new this.RhythmicGroup([
            this.subdivideNote(valueList[currentValueIndex + 1], maxValue, grade),
            this.subdivideNote(valueList[currentValueIndex + 1], maxValue, grade)
        ], this.values[note]);
    } else {
        return new this.RhythmicGroup([note], this.values[note]);
    }
}