import { stringToNumber } from "../../ts/interfaces/interfaces";

export const timeSignaturesTopValues: number[] = [2, 3, 4, 5, 6, 7, 9, 12];

export const timeSignaturesBottomValues: number[] = [2, 4, 8, 16];

export const values: stringToNumber = {
    breve: 8,
    semibreve: 4,
    minim: 2,
    crotchet: 1,
    quaver: 0.5,
    semiquaver: 0.25,
    demisemiquaver: 0.125
}

export const valueList: string[] = [
    "breve",
    "semibreve",
    "minim",
    "crotchet",
    "quaver",
    "semiquaver",
    "demisemiquaver"
]