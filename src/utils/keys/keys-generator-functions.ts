import { keys } from "./keys-utils";

import Key from "./key";

import { KeyInterface } from "../../ts/interfaces/interfaces";
import { gradeType } from "../../ts/types/types";

// Return available keys from grade (as integer)
export const availableKeys = (grade: gradeType): KeyInterface[] => {
    const keyList = [
        new Key("C major"),
        new Key("G major"),
        new Key("D major"),
        new Key("F major"),
    ]

    if (grade > 1) {
        [
            "A major",
            "Bb major",
            "Eb major",
            "A minor",
            "E minor",
            "D minor"
        ].map(tonic => keyList.push(new Key(tonic)));
    }

    if (grade > 2) {
        [
            "Ab major",
            "E major",
            "B minor",
            "F# minor",
            "C# minor",
            "G minor",
            "C minor",
            "F minor"
        ].map(tonic => keyList.push(new Key(tonic)));
    }

    if (grade > 3) {
        [
            "Db major",
            "B major",
            "Bb minor",
            "G# minor"
        ].map(tonic => keyList.push(new Key(tonic)));
    }

    if (grade > 4) {
        [
            "Gb major",
            "F# major",
            "Eb minor",
            "D# minor"
        ].map(tonic => keyList.push(new Key(tonic)));
    }

    return keyList;
}

// Returns random key from grade (as integer)
export const getRandomKey = (grade: gradeType): KeyInterface => {
    const keyList = availableKeys(grade);

    let random = Math.floor(Math.random() * keyList.length);
    return keyList[random];
}

// Returns all major and minor keys
export const getAllKeys = (): KeyInterface[] => {
    const keyList: KeyInterface[] = [];

    for (let key in keys) {
        const newKey = new Key(`${key} major`);
        keyList.push(newKey);
        keyList.push(new Key(newKey.getRelative()));
    }

    return keyList;
}