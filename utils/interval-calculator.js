const { notes, chromaticScale, printKeyboard } = require("./scales");

const augmented = "augmented";
const diminished = "diminished";
const perfect = "perfect";
const minor = "minor";
const major = "major";

function calculateDistance(firstNote, secondNote) {
    const keyboard = printKeyboard();

    let indexDifference = keyboard.indexOf(`${secondNote.name}${secondNote.octave}`) - keyboard.indexOf(`${firstNote.name}${firstNote.octave}`)

    return Math.abs(indexDifference) + 1;
}

function calculateSemitones(firstNote, secondNote) {
    let firstNoteIndex = chromaticScale.findIndex(notes => notes.includes(firstNote.note));
    let secondNoteIndex = chromaticScale.findIndex(notes => notes.includes(secondNote.note));

    let semitoneInterval = secondNoteIndex - firstNoteIndex;

    if (semitoneInterval >= 0) {
        return semitoneInterval;
    } else {
        return 12 + semitoneInterval;
    }
}

function sortNotes(...noteList) {
    const newNoteList = noteList.slice();
    newNoteList.sort((a, b) => {
        // Compare octaves
        if (a.octave > b.octave) {
            return 1
        } else if (b.octave > a.octave) {
            return -1
        } else {
            // Compare names
            if (notes.indexOf(a.name) > notes.indexOf(b.name)) {
                return 1;
            } else if (notes.indexOf(a.name) < notes.indexOf(b.name)) {
                return -1;
            } else {
                // Compare alterations
                if (a.alterationInSemitones > b.alterationInSemitones) {
                    return 1;
                } else if (a.alterationInSemitones < b.alterationInSemitones) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    });

    return newNoteList;
}

module.exports.calculateInterval = (firstNote, secondNote) => {
    // Calculate simple and compound interval
    let distance = calculateDistance(firstNote, secondNote);
    let simpleDistance = distance;

    while (simpleDistance > 8) {
        simpleDistance = simpleDistance % 7;
    }

    // Calculate semitones
    const notesAscending = sortNotes(firstNote, secondNote);
    let semitones = calculateSemitones(...notesAscending);

    const interval = {
        distance,
        semitones,
        unclassified: false,
        compound: (distance === simpleDistance) ? false : true,
        name: null
    }

    switch (simpleDistance) {
        case 1:
            interval.number = "unison";
            break;
        case 2:
            interval.number = "second";
            break;
        case 3:
            interval.number = "third";
            break;
        case 4:
            interval.number = "fourth";
            break;
        case 5:
            interval.number = "fifth";
            break;
        case 6:
            interval.number = "sixth";
            break;
        case 7:
            interval.number = "seventh";
            break;
        case 8:
            interval.number = "octave";
            break;
    }

    switch (semitones) {
        case 0:
            if (simpleDistance === 1) {
                interval.quality = perfect;
            } else if (simpleDistance === 2) {
                interval.quality = diminished
            } else if (simpleDistance === 7) {
                interval.quality = augmented
            } else if (simpleDistance === 8) {
                interval.quality = perfect
            } else {
                interval.unclassified = true;
            }
            break;
        case 1:
            if (simpleDistance === 1) {
                interval.quality = augmented;
            } else if (simpleDistance === 2) {
                interval.quality = minor
            } else if (simpleDistance === 8) {
                interval.quality = augmented;
            } else {
                interval.unclassified = true;
            }
            if (simpleDistance >= 2 && interval.compound === false) {
                interval.name = "semitone";
            }
            break;
        case 2:
            if (simpleDistance === 2) {
                interval.quality = major;
            } else if (simpleDistance === 3) {
                interval.quality = diminished
            } else {
                interval.unclassified = true;
            }
            if (interval.compound === false) {
                interval.name = "tone";
            }
            break;
        case 3:
            if (simpleDistance === 2) {
                interval.quality = augmented;
            } else if (simpleDistance === 3) {
                interval.quality = minor
            } else {
                interval.unclassified = true;
            }
            break;
        case 4:
            if (simpleDistance === 3) {
                interval.quality = major
            } else if (simpleDistance === 4) {
                interval.quality = diminished
            } else {
                interval.unclassified = true;
            }
            break;
        case 5:
            if (simpleDistance === 3) {
                interval.quality = augmented
            } else if (simpleDistance === 4) {
                interval.quality = perfect
            } else {
                interval.unclassified = true;
            }
            break;
        case 6:
            if (simpleDistance === 4) {
                interval.quality = augmented
            } else if (simpleDistance === 5) {
                interval.quality = diminished
            } else {
                interval.unclassified = true;
            }
            if (interval.compound === false) {
                interval.name = "tritone";
            }
            break;
        case 7:
            if (simpleDistance === 5) {
                interval.quality = perfect
            } else if (simpleDistance === 6) {
                interval.quality = diminished
            } else {
                interval.unclassified = true;
            }
            break;
        case 8:
            if (simpleDistance === 5) {
                interval.quality = augmented
            } else if (simpleDistance === 6) {
                interval.quality = minor
            } else {
                interval.unclassified = true;
            }
            break;
        case 9:
            if (simpleDistance === 6) {
                interval.quality = major
            } else if (simpleDistance === 7) {
                interval.quality = diminished
            } else {
                interval.unclassified = true;
            }
            break;
        case 10:
            if (simpleDistance === 6) {
                interval.quality = augmented
            } else if (simpleDistance === 7) {
                interval.quality = minor
            } else {
                interval.unclassified = true;
            }
            break;
        case 11:
            if (simpleDistance === 7) {
                interval.quality = major
            } else if (simpleDistance === 8) {
                interval.quality = diminished
            } else {
                interval.unclassified = true;
            }
            break;
    }

    return interval;
}