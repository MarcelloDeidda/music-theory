const KeyBuilder = require("../../utils/keys/key-builder");
const Note = require("../../utils/notes/note");
const ExerciseHandler = require("../exercise");

const TonicTriadExercises = class {
    constructor(grade = 1) {
        this.keys = KeyBuilder.availableKeys(grade);
    }

    recogniseTriad() {
        let index = Math.floor(Math.random() * this.keys.length);
        let tonic = new Note(this.keys[index].tonic + 4);
        let triad = this.keys[index].getTriad(1, tonic);

        let question = `Enter the key of the following chord: ${triad[0].fullNote} ${triad[1].fullNote} ${triad[2].fullNote}:`
        let answers = [this.keys[index].name];

        return {
            question,
            answers
        }
    }

    addNoteToCompleteTriad() {
        let index = Math.floor(Math.random() * this.keys.length);
        let tonic = new Note(this.keys[index].tonic + 4);
        let triad = this.keys[index].getTriad(1, tonic);

        let answers = [triad.splice(Math.floor(Math.random() * 3), 1)[0].fullNote];
        let question = `Add note to complete the following chord: ${triad[0].fullNote} ${triad[1].fullNote}:`

        return {
            question,
            answers
        }
    }

    addAccidentals() {
        let index = Math.floor(Math.random() * this.keys.length);
        let tonic = new Note(this.keys[index].tonic + 4);
        let triad = this.keys[index].getTriad(1, tonic);

        let naturalTriad = ExerciseHandler.removeAccidentals(triad);
        let differentNotes = triad.filter(note => {
            for (let naturalNote of naturalTriad) {
                if (naturalNote.fullNote === note.fullNote) {
                    return false;
                }
            }
            return true;
        });

        let question = `Add the accidentals to complete the tonic triad of ${this.keys[index].name}: ${naturalTriad[0].fullNote} ${naturalTriad[1].fullNote} ${naturalTriad[2].fullNote}:`
        let answers = [differentNotes.map(note => note.fullNote).join(" ")];

        if (answers[0] === "") { answers = ["none"] }

        return {
            question,
            answers
        }
    }

    isThisTriadRight() {
        let index = Math.floor(Math.random() * this.keys.length);
        let tonic = new Note(this.keys[index].tonic + 4);
        let triad = this.keys[index].getTriad(1, tonic);
        let triadIsCorrect = true;

        let random = Math.ceil(Math.random() * 2);

        if (random === 1) {
            triad = ExerciseHandler.tamperChordNoDouble(triad);
            triadIsCorrect = false;
        }

        let question = `Is this the tonic triad of ${this.keys[index].name}? ${triad[0].fullNote} ${triad[1].fullNote} ${triad[2].fullNote}:`
        let answers = [triadIsCorrect ? "yes" : "no"];

        return {
            question,
            answers
        }
    }
}

module.exports = TonicTriadExercises;
/*
const a = new ChordExercises(3);
console.log(a.isThisChordRight())*/