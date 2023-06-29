# Music Theory

## Objectives

The aim of this program is to provide music theory students with infinite exercises, in order to practise concepts from grade 1 to 5 (ABRSM).

## Development

The development of this program is at the earliest stage, which entails gathering requirements, define main topics and exercises, and write basic functionalities to evaluate main music theory concepts.

## Content

The directory contains a "./utils" and a "./exercises" folder, which cointain the logic of the program.

### Utils

This folder is organised in the following subfolders: "./chords", "./intervals", "./keys", "./melody", "./notes", "./terms".

#### Notes

The file "./notes-utils.js" contains several helper data structs:

- *array* **notes** contains the letter names of the seven notes
- *array* **accidentals** contains the five accidentals
- *object* **accidentalsInSemitones** contains the relationship between accidentals and semitone alteration to a note
- *array* **chromaticScale** contains the list of enharmonic equivalent values in an octave

The file "./notes-functions.js" contains several helper functions:

- **printKeyboard** returns an array with all white keys of a piano
- **sortNotes** sorts and returns a list of notes in ascending order
- **isNoteHigher** compares two notes
- **getRandomNote** returns a random note
- **getRandomNoteNoDouble** returns a random note avoiding double sharp or double flat accidentals
- **getRandomNaturalNote** returns a random note avoiding accidentals
- **getRandomNoteFromScale** returns a random note from a given scale (array containing Note objects)

#### Intervals

The file "./intervals-utils.js" contains several helper data structs:

- *object* **qualities** contains the five interval qualities
- *object* **intervalNumbers** contains the interval numbers from *unison* to *octave*
- *object* **semitonesToIntervals** contains the relationship between semitone count, interval number and interval quality

The file "./intervals-functions.js" contains the following functions:

- *local* **calculateDistance(firstNote, secondNote)** calculates the number distance between two notes
- *local* **calculateSemitones(firstNote, secondNote)** calculates the number of semitones between two notes
- **calculateInterval(firstNote, secondNote)** calculates the interval between two notes
- **calculateNoteFromInterval(note, interval, asc = true)** finds the note with a distance of **interval** higher or lower (depending on **asc**) than **note**

The file "./interval.js" contains the class Interval, containing the following methods:

- *constructor* initialises the class with **interval** and **semitones** parameters (the second is set to *null* by default)
- **getInterval** returns the name of the interval (quality + distance)
- **getDistance** returns the distance of the interval as an integer
- **getSimpleDistance** returns the simple distance (ignoring compound) of the interval as an integer
- **getNumber** returns the number of the interval as a string (e.g. "third")
- **getQuality** returns the quality of the interval
- **getSemitones** returns the number of semitones as an integer
- **isCompound** returns a boolean
- **isClssified** returns a boolean representing whether or not the interval's quality is one of the five provided by "./intervals-utils.js"

#### Chords

The file "./chord-functions.js" cointains the following functions:

- **majorChord(root)** returns a major chord from a single note
- **minorChord(root)** returns a minor chord from a single note
- **diminishedChord(root)** returns a diminished chord from a single note
- **augmentedChord(root)** returns a augmented chord from a single note
- **dominantSeventh(root)** returns a dominant seventh chord from a single note
- **triadFromKey(degree, tonic, keySignature)** returns a triad of a scale starting at **tonic**

## Concepts

- Pitch:
    - Recognise notes with multiple ledger lines 
    - Recognise notes in four different keys 
    - Recognise accidentals 
    - Calculate semitones and tones 
    - Transposing by one octave, major 2nd, minor 3rd, perfect 5th
    - Double sharps and Double flats 
    - Enharmonic equivalents
- Rhythm:
    - Time values
    - Time signatures in /2, /4, /8, /16
    - Duple, triple, quadruple / simple, compound
    - Irregular time signatures
    - Rests
    - Ties and dotted notes
    - Triplets, quintuplets, sextuplets
    - Grouping notes
- Keys & Scales:
    - **Recognise all major and minor scales**
    - **Degrees of a scale and their names**
    - Tones and Semitones
    - Chromatic scale 
- Intervals:
    - **Calculating simple and compound intervals**
    - **Classifying perfect, minor, major, diminished and augmented intervals**
- Chords:
    - **Tonic triads in major and minor keys**
    - Primary chords and primary triads
    - Root position, inversions
    - Cadences
    - Choosing suitable chords for melodies
    - All chords of scales 
    - 7th chords 
- Terms and signs in Italian, French and German
- Ornaments
- Instruments and voice types


## Exercises

### Pitch

- **Grade One:**
    - *Name note in treble and bass clef (with/out acc)*
    - **Find the higher note of two (with/out acc)**
    - *Spell words with notes*
    - *Add clef to note and note name*
    - **Find semitones and tones**
    - **Add accidental to make semitones or tones**
- **Grade Two:**
    - *Name note with ledger line (up to two)*
    - **Find the higher note of two**
    - *Spell words with notes*
    - *Add clef to note and note name*
    - *Rewrite note in different clef*
