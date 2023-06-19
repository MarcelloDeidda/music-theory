const prompt = require("prompt");

const Exercise = class {
    constructor(exercise) {
        const { question, answers } = exercise();
        this.question = question;
        this.answers = answers;
    }

    async execute() {
        while (true) {
            console.log(this.question);
            prompt.start();
            const { answer } = await prompt.get(["answer"]);

            if (this.answers.includes(answer)) {
                console.log("Correct!");
                break;
            } else {
                console.log("Wrong!");
                console.log(`The correct answer is: ${this.answers}`);
                break;
            }
        }
    }
}

module.exports = Exercise;