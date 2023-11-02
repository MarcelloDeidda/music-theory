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

export interface keyConfigInterface {
    type: "#" | "b" | null,
    number: number
}

export interface keyOptionInterface {
    [key: string]: keyConfigInterface
}

export interface MinorScaleInterface {
    natural: NoteInterface[],
    harmonic: NoteInterface[],
    melodic: NoteInterface[]
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

    getSemitones(): number | undefined;

    isCompound(): boolean;

    isClassified(): boolean;
}

export interface KeyInterface {
    getName(): string;

    getTonic(): string;

    getMode(): string;

    getRelative(): string;

    getKeySignature(): string[];

    getAscScale(tonic: NoteInterface): NoteInterface[] | MinorScaleInterface;

    getDescScale(tonic: NoteInterface): NoteInterface[] | MinorScaleInterface;

    getDegree(degree: number): string;

    getTriad(degree: number, tonic: NoteInterface): NoteInterface[];
}