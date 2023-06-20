# Music Theory

## Objectives

The aim of this program is to provide music theory students with infinite exercises, in order to practise concepts from grade 1 to 5 (ABRSM).

## Development

The development of this program is at the earliest stage, which entails gathering requirements, define main topics and exercises, and write basic functionalities to evaluate main music theory concepts.

## Content

The directory contains a "./utils" folder, in which are stored various functions and classes.

### ./note.js

This file exports a Note class, which is constructed via a string containing the name of the note, an accidental (if applicable) and the octave number.

### ./scales.js

This file contains:

- the array "notes", which stores the names of the seven notes, from C to B;
- the array "chromaticScale", which stores all the notes of the chromatic scale, grouping enharmonic notes into sub-arrays.
- the function "createScale", which takes the name of the tonic as a parameter and returns a one-octave ascending scale.
- the function "printKeyboard", which returns an array containing all the white keys of a piano.

## Topics

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
    - Recognise all major and minor scales 
    - Degrees of a scale and their names
    - Tones and Semitones
    - Chromatic scale 
- Intervals:
    - Calculating simple and compound intervals X
    - Classifying perfect, minor, major, diminished and augmented intervals X
- Chords:
    - Tonic triads in major and minor keys 
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

### Keys & Scales

- Grade One:
    - Keys: C, G, D, F major
    - Add notes to complete scale
    - Find degrees of a scale
    - Find tones and semitones in a scale
    - Recognise scales
    - Add accidentals to scales
    - True / False on degrees
    - Given a key signature, find the major key
    - Select correct key signature for scales
    - Recognise accidentals,
    - Given a melody with accidentals, recognise the key
    - Select notes that need accidental to create melody in given key
- Grade Two:
    - Keys: A, Bb, Eb major and A, E, D minor
    - Recognise key signatures
    - Add accidentals to scales
    - Add accidentals to melodies
    - Find degrees of scales
    - Find tones / semitones of scales
    - Find key of given melody
    - Find relative minors
    - Harmonic scales
- Grade Three:
    - Keys: E, Ab major and B, F#, C#, G, C, F minor
    - Add accidentals to scales
    - Find degrees of scales
    - Recognise key signatures
    - Add accidentals to melodies
    - Melodic scales
    - Find relative minors
    - Recognise scales
    - Select accidentals that aren't needed
- Grade Four:
    - Keys: Db, B major and G#, Bb minor
    - Technical names for the degrees
    - Choose correct clef for key signature
    - Add accidentals to scales and melodies
    - Recognise key of melody
    - Chromatic scale - find incorrect notes
    - Name major and minor keys for key signature
    - Recognise scales
- Grade Five:
    - Keys: Gb, F# major and Eb, D# minor
    - Find the correct key signature for a key
    - Choose correct clef for key signature
    - Add accidentals to scales and melodies
    - Find degrees of scales
    - Complete scales

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
    - **Recognise primary chords**
- Grade Five:
    - **Keys: Gb, F# major and Eb, D# minor**
    - **Recognise triad degree**
    - **Add note to complete triad**
    - Recognise cadences
    - Choose suitable chord for melody
    - Choose chords, then name cadences
    - Recognise Inversions in triads and chords

