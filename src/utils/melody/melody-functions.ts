import { gradeType, timeSignatureType } from "../../ts/types/types";
import { KeyInterface, MinorScaleInterface, NoteInterface } from "../../ts/interfaces/interfaces";
/*
export const writeRandomMelodyNoRhythm = (octave: number, numOfNotes: number = 10, grade: gradeType = 5): NoteInterface[] => {
    const melody: NoteInterface[] = [];

    const key = getRandomKey(grade);
    const tonic = new Note(`${key.getTonic()}${octave}`);

    let scale: NoteInterface[] | MinorScaleInterface= key.getAscScale(tonic);

    if (scale instanceof MinorScaleInterface) {
        scale = key.getAscScale(tonic).harmonic;
    } else {
        scale = key.getAscScale(tonic);
    }

    let degree = startingDegrees[Math.floor(Math.random() * startingDegrees.length)];
    let note: NoteInterface = scale[degree - 1];

    melody.push(note);

    while (melody.length < numOfNotes) {
        note = getRandomNoteFromScale(scale);

        let interval = calculateInterval(melody[melody.length - 1], note);

        while (
            interval.getDistance() > 4 ||
            note.getNote() === melody[melody.length - 1].getNote() ||
            !["major", "perfect", "minor"].includes(interval.getQuality())
        ) {
            note = getRandomNoteFromScale(scale);
            interval = calculateInterval(melody[melody.length - 1], note);
        }

        melody.push(note);
    }

    return { melody, key };
}
*/
export const writeRandomMelody = (
    key: KeyInterface,
    octave: number,
    numOfBars = 1,
    timeSignature: timeSignatureType,
    minValue = "breve",
    maxValue = "demisemiquaver",
    grade = 5
) => {
    /*
    This function will create a random melody with a fixed length depending on the numOfBars parametre.
    
    Parametres:
    - key: the key will be randomly set before calling this function, then passed in as an argument.
    - octave: will indicate the pitch range of the melody. This might actually become a clef parametre,
        in order to be ready for use in the UI.
    - numOfBars: set to 1 by default, for exercises where key signature must be recognised. Exercises where
        bar lines should be added will require a different value.
    - timeSignature ... grade: these parametres will be handed down to the createBar function,
        from rhythm functions.

    The aim of this function is to create a realistic melody, using notes from a key signature, within a
    reasonable range (clef will be relevant for this).

    The melody will most likely start on a key degree (tonic, mediant, subdominant, dominant).
    Starting from the first note, it will move up or down (with higher chance of following the same
    direction to avoid note repetition), with smaller or larger gaps depending on shorter or longer
    values.

    !!! It may be useful to encourage the melody to move on important notes of the key.

    To make sure that the notes do cover a good part of the required range, rather than just the octave
    from the key scale, a good alternative approach might be to move along the keyboard array following
    a randomly chosen interval (smaller or larger depending on rhythm), making sure that the new note
    stays within boundaries and adding the relevant accidentals.

    !!! To ensure that the melody contains enough notes to show the key, minValue should not be greater than
    a beat, and maxValue should be at least two values shorter where possible (e.g.: minim -> quaver,
    crotchet -> semiquaver).

    This may also be achieved with a minimum number of notes for each bar.

    !!! Should the melody end on a longer note?

    Procedure:
    - Determine the clef boundaries according to grade.
    - Determine the tonic and key signature of given key.
    - Call createBar() function to get a rhythmic pattern (maybe check number of notes).
    - Randomly choose first note of the melody.
    - If current note is short (quarter of a beat), the next gap should be a second, sometimes a third.
        The gap should be free otherwise (within an octave maybe, and with preference towards smaller).
    - The next note should preferably follow the same direction (especially in case of smaller gaps).
    - The next note is found, combining interval number and direction. Relevant accidental is added.
    */
}