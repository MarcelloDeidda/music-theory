import { stringToNumber } from "../../ts/interfaces/interfaces";

export const notes: string[] = ["C", "D", "E", "F", "G", "A", "B"];

export const accidentals: string[] = ["B", "b", "", "#", "x"];

export const chromaticScale: string[][] = [
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
];

export const accidentalsInSemitones: stringToNumber = {
    "B": -2,
    "b": -1,
    "#": 1,
    "x": 2
};