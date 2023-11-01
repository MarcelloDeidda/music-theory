import { notes } from "../notes/notes-utils";
import { calculateNoteFromInterval } from "../intervals/intervals-functions";
import { keys, accidentalsIndexes } from "./keys-utils";

import Interval from "../intervals/interval";
import Note from "../notes/note";

import { NoteInterface, keyConfigInterface } from "../../ts/interfaces/interfaces";

// Return accidentals from keyConfig as object (e.g.: { type: "#", number: 2})
export const getAccidentals = (keyConfig: keyConfigInterface): string[] => {
    const accidentals: string[] = [];

    if (keyConfig.type === "#") {
        for (let i = 0; i < keyConfig.number; i++) {
            accidentals.push(`${notes[accidentalsIndexes[i]]}#`);
        }
    } else if (keyConfig.type === "b") {
        for (let i = 0; i < keyConfig.number; i++) {
            accidentals.push(`${notes[accidentalsIndexes[accidentalsIndexes.length - i - 1]]}b`);
        }
    }

    return accidentals;
}

// Returns key signature as Array from key as string (e.g.: "D major")
export const getKeySignature = (key: string): string[] => {
    const keyInfo = key.split(" ");

    let tonic: NoteInterface;
    let mode = keyInfo[1];

    if (mode === "major") {
        tonic = new Note(`${keyInfo[0]}1`);
    } else {
        tonic = calculateNoteFromInterval(new Note(`${keyInfo[0]}1`), new Interval("minor 3"));
    }

    return getAccidentals(keys[tonic.getNoteWithoutOctave()]);
}
