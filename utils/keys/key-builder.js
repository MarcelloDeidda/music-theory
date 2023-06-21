const { MajorKey, MinorKey } = require("./key");

const KeyBuilder = class {
    static availableKeys(grade) {
        const keys = [
            new MajorKey("C"),
            new MajorKey("G"),
            new MajorKey("D"),
            new MajorKey("F"),
        ]

        if (grade > 1) {
            ["A", "Bb", "Eb"].map(tonic => keys.push(new MajorKey(tonic)));
            ["A", "E", "D"].map(tonic => keys.push(new MinorKey(tonic)));
        }

        if (grade > 2) {
            ["Ab", "E"].map(tonic => keys.push(new MajorKey(tonic)));
            ["B", "F#", "C#", "G", "C", "F"].map(tonic => keys.push(new MinorKey(tonic)));
        }

        if (grade > 3) {
            ["Db", "B"].map(tonic => keys.push(new MajorKey(tonic)));
            ["Bb", "G#"].map(tonic => keys.push(new MinorKey(tonic)));
        }

        if (grade > 4) {
            ["Gb", "F#"].map(tonic => keys.push(new MajorKey(tonic)));
            ["Eb", "D#"].map(tonic => keys.push(new MinorKey(tonic)));
        }

        return keys;
    }
}

module.exports = KeyBuilder;