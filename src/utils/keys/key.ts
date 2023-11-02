import { calculateNoteFromInterval } from "../intervals/intervals-functions";
import { triadFromKey } from "../chords/chords-functions";
import { getKeySignature } from "./keys-functions";
import { scaleFromKey } from "./scales-functions";

import Note from "../notes/note";
import Interval from "../intervals/interval";

import { KeyInterface, MinorScaleInterface, NoteInterface } from "../../ts/interfaces/interfaces";

const Key = class implements KeyInterface {
    // This object is initialised with a string containing key name
    // (e.g.: "Ab major")
    constructor(private name: string) {
    }

    getName(): string {
        return this.name;
    }

    getTonic(): string {
        let keyInfo = this.name.split(" ");
        return keyInfo[0];
    }

    getMode(): string {
        let keyInfo = this.name.split(" ");
        return keyInfo[1];
    }

    getRelative(): string {
        let mode = this.getMode();
        if (mode === "major") {
            return `${this.getDegree(6)} minor`;
        } else {
            return `${this.getDegree(3)} major`;
        }
    }

    getKeySignature(): string[] {
        return getKeySignature(this.name);
    }

    getAscScale(tonic: NoteInterface): NoteInterface[] | MinorScaleInterface {
        if (this.getMode() === "major") {
            return scaleFromKey(tonic, this.getKeySignature());
        } else {
            const ascScales: MinorScaleInterface = {
                natural: scaleFromKey(tonic, this.getKeySignature()),
                harmonic: [],
                melodic: []
            };

            ascScales.harmonic = ascScales.natural.slice();
            ascScales.harmonic[6] = calculateNoteFromInterval(ascScales.harmonic[6], new Interval("augmented 1"));

            ascScales.melodic = ascScales.harmonic.slice();
            ascScales.melodic[5] = calculateNoteFromInterval(ascScales.melodic[5], new Interval("augmented 1"));

            return ascScales;
        }
    }

    getDescScale(tonic: NoteInterface): NoteInterface[] | MinorScaleInterface {
        if (this.getMode() === "major") {
            return scaleFromKey(tonic, this.getKeySignature()).sort(() => -1);
        } else {
            const descScales: MinorScaleInterface = {
                natural: scaleFromKey(tonic, this.getKeySignature()).sort(() => -1),
                harmonic: [],
                melodic: []
            };

            descScales.harmonic = descScales.natural.slice();
            descScales.harmonic[1] = calculateNoteFromInterval(descScales.harmonic[1], new Interval("augmented 1"));

            descScales.melodic = descScales.natural.slice();

            return descScales;
        }
    }

    getDegree(degree: number): string {
        let tonic = new Note(`${this.getTonic()}3`)
        const scale: NoteInterface[] | MinorScaleInterface = this.getAscScale(tonic);

        if ("harmonic" in scale) {
            return scale.harmonic[degree - 1].getNoteWithoutOctave();
        } else {
            return scale[degree - 1].getNoteWithoutOctave();
        }
    }

    getTriad(degree: number, tonic: NoteInterface): NoteInterface[] {
        let triad: NoteInterface[] = triadFromKey(degree, tonic, this.getKeySignature());

        if (this.getMode() === "minor") {
            let seventh = this.getDegree(7)[0];

            return triad.map(note => {
                if (note.getLetterName() === seventh) {
                    return calculateNoteFromInterval(note, new Interval("augmented 1"));
                } else {
                    return note;
                }
            });
        }
        return triad;
    }
}

export default Key;