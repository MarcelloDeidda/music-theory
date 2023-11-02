"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNoteinRange = exports.isNoteHigher = exports.sortNotes = exports.availableAccidentals = exports.printKeyboard = void 0;
const notes_utils_1 = require("./notes-utils");
// This function returns the white keys of a keyboard
const printKeyboard = () => {
    const keyboard = [];
    for (let i = 0; i <= 8; i++) {
        for (let note of notes_utils_1.notes) {
            if (i == 0 && notes_utils_1.notes.slice(0, notes_utils_1.notes.indexOf("A")).includes(note)) {
                continue;
            }
            keyboard.push(`${note}${i}`);
            if (note == "C" && i == 8) {
                break;
            }
        }
    }
    return keyboard;
};
exports.printKeyboard = printKeyboard;
const availableAccidentals = (grade) => {
    const availableAccidentals = notes_utils_1.accidentals.slice();
    let index;
    if (grade < 4) {
        index = availableAccidentals.indexOf("B");
        availableAccidentals.splice(index, 1);
        index = availableAccidentals.indexOf("x");
        availableAccidentals.splice(index, 1);
    }
    index = availableAccidentals.indexOf("");
    availableAccidentals[index] = null;
    return availableAccidentals;
};
exports.availableAccidentals = availableAccidentals;
// This function sorts a list of notes
const sortNotes = (...noteList) => {
    const newNoteList = noteList.slice();
    newNoteList.sort((a, b) => {
        // Compare octaves
        if (a.getOctave() > b.getOctave()) {
            return 1;
        }
        else if (b.getOctave() > a.getOctave()) {
            return -1;
        }
        else {
            // Compare names
            if (notes_utils_1.notes.indexOf(a.getLetterName()) > notes_utils_1.notes.indexOf(b.getLetterName())) {
                return 1;
            }
            else if (notes_utils_1.notes.indexOf(a.getLetterName()) < notes_utils_1.notes.indexOf(b.getLetterName())) {
                return -1;
            }
            else {
                // Compare alterations
                if (a.getAccidentalInSemitones() > b.getAccidentalInSemitones()) {
                    return 1;
                }
                else if (a.getAccidentalInSemitones() < b.getAccidentalInSemitones()) {
                    return -1;
                }
                else {
                    return 0;
                }
            }
        }
    });
    return newNoteList;
};
exports.sortNotes = sortNotes;
// This function checks that the second note is higher than the first
const isNoteHigher = (note1, note2) => {
    const sortedNotes = (0, exports.sortNotes)(note1, note2);
    return note1.getNote() === sortedNotes[0].getNote();
};
exports.isNoteHigher = isNoteHigher;
// This function checks that the second note is higher than the first
const isNoteinRange = (lowerNote, note, higherNote) => {
    return (0, exports.isNoteHigher)(lowerNote, note) && (0, exports.isNoteHigher)(note, higherNote);
};
exports.isNoteinRange = isNoteinRange;