- **Grade Three:**
    - *Name note with ledger line (up to three)*
    - **Find the higher note of two**
    - *Add clef to note and note name*
    - *Rewrite note in different clef*
    - **Transpose one octave higher/lower**
- **Grade Four:**
    - *Name note in alto clef*
    - *Add clef to note and note name*
    - *Rewrite note in different clef*
    - *Double sharp and double flat*
    - **Find enharmonic equivalent**
    - **Enharmonic equivalente true/false**
    - **Transpose one octave higher/lower**
- **Grade Five:**
    - *Name note in tenor clef*
    - *Add clef to note and note name*
    - *Rewrite note in different clef*
    - **Find enharmonic equivalent**
    - **Enharmonic equivalente true/false**
    - **Transpose one octave higher/lower**
    - **Transpose a major 2nd, minor 3rd, perfect 5th**
    - **Find new key signature**
    - **Transposing instruments**

### Keys & Scales

- Grade One:
    - **Keys: C, G, D, F major**
    - **Add notes to complete scale**
    - **Find degrees of a scale**
    - Find tones and semitones in a scale
    - **Recognise scales**
    - **Add accidentals to scales**
    - **Given a key signature, find the major key**
    - **Select correct key signature for scales**
    - *Recognise accidentals*
    - **Given a melody with accidentals, recognise the key**
    - **Select notes that need accidental to create melody in given key**
- Grade Two:
    - **Keys: A, Bb, Eb major and A, E, D minor**
    - **Recognise key signatures**
    - **Add accidentals to scales**
    - **Add accidentals to melodies**
    - **Find degrees of scales**
    - Find tones / semitones of scales
    - **Find key of given melody**
    - **Find relative minors**
    - **Harmonic scales**
- Grade Three:
    - **Keys: E, Ab major and B, F#, C#, G, C, F minor**
    - **Add accidentals to scales**
    - **Find degrees of scales**
    - **Recognise key signatures**
    - **Add accidentals to melodies**
    - **Melodic scales**
    - **Find relative minors**
    - **Recognise scales**
    - Select accidentals that aren't needed
- Grade Four:
    - **Keys: Db, B major and G#, Bb minor**
    - **Technical names for the degrees**
    - *Choose correct clef for key signature*
    - **Add accidentals to scales**
    - **Add accidentals to melodies**
    - **Recognise key of melody**
    - Chromatic scale - find incorrect notes
    - **Name major and minor keys for key signature**
    - **Recognise scales**
- **Grade Five:**
    - **Keys: Gb, F# major and Eb, D# minor**
    - **Find the correct key signature for a key**
    - *Choose correct clef for key signature*
    - **Add accidentals to scales**
    - **Add accidentals to melodies**
    - **Find degrees of scales**
    - **Complete scales**

### **Intervals**

- **Grade One:**
    - **Keys: C, G, D, F major**
    - **Calculate ascending intervals (number only) from the tonic**
    - **Given the tonic and an ascending interval, find the second note**
- **Grade Two:**
    - **Keys: A, Bb, Eb major and A, E, D minor**
    - **Calculate ascending intervals (number only) from the tonic**
    - **Given the tonic and an ascending or descending interval, find the second note**
- **Grade Three:**
    - **Keys: E, Ab major and B, F#, C#, G, C, F minor**
    - **Calculate ascending simple intervals (perfect / minor / major) from the tonic**
    - **Given the tonic and a simple interval, find the second note**
- **Grade Four:**
    - **Keys: Db, B major and G#, Bb minor**
    - **Calculate intervals from any note**
    - **Given a note and an interval, find the second note**
    - **Count semitones in intervals**
- **Grade Five:**
    - **Keys: Gb, F# major and Eb, D# minor**
    - **Calculate chromatic and compound intervals from any note**
    - **Given a note and a chromatic / compound interval, find the second note**
    - **Count semitones in intervals**

### Chords

- **Grade One**:
    - **Keys: C, G, D, F major**
    - **Recognise key of tonic triad**
    - **Add note to complete triad**
- **Grade Two**:
    - **Keys: A, Bb, Eb major and A, E, D minor**
    - **Recognise key of tonic triad**
    - **Add note to complete triad**
- **Grade Three:**
    - **Keys: E, Ab major and B, F#, C#, G, C, F minor**
    - **True / False**
    - **Recognise key of tonic triad**
    - **Add note to complete triad**
    - **Add accidental to complete triad**
- **Grade Four:**
    - **Keys: Db, B major and G#, Bb minor**
    - **Primary triads**
    - **Name the key of triads (3, 2, 1)**
    - **Recognise triad degree**
    - **Write triad in root position**
    - Recognise primary chords
- Grade Five:
    - **Keys: Gb, F# major and Eb, D# minor**
    - **Recognise triad degree**
    - **Add note to complete triad**
    - Recognise cadences
    - Choose suitable chord for melody
    - Choose chords, then name cadences
    - Recognise Inversions in triads and chords

