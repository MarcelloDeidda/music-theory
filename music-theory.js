// A note is defined as an object containing the lette name, octave number and accidental
// Example:
const note = {
    name: "A",
    octave: 0,
    alteration: "natural"
}

// This array contains notes
const notes = ["C", "D", "E", "F", "G", "A", "B"];

// This array contains accidentals (left to right for sharps, right to left for flats)
const accidentals = ["F", "C", "G", "D", "A", "E", "B"];

// This function takes a tonic as an argument and returns an array with the notes of the scale
function createScale(tonic) {
    let index = notes.indexOf(tonic.toUpperCase());
    const scale = notes.slice(index).concat(notes.slice(0, index + 1));

    return scale;
}

function printKeyboard() {
    let keyboard = []

    for (let i = 0; i <= 8; i++) {
        for (let note of notes) {
            if (i == 0 && notes.slice(0, notes.indexOf("A")).includes(note)) { continue }

            keyboard.push(`${note}${i}`)
            if (note == "C" && i == 8) { break }
        }
    }

    return keyboard;
}

const a0 = {
    name: "A",
    octave: 1,
    alteration: "natural"
}

const b1 = {
    name: "D",
    octave: 1,
    alteration: "natural"
}

function calculateInterval(firstNote, secondNote) {
    /*let firstIndex = notes.indexOf(firstNote.name);
    let secondIndex = notes.indexOf(secondNote.name);

    let indexDifference = secondIndex - firstIndex;
    let octaveDifference = secondNote.octave - firstNote.octave - 1;

    if (indexDifference >= 0) {
        return (indexDifference + 1) + (octaveDifference * 7);
    } else {
        return (8 + indexDifference) + (octaveDifference * 7);
    }*/
    const keyboard = printKeyboard();

    let indexDifference = keyboard.indexOf(`${secondNote.name}${secondNote.octave}`) - keyboard.indexOf(`${firstNote.name}${firstNote.octave}`)
    
    if (indexDifference >= 0) {
        return indexDifference + 1;
    } else {
        return 1 - indexDifference;
    }
}

console.log(printKeyboard())
console.log(calculateInterval(a0, b1))