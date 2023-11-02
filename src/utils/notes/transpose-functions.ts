import { calculateNoteFromInterval } from "../intervals/intervals-functions";

import { IntervalInterface, NoteInterface } from "../../ts/interfaces/interfaces";
import { directionType } from "../../ts/types/types";

// This function transposes a list of notes
export const transpose = (
    notes: NoteInterface[],
    interval: IntervalInterface,
    direction: directionType = "asc"
): NoteInterface[] => {
    const transposedNotes: NoteInterface[] = [];

    notes.map(note => {
        transposedNotes.push(calculateNoteFromInterval(note, interval, direction));
    })

    return transposedNotes;
}