import { notes, accidentals } from "./notes-utils";

import { NoteInterface } from "../../ts/interfaces/interfaces";
import { gradeType } from "../../ts/types/types";

// This function returns the white keys of a keyboard
export const printKeyboard = (): string[] => {
    const keyboard: string[] = []

    for (let i = 0; i <= 8; i++) {
        for (let note of notes) {
            if (i == 0 && notes.slice(0, notes.indexOf("A")).includes(note)) { continue }

            keyboard.push(`${note}${i}`)
            if (note == "C" && i == 8) { break }
        }
    }

    return keyboard;
}

export const availableAccidentals = (grade: gradeType): Array<string | null> => {
    const availableAccidentals: Array<string | null> = accidentals.slice();
    let index: number;

    if (grade < 4) {
        index = availableAccidentals.indexOf("B");
        availableAccidentals.splice(index, 1);

        index = availableAccidentals.indexOf("x");
        availableAccidentals.splice(index, 1);
    }

    index = availableAccidentals.indexOf("");
    availableAccidentals[index] = null;

    return availableAccidentals;
}

// This function sorts a list of notes
export const sortNotes = (...noteList: NoteInterface[]): NoteInterface[] => {
    const newNoteList = noteList.slice();
    newNoteList.sort((a, b) => {
        // Compare octaves
        if (a.getOctave() > b.getOctave()) {
            return 1
        } else if (b.getOctave() > a.getOctave()) {
            return -1
        } else {
            // Compare names
            if (notes.indexOf(a.getLetterName()) > notes.indexOf(b.getLetterName())) {
                return 1;
            } else if (notes.indexOf(a.getLetterName()) < notes.indexOf(b.getLetterName())) {
                return -1;
            } else {
                // Compare alterations
                if (a.getAccidentalInSemitones() > b.getAccidentalInSemitones()) {
                    return 1;
                } else if (a.getAccidentalInSemitones() < b.getAccidentalInSemitones()) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    });

    return newNoteList;
}

// This function checks that the second note is higher than the first
export const isNoteHigher = (note1: NoteInterface, note2: NoteInterface): boolean => {
    const sortedNotes = sortNotes(note1, note2);

    return note1.getNote() === sortedNotes[0].getNote();
}

// This function checks that the second note is higher than the first
export const isNoteinRange = (lowerNote: NoteInterface, note: NoteInterface, higherNote: NoteInterface): boolean => {
    return isNoteHigher(lowerNote, note) && isNoteHigher(note, higherNote);
}
