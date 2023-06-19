const { MajorKey, MinorKey } = require("../../utils/keys/key");
const Note = require("../../utils/notes/note");

const recogniseTonicTriad = (grade = 1) => {
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
        ["Ab", "B", "E"].map(tonic => keys.push(new MajorKey(tonic)));
        ["B", "F#", "C#", "G", "C", "F"].map(tonic => keys.push(new MinorKey(tonic)));
    }

    let index = Math.floor(Math.random() * keys.length);
    let tonic = new Note(keys[index].tonic + 4);
    let triad = keys[index].getTriad(1, tonic, "major");

    let question = `Enter the key of the following chord: ${triad[0].fullNote} ${triad[1].fullNote} ${triad[2].fullNote}:`
    let answers = [keys[index].name];

    return {
        question,
        answers
    }
}

const addNoteToCompleteTriad = (grade = 1) => {
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
        ["Ab", "B", "E"].map(tonic => keys.push(new MajorKey(tonic)));
        ["B", "F#", "C#", "G", "C", "F"].map(tonic => keys.push(new MinorKey(tonic)));
    }

    let index = Math.floor(Math.random() * keys.length);
    let tonic = new Note(keys[index].tonic + 4);
    let triad = keys[index].getTriad(1, tonic, "major");

    let answers = [triad.splice(Math.floor(Math.random() * 3), 1)[0].fullNote];
    let question = `Add note to complete the following chord: ${triad[0].fullNote} ${triad[1].fullNote}:`

    return {
        question,
        answers
    }
}

module.exports = {
    recogniseTonicTriad,
    addNoteToCompleteTriad
}