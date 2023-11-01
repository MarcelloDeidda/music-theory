import { keyOptionInterface } from "../../ts/interfaces/interfaces";

export const scaleDegrees: string[] = [
    "tonic",
    "supertonic",
    "mediant",
    "subdominant",
    "dominant",
    "submediant",
    "leading note"
]

export const keys: keyOptionInterface = {
    "Cb": {
        type: "b",
        number: 7
    },
    "C": {
        type: null,
        number: 0
    },
    "C#": {
        type: "#",
        number: 7
    },
    "Db": {
        type: "b",
        number: 5
    },
    "D": {
        type: "#",
        number: 2
    },
    "Eb": {
        type: "b",
        number: 3
    },
    "E": {
        type: "#",
        number: 4
    },
    "F": {
        type: "b",
        number: 1
    },
    "F#": {
        type: "#",
        number: 6
    },
    "Gb": {
        type: "b",
        number: 6
    },
    "G": {
        type: "#",
        number: 1
    },
    "Ab": {
        type: "b",
        number: 4
    },
    "A": {
        type: "#",
        number: 3
    },
    "Bb": {
        type: "b",
        number: 2
    },
    "B": {
        type: "#",
        number: 5
    }
}

export const accidentalsIndexes: number[] = [3, 0, 4, 1, 5, 2, 6];