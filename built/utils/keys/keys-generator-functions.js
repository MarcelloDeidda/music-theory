"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllKeys = exports.getRandomKey = exports.availableKeys = void 0;
const keys_utils_1 = require("./keys-utils");
const key_1 = __importDefault(require("./key"));
// Return available keys from grade (as integer)
const availableKeys = (grade) => {
    const keyList = [
        new key_1.default("C major"),
        new key_1.default("G major"),
        new key_1.default("D major"),
        new key_1.default("F major"),
    ];
    if (grade > 1) {
        [
            "A major",
            "Bb major",
            "Eb major",
            "A minor",
            "E minor",
            "D minor"
        ].map(tonic => keyList.push(new key_1.default(tonic)));
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
        ].map(tonic => keyList.push(new key_1.default(tonic)));
    }
    if (grade > 3) {
        [
            "Db major",
            "B major",
            "Bb minor",
            "G# minor"
        ].map(tonic => keyList.push(new key_1.default(tonic)));
    }
    if (grade > 4) {
        [
            "Gb major",
            "F# major",
            "Eb minor",
            "D# minor"
        ].map(tonic => keyList.push(new key_1.default(tonic)));
    }
    return keyList;
};
exports.availableKeys = availableKeys;
// Returns random key from grade (as integer)
const getRandomKey = (grade) => {
    const keyList = (0, exports.availableKeys)(grade);
    let random = Math.floor(Math.random() * keyList.length);
    return keyList[random];
};
exports.getRandomKey = getRandomKey;
// Returns all major and minor keys
const getAllKeys = () => {
    const keyList = [];
    for (let key in keys_utils_1.keys) {
        const newKey = new key_1.default(`${key} major`);
        keyList.push(newKey);
        keyList.push(new key_1.default(newKey.getRelative()));
    }
    return keyList;
};
exports.getAllKeys = getAllKeys;
