const RhythmicGroup = class {
    #notes;
    #groupValue;
    #groupName;

    constructor(notes, groupValue, groupName = null) {
        this.#notes = notes;
        this.#groupValue = groupValue;
        this.#groupName = groupName;
    }

    print() {
        if (this.#groupName !== null) {
            console.log(`${this.#groupName}: ${this.#groupValue}`);
        }
        this.#notes.map(note => {
            if (typeof note === "object") {
                note.print();
            } else {
                console.log(note);
            };
        });
    }
}

module.exports = RhythmicGroup;