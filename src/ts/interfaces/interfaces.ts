export interface stringToNumber {
    [key: string]: number
}

export interface numberToString {
    [key: number]: string
}

export interface stringToString {
    [key: string]: string
}

export interface semitonesToIntervalsInterface {
    [key: number]: {
        [key: string]: string
    }
}

export interface NoteInterface {
    getNote(): string;

    getNoteWithoutOctave(): string;

    getLetterName(): string;

    getOctave(): string;

    getAccidental(): string | null;

    getAccidentalInSemitones(): number;

    getValue(): string;

    getBeats(): number;
}

export interface IntervalInterface {
    getInterval(): string;

    getDistance(): number;

    getSimpleDistance(): number;

    getNumber(): string;

    getQuality(): string | null;

    getSemitones(): number;

    isCompound(): boolean;

    isClassified(): boolean;
}