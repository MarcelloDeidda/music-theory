const Note = class {
    constructor(fullNote) {
        this.fullNote = fullNote;
        this.note = fullNote.slice(0, fullNote.length - 1)
        this.name = fullNote[0];
        this.alteration = fullNote.length === 3 ? fullNote[1] : null;
        this.octave = fullNote.slice(fullNote.length - 1);
        this.alterationInSemitones = this.alteration === "x" ? 2 :
            this.alteration === "#" ? 1 :
                this.alteration === null ? 0 :
                    this.alteration === "b" ? -1 :
                        this.alteration === "B" ? -2 :
                            null
    }
}

module.exports = Note;