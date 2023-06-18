module.exports.notes = ["C", "D", "E", "F", "G", "A", "B"];

module.exports.chromaticScale = [
    ["B#", "C", "DB"],
    ["Bx", "C#", "Db"],
    ["Cx", "D", "EB"],
    ["D#", "Eb", "FB"],
    ["Dx", "E", "Fb"],
    ["E#", "F", "GB"],
    ["Ex", "F#", "Gb"],
    ["Fx", "G", "AB"],
    ["G#", "Ab"],
    ["Gx", "A", "BB"],
    ["A#", "Bb", "CB"],
    ["Ax", "B", "Cb"]
]

module.exports.createScale = tonic => {
    let index = notes.indexOf(tonic.toUpperCase());
    const scale = notes.slice(index).concat(notes.slice(0, index + 1));

    return scale;
}

module.exports.printKeyboard = () => {
    let keyboard = []

    for (let i = 0; i <= 8; i++) {
        for (let note of this.notes) {
            if (i == 0 && this.notes.slice(0, this.notes.indexOf("A")).includes(note)) { continue }

            keyboard.push(`${note}${i}`)
            if (note == "C" && i == 8) { break }
        }
    }

    return keyboard;
}


const accidentalsIndexes = [3, 0, 4, 1, 5, 2, 6];