const { getRandomTimeSignature, createBar } = require("../../utils/rhythm/rhythm-functions");

const RhythmExercises = class {
    #grade;

    constructor(grade) {
        this.#grade = grade;
    }

    addBarLine() {
        const timeSignature = getRandomTimeSignature(this.#grade);

        let minValue = "semibreve";
        let maxValue = "semiquaver";

        if (this.#grade > 2) {
            maxValue = "demisemiquaver";
        }

        if (this.#grade > 3) {
            minValue = "breve";
        }

        const bar1 = createBar(timeSignature, minValue, maxValue, this.#grade);
        const bar2 = createBar(timeSignature, minValue, maxValue, this.#grade);

        let question, answers;

        question = `Here are two bars in ${timeSignature[0]}/${timeSignature[1]}.
        How many notes are there in the first bar?
        ${bar1.concat(bar2)}`

        answers = [bar1.length];

        return {
            question,
            answers
        };
    }

    addBarLineNoSemiquaversNoDotted() {
        const timeSignature = getRandomTimeSignature(this.#grade);

        let minValue = "semibreve";
        let maxValue = "quaver";

        let bar1 = createBar(timeSignature, minValue, maxValue, this.#grade);
        while (bar1.some(note => note.split(" ").includes("dotted"))) {
            console.log("here");
            bar1 = createBar(timeSignature, minValue, maxValue, this.#grade);
        }

        let bar2 = createBar(timeSignature, minValue, maxValue, this.#grade);
        while (bar2.some(note => note.split(" ").includes("dotted"))) {
            console.log("here");
            bar2 = createBar(timeSignature, minValue, maxValue, this.#grade);
        }

        let question, answers;

        question = `Here are two bars in ${timeSignature[0]}/${timeSignature[1]}.
        How many notes are there in the first bar?
        ${bar1.concat(bar2)}`

        answers = [bar1.length];

        return {
            question,
            answers
        };
    }
}

module.exports = RhythmExercises;